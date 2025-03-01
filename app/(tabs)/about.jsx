import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSession } from '../ctx';
import { Redirect } from 'expo-router';

export default function About() {
  const { signOut, session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  if (!session) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <Text>Press to exit</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
