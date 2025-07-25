import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { X, Menu } from 'lucide-react';
import { useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';

const allLinks = [
  { name: 'Início', to: '/' },
  { name: 'Cadastrar', to: '/cadastro/escoteiros' },
  { name: 'Listas anteriores', to: '/listas' },
  { name: 'Lista de presença', to: '/listas/presenca' },
  { name: 'Login', to: '/login' },
  { name: 'Cadastrar usuário', to: '/cadastro/usuario' },
  { name: 'senha', to: '/recuperar-senha' },

];

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const displayedLinks = isHomePage ? [] : allLinks;

  const handleLinkClick = useCallback(() => {
     
    sessionStorage.removeItem('checkedItems');
    onClose();
  }, [onClose]);

  const renderLink = (link) => (
    <Link key={link.to} to={link.to}>
      <Button w="full" variant="ghost" colorScheme='white' onClick={handleLinkClick}>
        {link.name}
      </Button>
    </Link>
  );

  const navLinks = displayedLinks.map(link => renderLink(link));

  const mobileMenu = !isHomePage && isOpen && (
    <Box pb={4} display={{ md: 'none' }}>
      <Stack as="nav" spacing={4}>
        {navLinks}
      </Stack>
    </Box>
  );

  const renderHomePageNavbar = () => {
    return (
      <Flex h={16} w="full" alignItems="center" justifyContent={{ base: 'flex-start', sm: 'center' }}>
        <Link to="/"><Box fontWeight="bold">Aki</Box></Link>
      </Flex>
    );
  };

  const renderOtherPageNavbar = () => {
    return (
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/"><Box fontWeight="bold">Aki</Box></Link>
        <HStack spacing={4}>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navLinks}
          </HStack>
          <IconButton
            size="md"
            variant='link'
            colorScheme='white'
            icon={isOpen ? <X /> : <Menu />}
            aria-label="Abrir menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>
    );
  };

  const renderNavbar = () => {
    if (isHomePage) return renderHomePageNavbar();

    return renderOtherPageNavbar();
  };

  return (
    <Flex direction="column" minH="100vh">
      <Box bg='teal' color='white' px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
        {renderNavbar()}
        {mobileMenu}
      </Box>

      <Box as="main" flex="1" overflowY="auto">
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;