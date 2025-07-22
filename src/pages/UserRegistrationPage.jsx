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
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const UserRegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
      toast({
        title: 'Campos obrigatórios.',
        description: 'Por favor, preencha todos os campos do formulário.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (email !== confirmEmail) {
      toast({
        title: 'Erro de validação.',
        description: 'Os endereços de e-mail não coincidem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Senha fraca.',
        description: 'Sua senha deve ter no mínimo 6 caracteres.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Erro de validação.',
        description: 'As senhas não coincidem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    console.log('Enviando dados do novo usuário:', { name, email });

    setTimeout(() => {
      toast({
        title: 'Usuário cadastrado!',
        description: `${name}, seu cadastro foi realizado com sucesso.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      setName('');
      setEmail('');
      setConfirmEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setIsLoading(false);
    }, 2000);
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
            Cadastro de Usuário
          </Heading>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="flushed"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="flushed"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="confirmEmail">Confirmar E-mail</FormLabel>
            <Input
              id="confirmEmail"
              type="email"
              placeholder="Digite seu e-mail novamente"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              variant="flushed"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crie uma senha (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
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

          <FormControl isRequired>
            <FormLabel htmlFor="confirmPassword">Confirmar Senha</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite sua senha novamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="flushed"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
            isDisabled={!name || !email || !confirmEmail || !password || !confirmPassword}
          >
            Confirmar Cadastro
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UserRegistrationPage;