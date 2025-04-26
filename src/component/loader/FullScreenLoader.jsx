import React from 'react';
import { OrbitProgress } from 'react-loading-indicators';

export default function FullScreenLoader() {
  return (
    <div style={styles.container}>
      <OrbitProgress
        variant="track-disc"
        color="#3e52c5"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // optional: add a translucent white background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // ensure it's above everything
  },
};
