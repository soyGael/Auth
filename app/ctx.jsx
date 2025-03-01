import { useContext, createContext, useState } from 'react';

const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: null,
  successMessage: null,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const signIn = (username, password) => {
    setIsLoading(true);
    const response = fakeAuthService(username, password);
    if (response.success) {
      setSession(response.session);
      setSuccessMessage('Login successful!');
      setError(null);
    } else {
      setError(response.error);
      setSuccessMessage(null);
      setSession(null);
    }
    setIsLoading(false);
  };

  const signOut = () => {
    setSession(null);
    setSuccessMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        error,
        successMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Servicio de autenticación ficticio para este ejemplo
const fakeAuthService = (username, password) => {
  if (username === 'user' && password === 'pass') {
    return { success: true, session: { user: 'user', token: 'abc123' } };
  } else {
    return { success: false, error: 'Invalid credentials' };
  }
};
