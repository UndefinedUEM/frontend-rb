import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { X, Menu, LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { useDraftConfirmation } from '@/context/DraftConfirmationContext';

const allLinks = [
  { name: 'Início', to: '/' },
  { name: 'Cadastrar escoteiro', to: '/cadastro/escoteiros' },
  { name: 'Lista de presença', to: '/listas/presenca' },
  { name: 'Histórico', to: '/listas/historico' },
];

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isLogoutModalOpen, onOpen: onLogoutModalOpen, onClose: onLogoutModalClose } = useDisclosure();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { checkDraftAndNavigate } = useDraftConfirmation();
  const isHomePage = location.pathname === '/';

  const displayedLinks = isHomePage ? [] : allLinks;

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const confirmLogout = () => {
    logout();
    navigate('/login');
    onLogoutModalClose();
  };

  const renderLink = (link) => {
    const isAttendanceLink = link.to === '/listas/presenca';
    
    if (isAttendanceLink) {
      return (
        <Button
          key={link.name}
          w="full"
          variant="ghost"
          colorScheme='white'
          onClick={() => {
            onClose();
            checkDraftAndNavigate();
          }}
        >
          {link.name}
        </Button>
      );
    }

    return (
      <Link key={link.to} to={link.to} onClick={handleLinkClick}>
        <Button w="full" variant="ghost" colorScheme='white'>
          {link.name}
        </Button>
      </Link>
    );
  };
  
  const navLinks = displayedLinks.map(link => renderLink(link));

  const mobileMenu = !isHomePage && isOpen && (
    <Box pb={4} display={{ md: 'none' }}>
      <Stack as="nav" spacing={4}>
        {navLinks}
        <Button
          w="full"
          variant="ghost"
          colorScheme="white"
          leftIcon={<LogOut size={16} />}
          onClick={onLogoutModalOpen}
        >
          Sair
        </Button>
      </Stack>
    </Box>
  );

  const renderHomeNavbar = () => {
    return (
      <Flex
        h={16}
        w="full"
        alignItems="center"
        justifyContent={{ base: 'flex-start', sm: 'center' }}
        position="relative"
      >
        <Link to="/"><Box fontWeight="bold">Escoteiros</Box></Link>
        <IconButton
          aria-label="Sair"
          icon={<LogOut size={20} />}
          variant="ghost"
          colorScheme="white"
          onClick={onLogoutModalOpen}
          position="absolute"
          right="0"
          display={{ base: 'none', sm: 'inline-flex' }}
        />
      </Flex>
    );
  };

  const renderDefaultNavbar = () => {
    return (
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/"><Box fontWeight="bold">Escoteiros</Box></Link>
        <HStack spacing={4}>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navLinks}
            <IconButton
              aria-label="Sair"
              icon={<LogOut size={20} />}
              variant="ghost"
              colorScheme="white"
              onClick={onLogoutModalOpen}
            />
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
    if (isHomePage) {
      return renderHomeNavbar();
    }
    return renderDefaultNavbar();
  };

  return (
    <>
      <Flex direction="column" minH="100vh">
        <Box bg='teal' color='white' px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
          {renderNavbar()}
          {mobileMenu}
        </Box>

        <Box as="main" flex="1" overflowY="auto" >
          <Outlet />
        </Box>

        <Footer />
      </Flex>
      
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={onLogoutModalClose}
        onConfirmLogout={confirmLogout}
      />
    </>
  );
};

export default Layout;