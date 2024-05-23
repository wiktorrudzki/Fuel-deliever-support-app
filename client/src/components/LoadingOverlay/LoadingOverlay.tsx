import React from 'react';

import LoadingSpinner from './LoadingSpinner';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

const LoadingOverlay = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return children;
};

export default LoadingOverlay;
