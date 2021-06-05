import { ReactElement } from 'react';
import { Button } from '@chakra-ui/button';

interface PrimaryButtonProps {
  title: string;
  onClick: () => void;
  icon?: ReactElement;
  variant?: string;
  loading?: boolean;
}

export default function PrimaryButton(
  props: PrimaryButtonProps,
): ReactElement | null {
  const { title, icon, loading, variant, onClick } = props;

  return (
    <Button
      onClick={onClick}
      isLoading={loading}
      variant={variant}
      colorScheme="teal"
      leftIcon={icon}
    >
      {title}
    </Button>
  );
}
