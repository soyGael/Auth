import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Stack, Link } from "expo-router";
import { SessionProvider } from "./ctx";


export default function _layout() {
  return (
    <SessionProvider>
      <Stack>
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <StatusBar style="light" />
      </Stack>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
