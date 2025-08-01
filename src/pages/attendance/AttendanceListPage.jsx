import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from '@chakra-ui/react';
import scoutApi from '@/services/scoutApi';
import useDidMount from '@/hooks/useDidMount';
import useDidMountAndUpdate from '@/hooks/useDidMountAndUpdate';
import useAsync from '@/hooks/useAsync';

const AttendanceListPage = () => {
  const [scouts, setScouts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const isEditMode = location.state?.mode === 'edit';

  const fetchScoutsCallback = useCallback(async () => {
    try {
      const response = await scoutApi.getScouts();
      const fetchedScouts = response || [];
      const sortedScouts = fetchedScouts.sort((a, b) => a.name.localeCompare(b.name));
      setScouts(sortedScouts);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const { call: loadScouts, loading: isLoading } = useAsync(fetchScoutsCallback, []);

  useDidMount(() => {
    loadScouts();
  });

  const loadFromStorage = () => {
    const savedIds = sessionStorage.getItem('inProgressListIds');
    return savedIds ? new Set(JSON.parse(savedIds)) : new Set();
  };

  const [presentScoutIds, setPresentScoutIds] = useState(loadFromStorage);

  useDidMountAndUpdate(() => {
    if (scouts.length === 0 && !isEditMode) return;
    const presentScoutsData = scouts.filter(scout => presentScoutIds.has(scout.id));
    sessionStorage.setItem('inProgressList', JSON.stringify(presentScoutsData));
    const idsArray = Array.from(presentScoutIds);
    sessionStorage.setItem('inProgressListIds', JSON.stringify(idsArray));
  }, [presentScoutIds]);

  const handleCheckboxChange = (scoutId, isChecked) => {
    setPresentScoutIds(previousIds => {
      const newIds = new Set(previousIds);
      if (isChecked) {
        newIds.add(scoutId);
      } else {
        newIds.delete(scoutId);
      }
      return newIds;
    });
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = new Set(scouts.map(scout => scout.id));
      setPresentScoutIds(allIds);
    } else {
      setPresentScoutIds(new Set());
    }
  };

  const handleSubmit = () => {
    const presentScouts = scouts.filter(scout => presentScoutIds.has(scout.id));
    if (presentScoutIds.size === 0) {
      toast({
        title: 'Nenhum escoteiro selecionado',
        description: 'Você precisa marcar ao menos um escoteiro como presente.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    navigate('/listas/presenca/resumo', { state: { presentScouts } });
  };

  const handleSaveChanges = () => {
    toast({
      title: 'Rascunho salvo!',
      description: 'Suas alterações foram salvas.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
    navigate('/listas/historico');
  };

  const isAllSelected = scouts.length > 0 && presentScoutIds.size === scouts.length;
  const isIndeterminate = presentScoutIds.size > 0 && presentScoutIds.size < scouts.length;

  const renderButtons = () => {
    if (isEditMode) {
      return (
        <VStack spacing={4}>
          <Button
            w="full"
            size="lg"
            colorScheme="teal"
            onClick={handleSubmit}
          >
            Confirmar Alterações
          </Button>
          <Button
            w="full"
            size="lg"
            variant="ghost"
            colorScheme="gray"
            onClick={handleSaveChanges}
          >
            Salvar Alterações
          </Button>
        </VStack>
      );
    }
    return (
      <Button colorScheme="teal" size="lg" onClick={handleSubmit} mt={6}>
        Confirmar Presenças
      </Button>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>;
    }
    if (error) {
      return <Alert status="error" borderRadius="md"><AlertIcon /><Box><AlertTitle>Ocorreu um Erro</AlertTitle><AlertDescription>{error}</AlertDescription></Box></Alert>;
    }
    if (scouts.length === 0) {
      return <Box textAlign="center" p={8} borderWidth="1px" borderRadius="md" borderStyle="dashed"><Text fontSize="lg" color="gray.500">Nenhum escoteiro encontrado.</Text></Box>;
    }
    return (
      <>
        <Flex justify="space-between" align="center" p={4} bg="gray.50" borderRadius="md" borderWidth="1px">
          <Text fontWeight="bold">Marcar/Desmarcar Todos</Text>
          <Checkbox isChecked={isAllSelected} isIndeterminate={isIndeterminate} onChange={(e) => handleSelectAll(e.target.checked)} colorScheme="teal" size="lg" />
        </Flex>
        <VStack divider={<Divider />} spacing={0} borderWidth="1px" borderRadius="md" align="stretch">
          {scouts.map((scout) => (
            <Flex key={scout.id} align="center" justify="space-between" p={4} _hover={{ bg: 'gray.50' }}>
              <Text>{scout.name}</Text>
              <Checkbox isChecked={presentScoutIds.has(scout.id)} onChange={(e) => handleCheckboxChange(scout.id, e.target.checked)} colorScheme="teal" size="lg" />
            </Flex>
          ))}
        </VStack>
        {renderButtons()}
      </>
    );
  };

  return (
    <Container maxW="container.lg" py={{ base: '8', md: '12' }}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl">
            {isEditMode ? 'Editar Lista de Presença' : 'Lista de Presença'}
          </Heading>
          <Text mt={2} color="gray.500">
            {new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' })}
          </Text>
        </Box>
        {renderContent()}
      </VStack>
    </Container>
  );
};

export default AttendanceListPage;