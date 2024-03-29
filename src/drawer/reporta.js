import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ButtonsTab from '../tabs/buttons';
import ListsTab from '../tabs/lists';
import InputTab from '../tabs/input';
import FontsTab from '../tabs/fonts';

const Reporta = TabNavigator(
  {
    // ListsTab: {
    //   screen: ListsTab,
    //   path: '/lists',
    //   navigationOptions: {
    //     tabBarLabel: 'Desaparecidos',
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <Icon name="question" size={30} type="entypo" color={tintColor} />
    //     ),
    //   },
    // },
    InputTab: {
        screen: InputTab,
        path: '/input',
        navigationOptions: {
          tabBarLabel: 'Input',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name="wpforms"
              size={30}
              type="font-awesome"
              color={tintColor}
            />
          ),
        },
      },
      InputTab: {
        screen: InputTab,
        path: '/input',
        navigationOptions: {
          tabBarLabel: 'Input',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name="wpforms"
              size={30}
              type="font-awesome"
              color={tintColor}
            />
          ),
        },
      },
  },
  {
    initialRouteName: 'InputTab',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
  }
);

Reporta.navigationOptions = {
  drawerLabel: 'Reporta',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="question"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

// Workaround to avoid crashing when you come back on Components screen
// and you were not on the Buttons tab
export default StackNavigator(
  {
    ComponentsTabs: { screen: Reporta },
  },
  {
    headerMode: 'none',
  }
);
