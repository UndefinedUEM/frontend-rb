import {
  Box,
  Heading,
  Button,
  VStack,
  Table,
  Tr,
  Td,
  Tbody,
  Container,
  Tfoot,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AttendanceSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const presentScouts = location.state?.presentScouts || [];

  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleFinalize = useCallback(() => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('checkedItems');
    navigate('/');
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Container maxW="container.lg" py={{ base: '8', md: '12' }}>
      <VStack spacing={8} align="stretch">
        <VStack>
          <Heading as="h1" size="xl">
            Lista de Presença
          </Heading>
          <Heading size="xs" color="gray.500">
            Data: {formattedDate}
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
                  Total de Escoteiros: {presentScouts.length}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>

        <VStack spacing={4}>
          <Button colorScheme="teal" onClick={handleFinalize} w="full" size="lg">
            Finalizar
          </Button>
          <Button colorScheme="teal" variant="ghost" onClick={handleGoBack} w="full" size="lg">
            Voltar e Editar
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default AttendanceSummaryPage;