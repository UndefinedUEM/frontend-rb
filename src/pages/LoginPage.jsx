import { useAuth } from '@/contexts/AuthContext';
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
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Link,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios.',
        description: 'Por favor, preencha seu e-mail e senha.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    console.log('Tentativa de login com:', { email, password });

    setTimeout(() => {
      if (email === 'teste@teste.com' && password === '123456') {
        login();
        navigate('/');
      } else {
        toast({
          title: 'Erro no login.',
          description: 'E-mail ou senha inválidos. Tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
      setIsLoading(false);
    }, 1500);
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
            Entrar
          </Heading>

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

          <FormControl isRequired>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  icon={showPassword ? <EyeOff /> : <Eye />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          
          <Stack direction="row" justify="flex-end" align="center">
            <Link as={RouterLink} to="/recuperar-senha" color="teal.500" fontSize="sm">
              Esqueceu a senha?
            </Link>
          </Stack>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
          >
            Entrar
          </Button>

          <Flex justify="center">
            <Text fontSize="sm">
              Não tem uma conta?{' '}
              <Link as={RouterLink} to="/cadastro/usuario" color="teal.500" fontWeight="bold">
                Cadastre-se
              </Link>
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;