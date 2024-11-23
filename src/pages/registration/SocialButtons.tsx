import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';

export const GoogleButton: React.FC<ButtonProps> = (props) => (
  <Button
    {...props}
    fullWidth
    variant="outline"
    color="gray"
  >
    Continue with Google
  </Button>
);
