import _ from 'lodash';
import ListsDetails from '../views/lists_detail';

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ListView,Button} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { default as Service } from './../services/reportes';
import Image from 'react-native-remote-svg';
import Avatar from 'avataaars';

import {
  Text,
  Card,
  Tile,
  Icon,
  ListItem
} from 'react-native-elements';

import colors from '../config/colors';

class Icons extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    
        
    this.state = {
      selectedIndex: 0,
      value: 0.5,
      loading: false,
      data: Service.getReportes(),
      error: null,
    };
    this.arrayholder = this.state.data;
    this.updateIndex = this.updateIndex.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        onPress={log}
        title={rowData.title}
        leftIcon={{ name: rowData.icon }}
        chevron
        bottomDivider
      />
    );
  }

  
  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };
  
  render() {
    const { navigation } = this.props;
    const buttons = ['Button1', 'Button2'];
    const { selectedIndex } = this.state;
    searchFilterFunction = text => {    
      const newData = this.arrayholder.filter(item => {      
        const itemData = `${item.name.title.toUpperCase()}   
        ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const textData = text.toUpperCase();
          
        return itemData.indexOf(textData) > -1;    
      });    
      this.setState({ data: newData });  
    };
    return (
      <ScrollView>
        <View style={styles.container}>
        <Card title="Personas Desaparecidas">
        <SearchBar        
          placeholder="Escribe Aca..."        
          lightTheme        
          round        
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}             
        /> 
  {
    this.state.data.map((u, i) => {
 
      return (
        <View key={i} style={styles.user}>
        
          <Text style={{marginBottom: 10,marginTop:20}}>
          {u.name} fue visto por ultima ves en {u.ultimaVista} 
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Ayudalo' 
          onPress={() => navigation.navigate('Profile',{data: u})}
          />
        </View>
      );
    })
  }
</Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FD6B78',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    //flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 310,
    height: 200,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default Icons;
