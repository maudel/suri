import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Education from '../views/education';

const EducationDrawer = StackNavigator({
  Playground: {
    screen: Education,
    navigationOptions: ({ navigation }) => ({
      title: 'Consejos Educativos',
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

EducationDrawer.navigationOptions = {
  drawerLabel: 'Consejos Educativos',
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

export default EducationDrawer;
