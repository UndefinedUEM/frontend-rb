import { createContext, useContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmationModal from '@/components/ConfirmationModal';

const DraftConfirmationContext = createContext(null);

export const DraftConfirmationProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const checkDraftAndNavigate = () => {
    const draftExists = sessionStorage.getItem('inProgressListIds');
    if (draftExists && JSON.parse(draftExists).length > 0) {
      onOpen();
    } else {
      navigate('/listas/presenca');
    }
  };

  const handleNewAttendance = () => {
    sessionStorage.removeItem('inProgressList');
    sessionStorage.removeItem('inProgressListIds');
    onClose();
    navigate('/listas/presenca');
  };

  const handleContinueAttendance = () => {
    onClose();
    navigate('/listas/presenca');
  };

  return (
    <DraftConfirmationContext.Provider value={{ checkDraftAndNavigate }}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleContinueAttendance}
        onCancel={handleNewAttendance}
        title="Lista em Andamento"
        bodyText="Você tem uma lista de presença que não foi finalizada. Deseja continuar de onde parou?"
        confirmButtonText="Sim, continuar"
        cancelButtonText="Não, iniciar nova"
        confirmButtonColorScheme="teal"
      />
    </DraftConfirmationContext.Provider>
  );
};

export const useDraftConfirmation = () => {
  return useContext(DraftConfirmationContext);
};

DraftConfirmationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};