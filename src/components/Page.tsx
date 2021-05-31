import { Box } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface PageProps {
  children?: React.ReactNode;
}

export default function Page(props: PageProps): ReactElement | null {
  return (
    <Box h="100%" px="14">
      {props.children}
    </Box>
  );
}
