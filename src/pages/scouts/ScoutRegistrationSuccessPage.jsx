import GenericFeedbackPage from '@/components/GenericFeedbackPage';
import { useNavigate } from 'react-router-dom';

const ScoutRegistrationSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <GenericFeedbackPage
      title="Escoteiro Cadastrado com Sucesso!"
      description="O novo membro já pode ser incluído nas próximas listas de presença."
      buttonText="Voltar para o Início"
      onButtonClick={() => navigate('/')}
    />
  );
};

export default ScoutRegistrationSuccessPage;