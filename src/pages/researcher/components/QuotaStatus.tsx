import { useEffect } from 'react';
import { IconInfinity } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Center, RingProgress, Text, Tooltip } from '@mantine/core';
import { getQuotaDetails } from '@/store/quota/quotaSlice';
import { AppDispatch, RootState } from '@/store/store';
import { getSubscriptionTypeId, STRIPE_PRODUCT_IDS } from '@/store/subscriptions/subscriptionsSlice';

const FREE_UPLOADS = 10;

export const QuotaStatus: React.FC<{ userId: string }> = ({ userId }) => {
  const userSubscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const quotaDetails = useSelector((state: RootState) => state.quotas.quotaDetails);
  const dispatch = useDispatch<AppDispatch>();
  // Calculate uploads remaining (FREE_UPLOADS - dailyCounter)
  let uploadsRemaining = Math.max(0, FREE_UPLOADS - (quotaDetails?.dailyCounter ?? 0));

  const product = getSubscriptionTypeId(userSubscriptions?.[0]);

  let tooltipContent =
    product === STRIPE_PRODUCT_IDS.RESEARCHER_PRO
      ? 'Unlimited uploads with Researcher Pro'
      : `${uploadsRemaining} out of ${FREE_UPLOADS} uploads remaining`;

  useEffect(() => {
    dispatch(getQuotaDetails({ userId: userId }));
  }, []);

  return (
    <Tooltip label={tooltipContent} withArrow>
      <RingProgress
        label={
          <Center>
            {product !== STRIPE_PRODUCT_IDS.RESEARCHER_PRO && (
              <Text size="sm" fw="700" ta="center">
                {uploadsRemaining}/{FREE_UPLOADS}
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
            value:
              product !== STRIPE_PRODUCT_IDS.RESEARCHER_PRO
                ? (uploadsRemaining / FREE_UPLOADS) * 100
                : 100,
            color: 'cyan',
          },
        ]}
      />
    </Tooltip>
  );
};
