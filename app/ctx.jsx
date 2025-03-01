import { useContext, createContext, useState } from 'react';

const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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

  const signIn = (username, password) => {
    setIsLoading(true);
    // Lógica de autenticación estática
    const response = fakeAuthService(username, password);
    if (response.success) {
      setSession(response.session);
      setError(null);
    } else {
      setError('Invalid credentials');
      setSession(null);
    }
    setIsLoading(false);
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Servicio de autenticación ficticio para este ejemplo
const fakeAuthService = (username, password) => {
  // Simular una llamada a una API de autenticación
  if (username === 'user' && password === 'pass') {
    return { success: true, session: { user: 'user', token: 'abc123' } };
  } else {
    return { success: false };
  }
};
