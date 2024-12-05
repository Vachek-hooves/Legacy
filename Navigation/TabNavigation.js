import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { TabMainScreen } from '../screen/tab';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabMainScreen" component={TabMainScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;


