import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { default as Service } from './../services/education';
import _ from 'lodash';
class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
    };
  }
  componentWillMount() {
    let tips = Service.getTips();
    this.setState({ tips: tips });
  }
  renderListTips = () => {
    return _.map(this.state.tips, (e, i) => {
      return (
        <Card
          key={i}
          containerStyle={{ padding: 0 }}
          title={'Consejo:' + (i + 1)}
        >
          <ListItem roundAvatar title={e.tip} />
        </Card>
      );
    });
  };
  render() {
    return (
      <ScrollView>
        <View>{this.renderListTips()}</View>
      </ScrollView>
    );
  }
}

Education.navigationOptions = {
  title: 'Consejos Educativos',
};

export default Education;
