import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express from 'express';
import multer from 'multer';

const app = express();
const port = 5000;
const apiUrl = 'http://localhost:8000';
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

// Route to handle FormData
app.post('/api/create-convo/:userId', upload.single('file'), async (req, res) => {
  try {
    // Access userId from params
    const userId = req.params.userId;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new FormData instance
    const formData = new FormData();

    // Append the file with the same field name 'file' as expected by FastAPI
    if (!!req.file?.buffer) {
      const blob = new Blob([req.file?.buffer], { type: req.file.mimetype });
      formData.append('file', blob, req.file.originalname);
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
      const responseData = await response.json();
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

app.post('/api/new-message/:conversationId', async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log('Request body:', req.body);

    const response = await fetch(`${apiUrl}/new-message/${req.params.conversationId}`, {
      method: 'POST',
      body: JSON.stringify({
        queryText: req.body.queryText,
        datasetName: req.body.datasetName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to process new-message request:', error);
    res.status(500).json({
      error: `Could not complete new-message request for conversationId ${req.params.conversationId}`,
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
