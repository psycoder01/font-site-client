import { ReactElement } from 'react';

import { useGetThumbMaps } from '../api';

interface ThumbViewProps {
  name: string;
  text: string;
}

export default function ThumbView(props: ThumbViewProps): ReactElement | null {
  const { name, text } = props;

  const { data } = useGetThumbMaps(text, `${name}.ttf`);

  return (
    <svg width="100%">
      <path d={data} />
    </svg>
  );
}
