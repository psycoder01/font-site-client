import React, { ReactElement } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Text, Image, Stack, Flex } from '@chakra-ui/react';

import { Font } from '../interfaces';

interface FontCardProps {
  font: Font;
  children?: React.ReactNode;
}

export default function FontCard(props: FontCardProps): ReactElement | null {
  const { font } = props;
  const { name, description, type, price, thumbUrl, rating } = font;

  function showPrice() {
    if (type === 'premium') {
      return (
        <Box as="span" color="gray.600" fontSize="sm">
          {`${price}`}
        </Box>
      );
    }
    return null;
  }

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Image
        src={thumbUrl ?? 'https://bit.ly/2Z4KKcF'}
        alt="font"
        h="10em"
        w="100%"
        objectFit="cover"
      />
      <Text mt="1" fontWeight="semibold" fontSize="lg">
        {name}
      </Text>
      <Text fontWeight="semibold" color={type !== 'free' ? 'blue' : 'teal'}>
        {type}
      </Text>
      {showPrice()}
      <Flex align="center">
        <Text fontWeight="semibold" mr="2">
          {rating}/5
        </Text>
        <StarIcon color="teal" />
      </Flex>
      <Text>{description}</Text>
    </Box>
  );
}
