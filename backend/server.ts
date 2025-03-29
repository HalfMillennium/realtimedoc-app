import { clerkMiddleware, requireAuth } from '@clerk/express';
import timeout from 'connect-timeout';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import Stripe from 'stripe';

dotenv.config();

const STRIPE_KEY: string = process.env.STRIPE_API_KEY || '';

const port = process.env.PORT || 5050;

const app = express();
const apiUrl = process.env.API_URL || 'http://localhost:8000';
const upload = multer();

// Middlewares
app.use(timeout(120000));
app.use(haltOnTimedout);
function haltOnTimedout(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (req.timedout) {
    console.log('Request timed out!');
    return;
  }
  next();
}
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

// Route to handle FormData
app.post('/api/create-convo/:userId', requireAuth(), upload.single('file'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const productTypeId = req.body.productTypeId;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new FormData instance
    const formData = new FormData();

    // Append the file with the same field name 'file' as expected by FastAPI
    if (!!req.file?.buffer) {
      const blob = new Blob([req.file?.buffer], { type: req.file.mimetype });
      formData.append('file', blob, req.file.originalname);
      formData.append('productTypeId', productTypeId);
    } else {
      res.status(500).json({
        error: 'No buffer content found. req.file.buffer is null or undefined.',
      });
    }

    // Forward the FormData to the target API
    const response = await fetch(`${apiUrl}/create-convo/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.text();
      res.status(200).json(responseData);
    } else {
      const errorData = await response.text();
      res.status(response.status).json({
        error: 'Failed to complete request to the external API',
        details: errorData,
      });
    }
  } catch (error) {
    console.error('Failed to handle create-convo request:', error);
    res.status(500).json({ error: 'Internal Proxy Server Error' });
  }
});

app.get('/api/conversations/:userId', requireAuth(), async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/conversations/${req.params.userId}`);
    const responseText = await response.text();
    console.log('Request body:', req.body);
    console.log('Response body:', responseText);
    res.status(200).json(responseText);
  } catch (e) {
    res.status(500).json(`HTTP error! status: ${e}`);
  }
});

app.post('/api/new-message/:conversationId', requireAuth(), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const response = await fetch(`${apiUrl}/new-message/${req.params.conversationId}`, {
      method: 'POST',
      body: JSON.stringify({
        queryText: req.body.queryText,
        dataSetId: req.body.dataSetId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Request body:', req.body);
    console.log('Response body:', responseText);
    res.status(200).json(responseText);
  } catch (error) {
    console.error('Failed to process new-message request:', error);
    res.status(500).json({
      error: `Could not complete new-message request for conversationId ${req.params.conversationId}`,
      details: JSON.stringify(error),
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

async function getCustomerByUserEmail(userEmail: string, stripe: Stripe) {
  try {
    const customers = await stripe.customers.search({
      query: `email:'${userEmail}'`,
      limit: 1,
    });

    if (customers.data.length === 0) {
      throw new Error(`No customer found for userEmail: ${userEmail}`);
    }

    return customers.data[0];
  } catch (error) {
    console.error('Error searching for customer:', error);
    throw error;
  }
}

app.get('/api/subscriptions/:userEmail', async (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_KEY);
    const result = await getCustomerByUserEmail(req.params.userEmail, stripe);
    const subscriptions = await stripe.subscriptions.list({
      customer: result.id,
    });
    res.status(200).json({ userSubscriptions: JSON.stringify(subscriptions.data) ?? [] });
  } catch (error) {
    if (JSON.stringify(error).includes('No customer found for email')) {
      console.error('Error retrieving subscriptions:', error);
      res.status(404).json({ error: 'No subscriptions found' });
      return;
    }
    console.error('Error retrieving subscriptions:', error);
    res.status(500).json({ error: 'Failed to retrieve subscriptions' });
  }
});

app.get('/api/quotas/:userId', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/quotas/${req.params.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Request body:', req.body);
    console.log('Response body:', responseText);
    res.status(200).json(responseText);
  } catch (error) {
    console.error('Failed to process quotas request:', error);
    res.status(500).json({
      error: `Could not complete quotas request for userId ${req.params.userId}`,
      details: JSON.stringify(error),
    });
  }
});

app.delete('/api/subscriptions/:subscriptionId', requireAuth(), async (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_KEY);
    const deletedSubscription = await stripe.subscriptions.cancel(req.params.subscriptionId);
    console.log('Deleted subscription:', deletedSubscription);
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
