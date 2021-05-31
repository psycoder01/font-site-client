import { useGetFonts } from '../api';
import Page from '../components/Page';
import FontCard from '../components/FontCard';

export const Home = () => {
  const { data } = useGetFonts();
  const fonts = data?.data ?? [];

  return (
    <Page>
      {fonts.map((font) => (
        <FontCard key={font.id} font={font} />
      ))}
    </Page>
  );
};
