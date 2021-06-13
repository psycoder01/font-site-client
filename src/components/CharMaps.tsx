import { ReactElement } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Title from './Title';
import { useGetCharMaps } from '../api';
import DetailsPair from './DetailsPair';

interface CharMapsProps {
  name: string;
}

export default function CharMaps(props: CharMapsProps): ReactElement | null {
  const { name } = props;

  const { data, isLoading, error } = useGetCharMaps(`${name}.ttf`);
  const charMaps = data ?? [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading glyhps !.</p>;
  }

  if (charMaps.length === 0) {
    return <p>No glyhps !.</p>;
  }

  function renderGylphs(point: string, key: number) {
    if (point.length < 1) {
      return;
    }
    return (
      <Box key={key} borderWidth="thin" borderRadius="md">
        <svg height="100" width="100">
          <path d={point} />
        </svg>
      </Box>
    );
  }

  return (
    <>
      <Title size="md" underline>
        Gylphs
      </Title>
      <DetailsPair title="Total" subtitle={charMaps.length} />
      <Flex wrap="wrap" mt="8">
        {charMaps.map((point, index) => renderGylphs(point, index))}
      </Flex>
    </>
  );
}
