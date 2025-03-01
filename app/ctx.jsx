import { useContext, createContext, useState } from 'react';
import { useStorageState } from './useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Este hook se puede usar para acceder a la información del usuario.
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
  const [[isLoading, session], setSession] = useStorageState('session');
  const [error, setError] = useState(null);

  const signIn = async (username, password) => {
    try {
      setSession([true, null]); // Empieza cargando
      // Lógica de autenticación
      const response = await fakeAuthService(username, password);
      if (response.success) {
        await AsyncStorage.setItem('session', JSON.stringify(response.session));
        setSession([false, response.session]);
      } else {
        setError('Invalid credentials');
        setSession([false, null]);
      }
    } catch (e) {
      setError('An error occurred');
      setSession([false, null]);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('session');
    setSession([false, null]);
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
const fakeAuthService = async (username, password) => {
  // Simular una llamada a una API de autenticación
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'user' && password === 'pass') {
        resolve({ success: true, session: { user: 'user', token: 'abc123' } });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};
