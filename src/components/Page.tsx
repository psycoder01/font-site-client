import { Box } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface PageProps {
  children?: React.ReactNode;
}

export default function Page(props: PageProps): ReactElement | null {
  return (
    <Box h="90vh" px="14" py="4" overflowY="scroll">
      {props.children}
    </Box>
  );
}
