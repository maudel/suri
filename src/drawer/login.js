import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../views/login';
import desaparecidos from './desaparecidos';



const LoginDrawerItem = StackNavigator(
  {
    Playground: { screen: Login },
    home: { screen: desaparecidos}
  },
  {
    headerMode: 'none',
  }
);

LoginDrawerItem.navigationOptions = {
  drawerLabel: 'Login',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="email"
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

export default LoginDrawerItem;
