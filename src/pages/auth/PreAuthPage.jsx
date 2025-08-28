import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Heading,
  VStack,
  useToast,
  Text,
  PinInput,
  PinInputField,
  HStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import useAsync from '@/hooks/useAsync';
import scoutApi from '@/services/scoutApi';

const PreAuthPage = () => {
  const [step, setStep] = useState('request');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const { call: handleRequestCode, loading: isRequesting } = useAsync(async () => {
    if (!email) {
      toast({ description: 'Por favor, digite seu e-mail.', status: 'warning', position: 'top' });
      return;
    }
    try {
      await scoutApi.requestPreAuthCode(email);
      toast({
        title: 'Código Enviado!',
        description: 'Se o e-mail estiver correto, um código de acesso foi enviado.',
        status: 'success',
        position: 'top',
      });
      setStep('verify');
    } catch (error) {
      toast({ title: 'Erro', description: error.message, status: 'error', position: 'top' });
    }
  }, [email, toast]);

  const { call: handleVerifyCode, loading: isVerifying } = useAsync(async () => {
    if (pin.length < 4) {
      toast({ description: 'Por favor, digite os 4 dígitos.', status: 'warning', position: 'top' });
      return;
    }
    try {
      await scoutApi.verifyPreAuthCode(pin);
      localStorage.setItem('deviceAuthorized', 'true');
      toast({
        title: 'Dispositivo autorizado!',
        status: 'success',
        position: 'top',
      });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Código inválido.', description: error.message, status: 'error', position: 'top' });
      setPin('');
    }
  }, [pin, navigate, toast]);

  const renderRequestStep = () => {
    return (
      <VStack as="form" spacing={6} onSubmit={(e) => { e.preventDefault(); handleRequestCode(); }} w="full">
        <Text color="gray.500">
          Por favor, insira o seu e-mail de acesso. Um código de verificação será enviado se o endereço estiver em nossa lista de permissões.
        </Text>
        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
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
          px={12}
          isLoading={isRequesting}
        >
          Enviar Código
        </Button>
      </VStack>
    );
  };

  const renderVerifyStep = () => {
    return (
      <VStack as="form" spacing={6} onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}>
        <Text color="gray.500">
          Digite o código de 4 dígitos que enviamos para o seu e-mail.
        </Text>
        <HStack>
          <PinInput value={pin} onChange={setPin}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          px={12}
          isLoading={isVerifying}
        >
          Verificar Código
        </Button>
      </VStack>
    );
  };

  return (
    <Container centerContent py={{ base: '16', md: '24' }}>
      <VStack spacing={8} textAlign="center" w="full" maxW="md">
        <Heading as="h1" size="xl">Autorização de Acesso</Heading>
        {step === 'request' ? renderRequestStep() : renderVerifyStep()}
      </VStack>
    </Container>
  );
};

export default PreAuthPage;