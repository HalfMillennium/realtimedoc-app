import React, { useEffect, useRef, useState } from 'react';
import {
  IconArrowUpRight,
  IconAward,
  IconTrophyFilled,
  IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Stripe from 'stripe';
import { Button, Flex, Text, Divider } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { RootState } from '@/store/store';
import { STRIPE_PRODUCT_IDS } from '@/store/subscriptions/subscriptionsSlice';

interface ModalProps {
  x: number;
  y: number;
  userSubscriptions: Stripe.Subscription[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ x, y, onClose, userSubscriptions }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside the modal to close it
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
        <Flex direction="row" align={'center'} justify="space-between">
          <Text style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Your Subscription</Text>
          <Button
            onClick={onClose}
            p={0}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
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
                : userSubscriptions?.[0]?.items?.data?.[0].plan.product === 'RESEARCHER_LITE' // Replace with your actual product ID
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
            variant='outline'
            radius={'xl'}
          >
            <Flex
              direction={'row'}
              align={'center'}
              justify={'center'}
              gap={5}
            >
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
              color: 'black'
            }}
            variant='filled'
            radius={'xl'}
            color={COLORS.peach}
          >
            <Flex
              direction={'row'}
              align={'center'}
              justify={'center'}
              gap={5}
            >
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

  useEffect(() => {
    console.log('value', userSubscriptions[0]?.items?.data[0].plan);
  }, []);
  return (
    <>
      <Button p="0" variant="white" radius={100} w={30} h={30} onClick={handleClick}>
        {userSubscriptions[0]?.items?.data[0].plan.product ===
          STRIPE_PRODUCT_IDS.RESEARCHER_LITE && <IconAward size={18} />}
        {userSubscriptions[0]?.items?.data[0].plan.product ===
          STRIPE_PRODUCT_IDS.RESEARCHER_PRO && <IconTrophyFilled size={18} />}
      </Button>
      {modalPosition && (
        <Modal
          x={modalPosition.x + 15}
          y={modalPosition.y + 10}
          onClose={handleClose}
          userSubscriptions={userSubscriptions}
        />
      )}
    </>
  );
};
