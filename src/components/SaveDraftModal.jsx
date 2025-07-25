import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SaveDraftModal = ({ isOpen, onClose, onSave, onDiscard }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sair da Confirmação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Deseja manter esta lista como rascunho para continuar depois?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" variant="ghost" mr={3} onClick={onDiscard}>
            Não, descartar
          </Button>
          <Button colorScheme="teal" onClick={onSave}>
            Sim, manter rascunho
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

SaveDraftModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

export default SaveDraftModal;