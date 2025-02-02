import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { IconArrowUpRight, IconAward, IconBox, IconTrophyFilled, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Stripe from 'stripe';
import { Button, Divider, Flex, Modal, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { AppDispatch, RootState } from '@/store/store';
import { cancelSubscription, STRIPE_PRODUCT_IDS } from '@/store/subscriptions/subscriptionsSlice';
import { LoadingStatus } from '@/store/utils';

interface ModalProps {
  x: number;
  y: number;
  userSubscriptions: Stripe.Subscription[];
  onClose: () => void;
}

const SubscriptionModal: React.FC<ModalProps> = ({ x, y, onClose, userSubscriptions }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { getToken } = useAuth();
  const { colorScheme } = useMantineColorScheme();
  const [confirmCancel, setConfirmCancel] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCancelPlan = () => {
    setConfirmCancel(true);
  };

  const handleConfirmCancel = useCallback(async () => {
    const token = await getToken();
    if (!!token && !!userSubscriptions[0]?.id) {
      dispatch(cancelSubscription({ subscriptionId: userSubscriptions[0]?.id, authToken: token }));
    } else {
      console.error(
        `No token found or subscription ID not found. Subscription: ${userSubscriptions[0]?.id}, Token: ${token}`
      );
    }
  }, [dispatch, getToken, userSubscriptions]);

  const handleCloseConfirm = () => {
    setConfirmCancel(false);
  };

  const cancelSubscriptionStatus = useSelector(
    (state: RootState) => state.subscriptions.cancelSubscriptionStatus
  );

  useEffect(() => {
    if (cancelSubscriptionStatus === LoadingStatus.SUCCEEDED) {
      setConfirmCancel(true);
      navigate('/');
    }
  }, [cancelSubscriptionStatus]);

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{
          opacity: 0,
          scale: 0.8,
          transformOrigin: 'bottom left',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.2 },
        }}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          top: y,
          left: x - 200,
          transform: 'translate(-10px, 10px)',
          padding: '1.5rem',
          border: '0.1px solid #ffffff60',
          borderRadius: '15px',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          width: '350px',
        }}
      >
        <Flex direction="row" align={'center'} justify="space-between" style={{ width: '100%' }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Your Subscription</Text>
          <Button
            onClick={onClose}
            variant="transparent"
            style={{
              display: 'flex',
              background: colorScheme === 'dark' ? '#000000' : '#ffffff70',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30,
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: 0,
            }}
          >
            <IconX size={20} />
          </Button>
        </Flex>
        <Divider my="sm" />
        <Flex w={'100%'} align={'center'} gap={10}>
          <Text style={{ fontSize: 14, fontWeight: 500, flex: 1 }} w={'100%'}>
            Current Plan
          </Text>
          <Flex
            direction="row"
            align="center"
            style={{
              gap: 5,
              padding: 5,
              paddingLeft: 12,
              backgroundColor: '#fafafa',
              flex: 1,
              borderRadius: 10,
              textAlign: 'center',
            }}
          >
            {userSubscriptions[0]?.items?.data[0].plan.product ===
              STRIPE_PRODUCT_IDS.RESEARCHER_LITE && (
              <IconAward
                style={{
                  color: '#666',
                }}
                size={18}
              />
            )}
            {userSubscriptions[0]?.items?.data[0].plan.product ===
              STRIPE_PRODUCT_IDS.RESEARCHER_PRO && (
              <IconTrophyFilled
                style={{
                  color: '#666',
                }}
                size={18}
              />
            )}
            <Text
              style={{
                color: '#666',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {!!!userSubscriptions
                ? 'No active subscription.'
                : userSubscriptions?.[0]?.items?.data?.[0].plan.product ===
                    STRIPE_PRODUCT_IDS.RESEARCHER_LITE
                  ? 'Researcher Lite'
                  : 'Researcher Pro'}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="row" flex={1} gap={10} style={{ marginTop: 10 }}>
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              border: 10,
            }}
            color={COLORS.peach}
            variant="light"
            radius={'xl'}
            onClick={() => navigate('/pricing')}
          >
            <Flex direction={'row'} align={'center'} justify={'center'} gap={5}>
              <IconArrowUpRight size={16} />
              Change Plan
            </Flex>
          </Button>
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              border: 10,
              flex: 1,
              color: 'black',
            }}
            variant="filled"
            radius={'xl'}
            color={COLORS.peach}
            onClick={handleConfirmCancel}
          >
            <Flex direction={'row'} align={'center'} justify={'center'} gap={5}>
              <IconX size={16} />
              Cancel Plan
            </Flex>
          </Button>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export const UserSubscriptionIndicator = () => {
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);

  const userSubscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const handleClick = (event: React.MouseEvent) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
  };

  const handleClose = () => {
    setModalPosition(null);
  };

  return (
    <>
      <Button p="0" variant="white" radius={100} w={30} h={30} onClick={handleClick}>
        {userSubscriptions[0]?.items?.data[0].plan.product ===
          STRIPE_PRODUCT_IDS.RESEARCHER_LITE && <IconAward size={18} />}
        {userSubscriptions[0]?.items?.data[0].plan.product ===
          STRIPE_PRODUCT_IDS.RESEARCHER_PRO && <IconTrophyFilled size={18} />}
          {!userSubscriptions[0]?.items?.data[0].plan.product && <IconBox size={18} />}
      </Button>
      {modalPosition && (
        <SubscriptionModal
          x={modalPosition.x + 15}
          y={modalPosition.y + 10}
          onClose={handleClose}
          userSubscriptions={userSubscriptions}
        />
      )}
    </>
  );
};
