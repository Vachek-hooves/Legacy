import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabArticleScreen,
  TabMainScreen,
  TabQuizScreen,
  TabTigerMapScreen,
} from '../screen/tab';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabQuizScreen" component={TabQuizScreen} />
      <Tab.Screen name="TabMainScreen" component={TabMainScreen} />
      <Tab.Screen name="TabTigerMapScreen" component={TabTigerMapScreen} />
      <Tab.Screen name="TabArticleScreen" component={TabArticleScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
