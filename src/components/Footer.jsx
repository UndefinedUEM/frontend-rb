import { Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const footerMessages = [
  'Feito com café, código e carinho',
  'Feito por humanos (e alguns commits de madrugada)',
  'Feito na base do improviso e da paixão',
  'Feito por gente que testa em produção',
  'Feito com ❤️ e alguns bugs',
  'Feito por quem ama código… e sofre com ele',
  'Feito com <div>, emoção e push forçado',
  'Feito com bugs, mas com orgulho',
  'Feito com a coragem de quem não leu a doc',
  'Feito por devs que não sabem nomear variáveis',
];

const teamName = "equipe <undefined />";

const Footer = () => {
  const randomMessage = useMemo(() => {
    const index = Math.floor(Math.random() * footerMessages.length);
    return footerMessages[index];
  }, []);

  return (
    <Box as="footer" py={2} textAlign="center" color="gray.600" fontSize="sm">
      <Text fontSize='xs'>
        {randomMessage} — {' '}
        <Text as='b' color="gray.500">
          {teamName}
        </Text>
      </Text>
    </Box>
  );
};

export default Footer