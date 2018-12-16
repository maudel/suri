import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../views/profile';

const ProfileDrawerItem = StackNavigator({
  Playground: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#f5f5f5',
      },
      headerLeft: (
        <Icon
          name="face"
          size={30}
          type="entypo"
          iconStyle={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    }),
  },
});

ProfileDrawerItem.navigationOptions = {
  drawerLabel: 'Reportes'
};

export default ProfileDrawerItem;
