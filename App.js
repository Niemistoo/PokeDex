import { StyleSheet } from 'react-native';
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
          <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        </Stack.Navigator>    
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    borderColor: 'black'
  },
  header: {
    alignSelf: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    margin: 8,
    paddingHorizontal: 16,
    backgroundColor: 'yellow',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 10,
  },
});
