import {
  Box,
  Heading,
  Button,
  HStack,
  VStack,
  Table,
  Tr,
  Td,
  Tbody,
  Container,
  Tfoot,
  Icon,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ListChecks } from 'lucide-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';
import scoutApi from '@/services/scoutApi';
import SaveDraftModal from '@/components/SaveDraftModal';

const AttendanceSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const presentScouts = location.state?.presentScouts || [];
  const source = location.state?.source;
  const isFromHistory = source === 'history';

  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const clearInProgressList = () => {
    sessionStorage.removeItem('inProgressList');
    sessionStorage.removeItem('inProgressListIds');
  };

  const { call: handleFinalize, loading: isFinalizing } = useAsync(async () => {
    try {
      const presentIds = presentScouts.map(scout => scout.id);
      const payload = { scoutIds: presentIds };
      await scoutApi.confirmList(payload);

      toast({
        title: 'Presença confirmada!',
        description: 'A lista de presença foi salva com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      clearInProgressList();
      navigate('/listas/presenca/sucesso');

    } catch (error) {
      toast({
        title: 'Erro ao salvar a lista.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [presentScouts, navigate, toast]);

  const handleEdit = useCallback(() => {
    navigate('/listas/presenca');
  }, [navigate]);

  const handleDiscardAndExit = () => {
    clearInProgressList();
    navigate('/');
  };

  const handleSaveAndExit = () => {
    navigate('/listas/historico');
  };

  const renderButtons = () => {
    if (isFromHistory) {
      return (
        <VStack spacing={4}>
          <Button
            colorScheme="teal"
            onClick={handleFinalize}
            w="full"
            size="lg"
            isLoading={isFinalizing}
          >
            Confirmar
          </Button>
          <Button
            colorScheme="gray"
            variant="ghost"
            onClick={handleEdit}
            w="full"
            size="lg"
            isDisabled={isFinalizing}
          >
            Editar
          </Button>
        </VStack>
      );
    }

    return (
      <VStack spacing={4}>
        <Button
          colorScheme="teal"
          onClick={handleFinalize}
          w="full"
          size="lg"
          isLoading={isFinalizing}
        >
          Salvar lista
        </Button>
        <Button
          colorScheme="gray"
          variant="ghost"
          onClick={onOpen}
          w="full"
          size="lg"
          isDisabled={isFinalizing}
        >
          Sair sem salvar
        </Button>
      </VStack>
    );
  };

  return (
    <>
      <Container maxW="container.lg" py={{ base: '8', md: '12' }}>
        <VStack spacing={8} align="stretch">
          <VStack>
            <HStack>
              <Icon as={ListChecks} boxSize={8} color="teal.500" />
              <Heading as="h1" size="xl">
                Resumo da Presença
              </Heading>
            </HStack>
            <Heading size="xs" color="gray.500">
              Confirme a lista antes de salvar - Data: {formattedDate}
            </Heading>
          </VStack>

          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <Table variant="striped" colorScheme="gray">
              <Tbody>
                {presentScouts.map((scout) => (
                  <Tr key={scout.id}>
                    <Td>{scout.name}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td textAlign="right" fontWeight="bold">
                    Total de Presentes: {presentScouts.length}
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
          
          {renderButtons()}

        </VStack>
      </Container>

      <SaveDraftModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSaveAndExit}
        onDiscard={handleDiscardAndExit}
      />
    </>
  );
};

export default AttendanceSummaryPage;