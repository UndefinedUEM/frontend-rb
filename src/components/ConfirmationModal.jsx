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

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  bodyText,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  confirmButtonColorScheme = 'red',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme={confirmButtonColorScheme} onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonColorScheme: PropTypes.string,
};

export default ConfirmationModal;