import { useHistory } from 'react-router';
import { Stack } from '@chakra-ui/react';

import { Font } from '../interfaces';
import { useGetFonts } from '../api';
import Page from '../components/Page';
import FontCard from '../components/FontCard';

export const Home = () => {
  const history = useHistory();

  const { data } = useGetFonts();
  const fonts = data?.data ?? [];

  function onCardClick(font: Font) {
    const { searchName } = font;
    history.push('/font/' + searchName, font);
  }

  return (
    <Page>
      <Stack spacing="4">
        {fonts.map((font) => (
          <FontCard key={font.id} font={font} onClick={onCardClick} />
        ))}
      </Stack>
    </Page>
  );
};
