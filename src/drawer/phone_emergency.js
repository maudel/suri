import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import PhoneEmergency from '../views/phone_emergency';

const PhoneEmergencyDrawer = StackNavigator({
  Playground: {
    screen: PhoneEmergency,
    navigationOptions: ({ navigation }) => ({
      title: 'Numeros de Emergencia',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#f5f5f5',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          iconStyle={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    }),
  },
});

PhoneEmergencyDrawer.navigationOptions = {
  drawerLabel: 'Numeros de Emergencia',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="person"
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

export default PhoneEmergencyDrawer;
