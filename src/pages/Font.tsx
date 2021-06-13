import { useLocation } from 'react-router';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Badge,
  Stack,
  Input,
  useToast,
} from '@chakra-ui/react';
import ReCaptcha from 'react-google-recaptcha';

import { Font as FontType } from '../interfaces';

import Page from '../components/Page';
import Title from '../components/Title';
import Rating from '../components/Rating';
import useDeboucer from '../hooks/debouncer';
import CharMaps from '../components/CharMaps';
import DetailsPair from '../components/DetailsPair';
import { firstLetterCapitalize } from '../utils/extra';
import PrimaryButton from '../components/PrimaryButton';
import {
  downloadFont,
  useRateFonts,
  getMappedFonts,
  useGetFontById,
} from '../api';
import ThumbView from '../components/ThumbView';

const toastDuration = 3000;

export const Font = (): ReactElement | null => {
  const toast = useToast({
    duration: toastDuration,
    variant: 'solid',
    position: 'bottom',
    isClosable: true,
  });
  const location = useLocation();
  const { pathname } = location;
  const paths = pathname.split('/');

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [svgMapPoints, setSvgMapPoints] = useState('');
  const [disableRating, setDisableRating] = useState(false);

  const searchText = useDeboucer(previewText, 500);
  const siteKey = process.env.REACT_APP_SITE_KEY ?? 'some_random_key';

  const { mutate: rateFont } = useRateFonts();
  const id = paths[paths.length - 1];
  const { data, error } = useGetFontById(parseInt(id));
  const font = data ?? ({} as FontType);

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

  function onRecaptchaVerified(token: string | null) {
    if (token) {
      setVerified(true);
    }
  }

  if (error) {
    toast({
      status: 'error',
      title: 'Error fetching data !.',
    });
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
          {font?.name && (
            <ThumbView name={font?.searchName} text={font?.thumbChars} />
          )}
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
      <Flex
        my="20"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <ReCaptcha sitekey={siteKey} onChange={onRecaptchaVerified} />
        <PrimaryButton
          title="Download"
          loading={loading}
          isDisabled={!verified}
          onClick={() => handleDownloadFont(font?.id)}
        />
      </Flex>
      {font.searchName && <CharMaps name={font.searchName} />}
      <Box mt="8" h="20vh">
        <Text>Ektukra Fonts</Text>
      </Box>
    </Page>
  );
};
