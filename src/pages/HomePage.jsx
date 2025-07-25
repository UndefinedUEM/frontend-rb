import {
  Box,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { History, UserPlus, ListPlus } from 'lucide-react';

import ActionCard from '@/components/ActionCard';

const HomePage = () => {
  return (
    <Box p={4}>
      <Container maxW="container.lg" textAlign="center">
        <Heading
          as="h2"
          size={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          py={12}
        >
          Sempre Alerta para Servir!
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color='gray.600' mb={8}>
          Olá Fulano! Bem-vindo ao sistema de presença do grupo. Use os atalhos abaixo para criar uma nova lista de chamada ou consultar o histórico de eventos.
        </Text>
      </Container>

      <Box id="acoes" pb={12}>
        <Heading as="h3" size="lg" textAlign="center" mb={10}>
          O que você precisa?
        </Heading>
        
        <Flex
          justify="center"
          align="stretch"
          wrap="wrap"
          gap={10}
        >
          <Box width={{ base: '90%', sm: '80%', md: '320px' }}>
            <ActionCard
              icon={UserPlus}
              title="Novo Escoteiro"
              text="Faça o cadastro de um novo escoteiro em nosso grupo"
              buttonText="Cadastrar"
              href="/cadastro/escoteiros"
            />
          </Box>
          <Box width={{ base: '90%', sm: '80%', md: '320px' }}>
            <ActionCard
              icon={History}
              title="Listas anteriores"
              text="Acesse as listas de presença de eventos passados"
              buttonText="Acessar Listas"
              href="/listas"
            />
          </Box>
          <Box width={{ base: '90%', sm: '80%', md: '320px' }}>
            <ActionCard
              icon={ListPlus}
              title="Lista de presença"
              text="Cadastre uma nova lista de presença para uma atividade"
              buttonText="Registrar presença"
              href="/listas/presenca"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePage;