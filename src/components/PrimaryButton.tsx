import { ReactElement } from 'react';
import { Button } from '@chakra-ui/button';

interface PrimaryButtonProps {
  title: string;
  onClick: () => void;
  variant?: string;
  loading?: boolean;
  isDisabled?: boolean;
  icon?: ReactElement;
}

export default function PrimaryButton(
  props: PrimaryButtonProps,
): ReactElement | null {
  const { title, icon, loading, variant, isDisabled, onClick } = props;

  return (
    <Button
      onClick={onClick}
      isLoading={loading}
      isDisabled={isDisabled}
      variant={variant}
      colorScheme="teal"
      leftIcon={icon}
    >
      {title}
    </Button>
  );
}
