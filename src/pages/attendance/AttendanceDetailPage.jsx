import {
  Box,
  Heading,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const AttendanceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listData = location.state?.listData || { confirmedScouts: [] };

  const formattedDate = new Date(listData.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Container maxW="container.md" py={{ base: '8', md: '12' }}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="lg">Detalhes da Lista de Presença</Heading>
          <Text color="gray.500" mt={1}>Data: {formattedDate}</Text>
        </Box>
        <Box borderWidth="1px" borderRadius="md" overflow="hidden">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Escoteiros Presentes ({listData.confirmedScouts.length})</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listData.confirmedScouts.map((scout) => (
                <Tr key={scout.id}>
                  <Td>{scout.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Button onClick={() => navigate(-1)} colorScheme="teal" size="lg">
          OK
        </Button>
      </VStack>
    </Container>
  );
};

export default AttendanceDetailPage;