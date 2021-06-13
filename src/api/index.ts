import network from './network';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Font } from '../interfaces';
import { AxiosResponse } from 'axios';

const queryCache = {
  fonts: 'fonts',
  glyphs: 'glyphs',
  thumb: 'thumb',
};

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
  return useQuery([queryCache.fonts], getFonts, {
    onSuccess: (data) => {
      const fonts = data.data ?? [];
      fonts.map((font) =>
        queryClient.setQueryData([queryCache.fonts, font.id], font),
      );
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
  return network.post(`/font/preview`, { text, filter: output });
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
      queryClient.invalidateQueries([queryCache.fonts, data]);
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

async function getFontById(id: number): Promise<Font> {
  try {
    const resp: AxiosResponse<GetFont> = await network.get(`/font/id=${id}`);
    return resp.data.data;
  } catch (err) {
    throw err;
  }
}

export function useGetFontById(id: number) {
  return useQuery([queryCache.fonts, id], () => getFontById(id));
}

interface GetCharMap {
  success: boolean;
  data: string[];
}
async function getCharMaps(searchName: string): Promise<string[]> {
  try {
    const resp: AxiosResponse<GetCharMap> = await network.get(
      `/font/gylphs/searchName=${searchName}`,
    );
    return resp.data.data;
  } catch (err) {
    throw err;
  }
}

export function useGetCharMaps(searchName: string) {
  return useQuery([queryCache.glyphs, searchName], () =>
    getCharMaps(searchName),
  );
}

interface GetThumbMap {
  success: boolean;
  data: string;
}
export function useGetThumbMaps(text: string, output: string) {
  return useQuery([queryCache.thumb, text, output], async () => {
    const resp: AxiosResponse<GetThumbMap> = await getMappedFonts(text, output);
    return resp.data.data;
  });
}
