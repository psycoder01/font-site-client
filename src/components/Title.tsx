import { ReactElement, ReactNode } from 'react';
import { Heading } from '@chakra-ui/layout';

interface TitleProps {
  size?: string;
  color?: string;
  weight?: string;
  underline?: boolean;
  children?: ReactNode;
}

export default function Title(props: TitleProps): ReactElement | null {
  const { color = 'teal', weight = 'semibold', size = 'lg', underline } = props;

  return (
    <Heading
      as={underline ? 'u' : undefined}
      size={size}
      color={color}
      fontWeight={weight}
    >
      {props.children}
    </Heading>
  );
}
