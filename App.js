import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import TabNavigation from './Navigation/TabNavigation';
import {
  StackFIrstDeath,
  StackQuizResults,
  StackSurviveStories,
  StackTigerHabitatDetailsScreen,
  StackTimeChallengeScreen,
  StackWelcomeScreen,
} from './screen/stack';
import {AppContextProvider} from './store/context';
import StackSurviveStorieDetails from './screen/stack/StackSurviveStorieDetails';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 1000,
          }}>
          <Stack.Screen
            name="StackWelcomeScreen"
            component={StackWelcomeScreen}
          />
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
          <Stack.Screen
            name="StackSurviveStories"
            component={StackSurviveStories}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AppContextProvider>
  );
}

export default App;
