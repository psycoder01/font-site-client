import React from 'react';
import { Routes } from '../interfaces';
import { useHistory, useLocation } from 'react-router';
import { Box, Flex, Link, Stack, Text, useColorMode } from '@chakra-ui/react';

interface NavBarProps {
  routes: Array<Routes>;
  logo: string;
}

const NavBar = (props: NavBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { routes, logo } = props;
  return (
    <Flex
      py={2}
      mb={8}
      as="nav"
      w="100%"
      wrap="wrap"
      align="center"
      justify="space-around"
      shadow="lg"
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        onClick={toggleColorMode}
        cursor="pointer"
      >
        {logo}
      </Text>
      <Stack
        spacing={8}
        align="center"
        direction={['column', 'row', 'row', 'row']}
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
      >
        {routes.map((route) => (
          <MenuItem key={route.path} to={route.path} title={route.name} />
        ))}
      </Stack>
    </Flex>
  );
};

export default NavBar;

interface MenuItemProps {
  to: string;
  title: string;
}

const MenuItem = (props: MenuItemProps) => {
  const { to, title } = props;
  const { pathname } = useLocation();
  const { push } = useHistory();

  function bgColor() {
    const isCurrentPath = pathname === to;
    if (isCurrentPath) {
      return 'teal';
    }
    return 'transparent';
  }

  function changeRoute() {
    push(to);
  }

  return (
    <Box
      p={4}
      bg={bgColor()}
      borderRadius={4}
      cursor="pointer"
      onClick={changeRoute}
    >
      <Text display="block">{title}</Text>
    </Box>
  );
};
