import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import Criar from './pages/Criar';
import { navigationRef } from './RootNavigation';

export default function App() {

  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Criar" component={Criar} />
        </Stack.Navigator>
        <StatusBar styles='light' />
    </NavigationContainer>
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
