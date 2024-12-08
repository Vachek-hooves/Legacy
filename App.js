import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import TabNavigation from './Navigation/TabNavigation';
import {StackFIrstDeath, StackTimeChallengeScreen} from './screen/stack';
import {AppContextProvider} from './store/context';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="StackFirstDeath" component={StackFIrstDeath} />
          <Stack.Screen
            name="StackTimeChallengeScreen"
            component={StackTimeChallengeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AppContextProvider>
  );
}

export default App;
