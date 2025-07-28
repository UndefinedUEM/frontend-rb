import { Heading, Text, Button, VStack, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Flex justify="center" align="center" minH="calc(100vh - 200px)">
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="2xl">404</Heading>
        <Text fontSize="xl">Página Não Encontrada</Text>
        <Text color="gray.500">
          A página que você está procurando não existe ou foi movida.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="teal" mt={6}>
          Voltar para o Início
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFoundPage;