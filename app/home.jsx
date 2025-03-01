import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSession } from './ctx';
import { Redirect } from 'expo-router';

export default function SignInForm() {
  const { signIn, error, successMessage, session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
  
    const formattedUsername = username.trim().toLowerCase();
    const formattedPassword = password.trim().toLowerCase();
    signIn(formattedUsername, formattedPassword);
  };

  if (session) {
    return <Redirect href="/(tabs)/_layout" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username: user</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Password: pass</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  success: {
    color: 'green',
    marginBottom: 16,
  },
});
