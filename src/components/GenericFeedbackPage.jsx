import { Box, Button, Heading, Icon, Text, VStack, Container } from '@chakra-ui/react';
import { Check } from 'lucide-react';
import PropTypes from 'prop-types';

const GenericFeedbackPage = ({
  icon: IconComponent,
  iconColor,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Container centerContent py={{ base: '16', md: '24' }}>
      <VStack spacing={8} textAlign="center">
        <Box p="4px" bg={`${iconColor}.100`} borderRadius="full">
          <Box bg={`${iconColor}.500`} borderRadius="full" p={6}>
            <Icon as={IconComponent} color="white" boxSize={12} />
          </Box>
        </Box>
        <VStack spacing={2}>
          <Heading as="h1" size="xl">
            {title}
          </Heading>
          {description && (
            <Text color="gray.500" fontSize="lg">
              {description}
            </Text>
          )}
        </VStack>
        <Button
          colorScheme={iconColor}
          size="lg"
          onClick={onButtonClick}
          px={12}
        >
          {buttonText}
        </Button>
      </VStack>
    </Container>
  );
};

GenericFeedbackPage.propTypes = {
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

GenericFeedbackPage.defaultProps = {
  icon: Check,
  iconColor: 'green',
  description: null,
};


export default GenericFeedbackPage;