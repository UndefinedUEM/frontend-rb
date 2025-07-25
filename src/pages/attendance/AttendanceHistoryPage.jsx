import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AttendanceCard from '@/components/AttendanceCard';
import ConfirmationModal from '@/components/ConfirmationModal';
import useAsync from '@/hooks/useAsync';
import scoutApi from '@/services/scoutApi';

const AttendanceHistoryPage = () => {
  const [apiLists, setApiLists] = useState([]);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const { call: fetchLists, loading: isLoading } = useAsync(async () => {
    try {
      const response = await scoutApi.getLists();
      setApiLists(response || []);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists, refreshTrigger]);

  const { call: handleConfirm } = useAsync(async (list) => {
    try {
      const presentIds = list.confirmedScouts.map(scout => scout.id);
      await scoutApi.confirmList(presentIds);
      toast({ title: 'Lista confirmada com sucesso!', status: 'success', position: 'top' });
      sessionStorage.removeItem('inProgressList');
      sessionStorage.removeItem('inProgressListIds');
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      toast({ title: 'Erro ao confirmar lista', description: err.message, status: 'error', position: 'top' });
    }
  }, [toast]);

  const handleDelete = () => {
    sessionStorage.removeItem('inProgressList');
    sessionStorage.removeItem('inProgressListIds');
    setRefreshTrigger(prev => prev + 1);
    onDeleteModalClose();
    toast({ title: 'Rascunho deletado.', status: 'info', position: 'top' });
  };

  const handleEdit = useCallback(() => {
    navigate('/listas/presenca');
  }, [navigate]);

  const handleCardClick = useCallback((list) => {
    if (list.status === 'inProgress') {
      const presentScouts = list.confirmedScouts;
      navigate('/listas/presenca/resumo', { state: { presentScouts } });
    } else {
      navigate(`/listas/detalhes/${list.id}`, { state: { listData: list } });
    }
  }, [navigate]);

  const allLists = useMemo(() => {
    const savedScoutsRaw = sessionStorage.getItem('inProgressList');
    if (!savedScoutsRaw) return apiLists;
    const confirmedScouts = JSON.parse(savedScoutsRaw);
    if (confirmedScouts.length === 0) return apiLists;

    const inProgressList = {
      id: 'in-progress',
      createdAt: new Date().toISOString(),
      confirmedScouts,
      status: 'inProgress',
    };
    return [inProgressList, ...apiLists];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLists, refreshTrigger]);

  const renderContent = () => {
    if (isLoading && apiLists.length === 0) {
      return (
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Container maxW="container.md" py={12}>
          <Alert status="error" borderRadius="md">
            <AlertIcon /><Box><AlertTitle>Ocorreu um Erro</AlertTitle><AlertDescription>{error}</AlertDescription></Box>
          </Alert>
        </Container>
      );
    }

    if (allLists.length === 0) {
      return (
        <Box textAlign="center" p={8} borderWidth="1px" borderRadius="md" borderStyle="dashed">
          <Text fontSize="lg" color="gray.500">Nenhuma lista de presença foi encontrada.</Text>
        </Box>
      );
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {allLists.map((list) => (
          <AttendanceCard
            key={list.id}
            listData={list}
            status={list.status}
            onCardClick={() => handleCardClick(list)}
            onEdit={handleEdit}
            onDelete={onDeleteModalOpen}
            onConfirm={() => handleConfirm(list)}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <Container maxW="container.xl" py={{ base: '8', md: '12' }}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">Histórico de Listas</Heading>
          {renderContent()}
        </VStack>
      </Container>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirm={handleDelete}
        title="Deletar Rascunho"
        bodyText="Você tem certeza que quer deletar esta lista em andamento? Esta ação não pode ser desfeita."
        confirmButtonText="Sim, deletar"
      />
    </>
  );
};

export default AttendanceHistoryPage;