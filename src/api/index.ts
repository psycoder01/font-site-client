import network from './network';
import { useQuery, useQueryClient } from 'react-query';
import { Font } from '../interfaces';

interface Response {
  sucesss: boolean;
  data: Array<Font>;
}

async function getFonts(): Promise<Response> {
  const resp = await network.get('/font/fontsList');
  return resp.data;
}

export function useGetFonts() {
  const queryClient = useQueryClient();
  return useQuery(['fonts'], getFonts, {
    onSuccess: (data) => {
      const fonts = data.data ?? [];
      fonts.map((font) => queryClient.setQueryData(['fonts', font.id], font));
    },
  });
}

export function downloadFont(id: string) {
  return network.get(`/font/download/${id}`, { responseType: 'blob' });
}

export function getMappedFonts(text: string, output: string) {
  return network.get(`/font/text=${text}/sink=${output}`);
}
