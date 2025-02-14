import { PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavBar from './components/CustomNavBar';
import HomeScreen from './screens/HomeScreen';
import PokemonScreen from './screens/PokemonScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PokéDex"
          screenOptions={{
            header: (props) => <CustomNavBar {...props} />,
          }}
        >
          <Stack.Screen name="PokéDex" component={HomeScreen} />
          <Stack.Screen name="Pokémon" component={PokemonScreen} />
        </Stack.Navigator>    
      </NavigationContainer>
    </PaperProvider>
  );
}