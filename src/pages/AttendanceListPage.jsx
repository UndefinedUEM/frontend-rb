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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { initialScouts } from './mock-list';

const AttendanceListPage = () => {
  const [scouts] = useState(initialScouts);
  const [presentScoutIds, setPresentScoutIds] = useState(new Set());
  const navigate = useNavigate();
  const toast = useToast();

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

    navigate('/lista/presenca/resumo', { state: { presentScouts } });
  };

  const isAllSelected = presentScoutIds.size > 0 && presentScoutIds.size === scouts.length;
  const isIndeterminate = presentScoutIds.size > 0 && presentScoutIds.size < scouts.length;

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
      </VStack>
    </Container>
  );
};

export default AttendanceListPage;