import { useLocation } from 'react-router';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Badge,
  Image,
  Stack,
  Input,
  useToast,
} from '@chakra-ui/react';

import { Font as FontType } from '../interfaces';

import Page from '../components/Page';
import Title from '../components/Title';
import Rating from '../components/Rating';
import useDeboucer from '../hooks/debouncer';
import DetailsPair from '../components/DetailsPair';
import { firstLetterCapitalize } from '../utils/extra';
import PrimaryButton from '../components/PrimaryButton';
import {
  downloadFont,
  getMappedFonts,
  useGetFontById,
  useRateFonts,
} from '../api';

export const Font = (): ReactElement | null => {
  const location = useLocation();
  const { pathname } = location;
  const paths = pathname.split('/');

  const { data } = useGetFontById(paths[paths.length - 1]);
  const font = data?.data ?? ({} as FontType);
  console.log(data);

  const [loading, setLoading] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [svgMapPoints, setSvgMapPoints] = useState('');
  const [disableRating, setDisableRating] = useState(false);

  const { mutate: rateFont } = useRateFonts();

  const searchText = useDeboucer(previewText, 500);

  const toast = useToast();

  useEffect(() => {
    if (searchText.length) {
      mapSearchText();
    } else {
      setSvgMapPoints('');
    }
  }, [searchText]);

  async function mapSearchText() {
    try {
      const resp = await getMappedFonts(searchText, font?.searchName + '.ttf');
      const svgPointsOfMappedFont = resp.data.data;
      setSvgMapPoints(svgPointsOfMappedFont);
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error',
      });
    }
  }

  function handlePreviewTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPreviewText(event.target.value);
  }

  async function handleRatingChange(ratedStar: number) {
    const { id, rating } = font;
    const details = {
      fontId: id,
      newRating: ratedStar,
      oldRating: rating,
      total: totalRatingVotes(),
    };
    try {
      setDisableRating(true);
      rateFont(details);
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error!',
      });
    }
    toast({
      status: 'info',
      title: 'Thank you for rating!',
    });
  }

  function download(file: any) {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', font.name + '.ttf');
    document.body.appendChild(link);
    link.click();
  }

  async function handleDownloadFont(id: string) {
    setLoading(true);
    try {
      const resp = await downloadFont(id);
      const file = resp.data;
      download(file);
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error downloading font!',
      });
    }
    setLoading(false);
  }

  function totalRatingVotes() {
    const {
      oneStarCount,
      twoStarCount,
      threeStarCount,
      fourStarCount,
      fiveStarCount,
    } = font;
    return (
      oneStarCount +
      twoStarCount +
      threeStarCount +
      fourStarCount +
      fiveStarCount
    );
  }

  return (
    <Page>
      <Stack spacing="4">
        <Flex gridGap="4" justify="flex-start" align="center">
          <Title>{font?.name}</Title>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {font?.type}
          </Badge>
        </Flex>
        <Box>
          <Image
            src={font.thumbUrl ?? 'https://bit.ly/2Z4KKcF'}
            alt="font"
            h="10em"
            w="100%"
            objectFit="cover"
          />
          This area will be for previewing font samples . Lorem Ipsum with
          selected character encoding
        </Box>
        <Box>
          <Title size="md" underline>
            Details
          </Title>
          <Stack>
            <Flex gridGap="4">
              <DetailsPair title="Rating" subtitle={font?.rating} />
              <Text>{`of ${totalRatingVotes()} votes`}</Text>
            </Flex>
            <Rating
              rating={font?.rating}
              onChange={(index) => handleRatingChange(index)}
              disabled={disableRating}
            />
            <DetailsPair title="Downloads" subtitle={font?.downloads} />
            <DetailsPair title="Language" subtitle={font?.language} />
            <DetailsPair
              title="Type"
              subtitle={firstLetterCapitalize(font?.type ?? '')}
            />
            <DetailsPair title="Price" subtitle={`Rs . ${font?.price}`} />
          </Stack>
        </Box>
        <Box>
          <Title size="md" underline>
            Description
          </Title>
          <Text>{font?.description}</Text>
        </Box>
        <Title size="md" underline>
          Preview
        </Title>
        <Box borderWidth="1px" borderRadius="lg" shadow="xl">
          <svg height="210" width="100%">
            <path d={svgMapPoints} />
          </svg>
          <Input
            value={previewText}
            placeholder="Enter some text to see the preview"
            onChange={handlePreviewTextChange}
          />
        </Box>
      </Stack>
      <Box my="20" d="flex" justifyContent="center" alignItems="center">
        <PrimaryButton
          title="Download"
          loading={loading}
          onClick={() => handleDownloadFont(font?.id)}
        />
      </Box>
      <Box h="20vh">
        <Text>Ektukra Fonts</Text>
      </Box>
    </Page>
  );
};
