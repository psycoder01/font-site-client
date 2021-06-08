import { ReactElement, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface RatingPros {
  rating: number;
  onChange: (index: number) => void;
  disabled?: boolean;
}

interface RatingButtonProps {
  index: number;
  fill: boolean;
}

export default function Rating(props: RatingPros): ReactElement | null {
  const { rating, onChange, disabled } = props;
  const [currentRating, setCurrentRating] = useState(rating);
  const buttons = [];
  const scale = 5;

  function handleStarClick(index: number) {
    setCurrentRating(index);
  }

  const RatingButton = ({ index, fill }: RatingButtonProps) => {
    return (
      <Button
        variant="unstyled"
        disabled={disabled}
        _focus={{ outline: 'none' }}
        onClick={() => {
          onChange(index);
          handleStarClick(index);
        }}
      >
        <StarIcon key={index} color={fill ? 'teal.500' : 'gray.300'} />
      </Button>
    );
  };

  for (let i = 1; i <= scale; i++) {
    buttons.push(<RatingButton key={i} index={i} fill={i <= currentRating} />);
  }

  return <Flex>{buttons}</Flex>;
}
