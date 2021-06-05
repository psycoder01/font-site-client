import React, { ReactElement } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Text, Image, Flex } from '@chakra-ui/react';

import { Font } from '../interfaces';
import { firstLetterCapitalize } from '../utils/extra';

interface FontCardProps {
  font: Font;
  onClick?: (font: Font) => void;
  children?: React.ReactNode;
}

export default function FontCard(props: FontCardProps): ReactElement | null {
  const { font, onClick = () => {} } = props;
  const { name, description, type, price, thumbUrl, rating } = font;

  function showPrice() {
    if (type === 'premium') {
      return (
        <Box as="span" color="gray.600" fontSize="sm">
          {`Rs. ${price}`}
        </Box>
      );
    }
    return null;
  }

  return (
    <Box
      p="4"
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onClick(font)}
    >
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
      <Flex justify="space-between" align="center">
        <Text
          fontWeight="semibold"
          color={type !== 'free' ? 'blue.500' : 'teal'}
        >
          {firstLetterCapitalize(type)}
        </Text>
        {showPrice()}
      </Flex>
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
