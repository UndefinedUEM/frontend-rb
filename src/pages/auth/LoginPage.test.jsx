import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '@/contexts/AuthContext';
import scoutApi from '@/services/scoutApi';
import AppRoutes from '@/routes';

vi.mock('@/services/scoutApi');
vi.mock('@/contexts/AuthContext');
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const toastMock = vi.fn();

vi.mock('@/hooks/useCustomToast', () => {
  return {
    default: () => toastMock,
  };
});

const renderApp = ({ initialRoute = '/login', isAuthenticated = false } = {}) => {
  const user = userEvent.setup();
  const loginMock = vi.fn();

  useAuth.mockReturnValue({
    isAuthenticated,
    login: loginMock,
  });

  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
    </MemoryRouter>
  );

  return { user, loginMock };
};

describe('LoginPage - Fluxo de Login', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('deve exibir um aviso se os campos estiverem vazios', async () => {
    const { user } = renderApp();

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    await user.click(submitButton);

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Campos obrigatórios.',
        description: expect.any(String),
        status: 'warning',
      })
    );

    expect(scoutApi.login).not.toHaveBeenCalled();
  });

  it('deve exibir um erro se as credenciais forem inválidas', async () => {
    scoutApi.login.mockRejectedValue(new Error('E-mail ou senha inválidos.'));
    const { user } = renderApp();

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'teste@errado.com');
    await user.type(passwordInput, 'senha-errada');
    await user.click(submitButton);

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Erro no login.',
        description: 'E-mail ou senha inválidos.',
        status: 'error',
      })
    );

  });

  it('deve fazer o login e redirecionar para a home em caso de sucesso', async () => {
    scoutApi.login.mockResolvedValue({
      data: { access_token: 'fake-jwt-token' },
    });

    const { user, loginMock } = renderApp();

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'teste@certo.com');
    await user.type(passwordInput, 'senha-certa');
    await user.click(submitButton);

    expect(scoutApi.login).toHaveBeenCalledWith('teste@certo.com', 'senha-certa');
    expect(loginMock).toHaveBeenCalled();

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});