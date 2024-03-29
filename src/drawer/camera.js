import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import CameraView from '../views/camera';
import desaparecidos from './desaparecidos';


const CameraSuri = StackNavigator(
  {
    Playground: { screen: CameraView },
    home: { screen: desaparecidos },
  },
  {
    headerMode: 'none',
  }
);

CameraSuri.navigationOptions = {
  drawerLabel: 'Sacando foto de perfil',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="pic"
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

export default CameraSuri;
