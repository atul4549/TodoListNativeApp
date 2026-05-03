import { Stack } from "expo-router";
import { StatusBar } from 'react-native';
// import { Colors } from '../src/constants/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#667eea"} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}