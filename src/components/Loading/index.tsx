import React from 'react';
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#000"
        size="xl"
      />
    </div>
  );
};

export default Loading;
