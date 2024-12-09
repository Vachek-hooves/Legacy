import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TabArticleScreen,
  TabMainScreen,
  TabQuizScreen,
  TabTigerMapScreen,
} from '../screen/tab';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF4444',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="game-controller" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabMainScreen"
        component={TabMainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabTigerMapScreen"
        component={TabTigerMapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="map" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabArticleScreen"
        component={TabArticleScreen}
        options={{
          tabBarLabel: 'Articles',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="newspaper-sharp" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    height: 70,
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingBottom: 5,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: '#FF4444',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#FF4444',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
    }),
    marginHorizontal:10
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TabNavigation;
