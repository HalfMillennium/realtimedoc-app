import React from 'react';
import { IconCloudUpload } from '@tabler/icons-react';
import { Button, Text } from '@mantine/core';

// Define shimmer effect styles
const shimmerStyle = {
  overflow: 'hidden' as const,
  background:
    'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
};

const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const UploadDocumentButtonContent: React.FC<{ hasChatMessages: boolean }> = ({
  hasChatMessages,
}) => {
  if (!hasChatMessages) {

  } else {
    return (
      <Button
        fullWidth
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          borderRadius: 10,
          backgroundColor: 'transparent',
          transition: 'background 0.3s ease',
        }}
      >
        <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
        Upload Document & Start Chat
      </Button>
    );
  }
};
/* 
    BUTTON CONTENT W/ SHIMMER EFFECT - Styling is weird with this at the moment, so its being benched for now
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'red'}}>
        <style>{shimmerKeyframes}</style>
        <Button
          style={{
            ...shimmerStyle,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            borderRadius: 10,
            backgroundColor: 'transparent',
            transition: 'background 0.3s ease',
            display: 'flex',
            flex: 1,
            maxWidth: '100%',
          }}
        >
          <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
          <Text style={{ fontSize: 14, fontWeight: 700 }}>Upload Document & Start Chat</Text>
        </Button>
      </div>
    );
*/