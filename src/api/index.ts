import network from './network';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
    onError: (e: any) => {
      throw e;
    },
  });
}

export function downloadFont(id: string) {
  return network.get(`/font/download/${id}`, { responseType: 'blob' });
}

export function getMappedFonts(text: string, output: string) {
  return network.get(`/font/text=${text}/sink=${output}`);
}

interface RateDetails {
  fontId: string;
  newRating: number;
  oldRating: number;
  total: number;
}

async function rateFonts(details: RateDetails) {
  await network.post('/font/rate', details);
  return details.fontId;
}

export function useRateFonts() {
  const queryClient = useQueryClient();
  return useMutation(async (details: RateDetails) => rateFonts(details), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['fonts']);
    },
    onError: (e: any) => {
      throw e;
    },
  });
}

interface GetFont {
  success: boolean;
  data: Font;
}

async function getFontById(id: string): Promise<GetFont> {
  const resp = await network.get(`/font/id=${id}`);
  return resp.data;
}

export function useGetFontById(id: string) {
  const queryClient = useQueryClient();
  return useQuery(['fonts', id], () => getFontById(id), {
    onSuccess: (data) => {
      console.log(data);
      const font = data.data;
      queryClient.setQueryData(['fonts', font.id], font);
    },
    onError: (e: any) => {
      throw e;
    },
  });
}
