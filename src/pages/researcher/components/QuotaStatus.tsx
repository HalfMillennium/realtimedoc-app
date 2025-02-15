import { IconInfinity } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Center, RingProgress, Text, Tooltip } from '@mantine/core';
import { RootState } from '@/store/store';
import { getSubscriptionType, STRIPE_PRODUCT_IDS } from '@/store/subscriptions/subscriptionsSlice';

export const QuotaStatus = () => {
  const userSubscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const quotaDetails = useSelector((state: RootState) => state.quotas.quotaDetails);
  const uploadsRemaining = quotaDetails.daily_counter;
  const product = getSubscriptionType(userSubscriptions?.[0]);
  const tooltipContent =
    product === STRIPE_PRODUCT_IDS.RESEARCHER_PRO
      ? 'Unlimited uploads with Researcher Pro'
      : `${uploadsRemaining} out of 10 uploads remaining`

  return (
    <Tooltip label={tooltipContent} withArrow>
      <RingProgress
        label={
          <Center>
            {product !== STRIPE_PRODUCT_IDS.RESEARCHER_PRO && (
              <Text size="sm" fw="700" ta="center">
                {uploadsRemaining}/10
              </Text>
            )}
            {product === STRIPE_PRODUCT_IDS.RESEARCHER_PRO && <IconInfinity />}
          </Center>
        }
        size={65}
        thickness={4}
        roundCaps
        sections={[
          {
            value: product !== STRIPE_PRODUCT_IDS.RESEARCHER_PRO ? uploadsRemaining * 10 : 100,
            color: 'cyan',
          },
        ]}
      />
    </Tooltip>
  );
};