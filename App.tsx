import React from 'react';
import { LogBox } from 'react-native';

import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { SignIn } from './src/screens/SignIn';
import { Product } from './src/screens/Product';
import { AuthProvider } from './src/hooks/auth';



export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent' />

      <AuthProvider>
        <Product />
      </AuthProvider>
    </ThemeProvider>
  );
}
