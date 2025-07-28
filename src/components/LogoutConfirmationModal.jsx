import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirmLogout }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirmLogout}
      title="Confirmar Saída"
      bodyText="Você tem certeza que deseja sair do sistema?"
      confirmButtonText="Sim, sair"
      confirmButtonColorScheme="red"
    />
  );
};

LogoutConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmLogout: PropTypes.func.isRequired,
};

export default LogoutConfirmationModal;