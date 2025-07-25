import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAsync from '../../hooks/useAsync';
import scoutApi from '../../services/scoutApi';

const ScoutRegistrationPage = () => {
  const [name, setName] = useState('');
  const [scoutId, setScoutId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const { call: handleRegister, loading: isLoading } = useAsync(async () => {
    try {
      await scoutApi.registerScout({ name, id: scoutId });
      
      toast({
        title: 'Cadastro realizado!',
        description: `O escoteiro ${name} foi cadastrado com sucesso.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      navigate('/cadastro/escoteiros/sucesso');
    } catch (error) {
      toast({
        title: 'Erro no cadastro.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [name, scoutId, navigate, toast]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !scoutId) {
      toast({
        title: 'Campos obrigatórios.',
        description: 'Por favor, preencha o nome e o ID.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    handleRegister();
  };

  return (
    <Container maxW="container.md" py={{ base: '12', md: '24' }}>
      <Box
        bg="white"
        p={{ base: '6', md: '8' }}
        borderRadius="lg"
        boxShadow="md"
      >
        <VStack as="form" onSubmit={handleSubmit} spacing="6" align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            Cadastro de Escoteiro
          </Heading>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome Completo</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do escoteiro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="scoutId">ID do Escoteiro</FormLabel>
            <Input
              id="scoutId"
              type="text"
              placeholder="Digite o ID ou registro do escoteiro"
              value={scoutId}
              onChange={(e) => setScoutId(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
            isDisabled={!name || !scoutId}
          >
            Cadastrar
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ScoutRegistrationPage;