import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem, Text, Icon } from 'react-native-elements';
import call from 'react-native-phone-call';

import { default as Service } from './../services/phone_emergency';
import _ from 'lodash';
class PhoneEmergency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
    };
  }
  componentWillMount() {
    let phones = Service.getPhones();
    this.setState({ phones: phones });
  }
  callPhone = Phone => {
    const args = {
      number: Phone, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };
  renderListPhones = () => {
    return _.map(this.state.phones, (e, i) => {
      return (
        <ListItem
          key={i}
          title={e.description}
          badge={{
            value: 'Llamar',
            textStyle: { color: 'white' },
            containerStyle: { marginTop: -20, backgroundColor: '#2ecc71' },
          }}
        />
      );
    });
  };
  render() {
    return (
      <ScrollView>
        <View>{this.renderListPhones()}</View>
      </ScrollView>
    );
  }
}

PhoneEmergency.navigationOptions = {
  title: 'Números de Emergencia',
};

export default PhoneEmergency;
