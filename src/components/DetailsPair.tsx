import { ReactElement } from 'react';
import { Flex, Text } from '@chakra-ui/layout';

interface DetailsPairProps {
  title: string;
  subtitle: string | number;
  titleColor?: string;
  subtitleColor?: string;
}

export default function DetailsPair(
  props: DetailsPairProps,
): ReactElement | null {
  const { title, subtitle, titleColor, subtitleColor } = props;

  return (
    <Flex gridGap="2">
      <Text color={titleColor} fontWeight="semibold">
        {title}
      </Text>
      :<Text color={subtitleColor}>{subtitle}</Text>
    </Flex>
  );
}
