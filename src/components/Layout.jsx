import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { X, Menu, LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ConfirmationModal from './ConfirmationModal';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';

const allLinks = [
  { name: 'Início', to: '/' },
  { name: 'Cadastrar escoteiro', to: '/cadastro/escoteiros' },
  { name: 'Lista de presença', to: '/listas/presenca' },
  { name: 'Histórico', to: '/listas/historico' },
];

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDraftModalOpen, onOpen: onDraftModalOpen, onClose: onDraftModalClose } = useDisclosure();
  const { isOpen: isLogoutModalOpen, onOpen: onLogoutModalOpen, onClose: onLogoutModalClose } = useDisclosure();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isHomePage = location.pathname === '/';

  const displayedLinks = isHomePage ? [] : allLinks;

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleNewAttendance = () => {
    sessionStorage.removeItem('inProgressList');
    sessionStorage.removeItem('inProgressListIds');
    onDraftModalClose();
    navigate('/listas/presenca');
  };

  const handleContinueAttendance = () => {
    onDraftModalClose();
    navigate('/listas/presenca');
  };

  const handleAttendanceLinkClick = useCallback(() => {
    onClose();
    const draftExists = sessionStorage.getItem('inProgressListIds');
    if (draftExists && JSON.parse(draftExists).length > 0) {
      onDraftModalOpen();
    } else {
      navigate('/listas/presenca');
    }
  }, [navigate, onClose, onDraftModalOpen]);

  const confirmLogout = () => {
    logout();
    navigate('/login');
    onLogoutModalClose();
  };

  const renderLink = (link) => {
    const isAttendanceLink = link.to === '/listas/presenca';
    const clickHandler = isAttendanceLink ? handleAttendanceLinkClick : handleLinkClick;

    return (
      <Link key={link.to} to={isAttendanceLink ? '#' : link.to} onClick={clickHandler}>
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

  return (
    <>
      <Flex direction="column" minH="100vh">
        <Box bg='teal' color='white' px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
          {isHomePage ? (
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
          ) : (
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
          )}
          {mobileMenu}
        </Box>

        <Box as="main" flex="1" overflowY="auto" >
          <Outlet />
        </Box>

        <Footer />
      </Flex>
      <ConfirmationModal
        isOpen={isDraftModalOpen}
        onClose={onDraftModalClose}
        onConfirm={handleContinueAttendance}
        onCancel={handleNewAttendance}
        title="Lista em Andamento"
        bodyText="Você tem uma lista de presença que não foi finalizada. Deseja continuar de onde parou?"
        confirmButtonText="Sim, continuar"
        cancelButtonText="Não, iniciar nova"
        confirmButtonColorScheme="teal"
      />
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={onLogoutModalClose}
        onConfirmLogout={confirmLogout}
      />
    </>
  );
};

export default Layout;