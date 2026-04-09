import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { navigationRef } from './Navigation';
import Home from './templates/Home.js';
import Menu from './components/Menu.js';
import Transferencia from './templates/Transferencia.js';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Menu' component={Menu}/>
          <Stack.Screen name='Transferencia' component={Transferencia}/>
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
  );
}