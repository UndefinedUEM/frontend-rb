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
  Text,
  Link,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      toast({
        title: 'Campo obrigatório.',
        description: 'Por favor, preencha seu e-mail.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    console.log('Enviando link de recuperação para:', email);

    setTimeout(() => {
      toast({
        title: 'Verifique seu e-mail!',
        description: 'Se uma conta com este endereço existir, enviamos um link para redefinir sua senha.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container maxW="container.md" py={{ base: '12', md: '24' }} centerContent>
      <Box
        bg="white"
        w="full"
        p={{ base: '6', md: '8' }}
        borderRadius="lg"
        boxShadow="md"
      >
        <VStack as="form" onSubmit={handleSubmit} spacing="6" align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            Recuperar Senha
          </Heading>

          <Text textAlign="center" color="gray.600">
            Sem problemas! Digite seu e-mail abaixo e enviaremos um link para você criar uma nova senha.
          </Text>

          <FormControl isRequired>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
          >
            Enviar Link de Recuperação
          </Button>

          <Flex justify="center">
            <Link as={RouterLink} to="/login" color="teal.500" fontWeight="bold">
              Lembrou a senha? Voltar para o Login
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
};

export default PasswordRecoveryPage;