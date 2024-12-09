import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import TabNavigation from './Navigation/TabNavigation';
import {
  StackFIrstDeath,
  StackQuizResults,
  StackTigerHabitatDetailsScreen,
  StackTimeChallengeScreen,
} from './screen/stack';
import {AppContextProvider} from './store/context';
import StackSurviveStorieDetails from './screen/stack/StackSurviveStorieDetails';

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
          <Stack.Screen name="StackQuizResults" component={StackQuizResults} />
          <Stack.Screen
            name="StackTigerHabitatDetails"
            component={StackTigerHabitatDetailsScreen}
          />
          <Stack.Screen
            name="StackSurviveStorieDetails"
            component={StackSurviveStorieDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AppContextProvider>
  );
}

export default App;
