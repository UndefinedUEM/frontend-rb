import { Box, Button, Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ActionCard = ({ title, text, icon, buttonText, href }) => {
  return (
    <Stack
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      align="center"
      spacing={4}
      height="100%"
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Box textAlign="center">
        <Icon as={icon} w={12} h={12} color="teal.500"/>
        <Heading fontSize="xl" textAlign="center" mb={2}>{title}</Heading>
        <Text color={'gray.500'} textAlign="center">{text}</Text>
      </Box>
      <Button as="a" href={href} colorScheme="teal" width="100%">
        {buttonText}
      </Button>
    </Stack>
  );
};

ActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  buttonText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ActionCard;

