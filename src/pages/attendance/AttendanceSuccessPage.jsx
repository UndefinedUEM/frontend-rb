import { useNavigate } from 'react-router-dom';

import GenericFeedbackPage from '@/components/GenericFeedbackPage';

const AttendanceSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <GenericFeedbackPage
      title="Lista de Presença Registrada!"
      description="Os dados foram salvos com sucesso no sistema."
      buttonText="Voltar para o Início"
      onButtonClick={() => navigate('/')}
    />
  );
};

export default AttendanceSuccessPage;