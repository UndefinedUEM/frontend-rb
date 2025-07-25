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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import scoutApi from '../../services/scoutApi';

const AttendanceListPage = () => {
  const [scouts, setScouts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const { call: loadScouts, loading: isLoading } = useAsync(async () => {
    try {
      const response = await scoutApi.getScouts();
      const fetchedScouts = response || [];
      const sortedScouts = fetchedScouts.sort((a, b) => a.name.localeCompare(b.name));
      setScouts(sortedScouts);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    loadScouts();
  }, [loadScouts]);

  const loadFromStorage = () => {
    const savedIds = sessionStorage.getItem('inProgressListIds');
    return savedIds ? new Set(JSON.parse(savedIds)) : new Set();
  };

  const [presentScoutIds, setPresentScoutIds] = useState(loadFromStorage);

  useEffect(() => {
    const presentScoutsData = scouts.filter(scout => presentScoutIds.has(scout.id));
    sessionStorage.setItem('inProgressList', JSON.stringify(presentScoutsData));
    
    const idsArray = Array.from(presentScoutIds);
    sessionStorage.setItem('inProgressListIds', JSON.stringify(idsArray));
  }, [presentScoutIds, scouts]);

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

  const isAllSelected = scouts.length > 0 && presentScoutIds.size === scouts.length;
  const isIndeterminate = presentScoutIds.size > 0 && presentScoutIds.size < scouts.length;
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex justify="center" align="center" minH="40vh">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Ocorreu um Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    if (scouts.length === 0) {
      return (
        <Box textAlign="center" p={8} borderWidth="1px" borderRadius="md" borderStyle="dashed">
          <Text fontSize="lg" color="gray.500">
            Nenhum escoteiro encontrado para registrar a presença.
          </Text>
        </Box>
      );
    }

    return (
      <>
        <Flex
          justify="space-between"
          align="center"
          p={4}
          bg="gray.50"
          borderRadius="md"
          borderWidth="1px"
        >
          <Text fontWeight="bold">Marcar/Desmarcar Todos</Text>
          <Checkbox
            isChecked={isAllSelected}
            isIndeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(e.target.checked)}
            colorScheme="teal"
            size="lg"
          />
        </Flex>

        <VStack divider={<Divider />} spacing={0} borderWidth="1px" borderRadius="md" align="stretch">
          {scouts.map((scout) => (
            <Flex
              key={scout.id}
              align="center"
              justify="space-between"
              p={4}
              _hover={{ bg: 'gray.50' }}
            >
              <Text>{scout.name}</Text>
              <Checkbox
                isChecked={presentScoutIds.has(scout.id)}
                onChange={(e) => handleCheckboxChange(scout.id, e.target.checked)}
                colorScheme="teal"
                size="lg"
              />
            </Flex>
          ))}
        </VStack>
        
        <Button colorScheme="teal" size="lg" onClick={handleSubmit}>
          Confirmar Presenças
        </Button>
      </>
    );
  };
  
  return (
    <Container maxW="container.lg" py={{ base: '8', md: '12' }}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl">
            Lista de Presença
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