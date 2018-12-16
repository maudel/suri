import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { Button, Icon } from "react-native-elements";


const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const Images = [
  { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg" },
  { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" },
  { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg" },
  { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg" }
]
export default class Fonts extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    denuncias: [
      {
        latitude: -16.503908699999997,
        longitude: -68.1334116,
        name: 'Eva Maria',
        image: Images[0]

      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1234116,
        name: 'Paola Peralez',

        image: Images[0],

      },
      {
        latitude: -16.504908699999997,
        longitude: -68.1134116,
        name: 'Juan Perez',
        image: Images[1],

      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116,
        name: 'Juan Perez',
        image: Images[2],

      },
      {
        latitude: -16.507908699999997,
        longitude: -68.1434116,
        name: 'Juan Perez',
        image: Images[3],

      },
      {
        latitude: -16.508908699999997,
        longitude: -68.1734116,
        name: 'Juan Perez',
        image: Images[1],

      },
      {
        latitude: -16.500908699999997,
        longitude: -68.1934116,
        name: 'Juan Perez',
        image: Images[2],

      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116,
        name: 'Juan Perez',
        image: Images[1],

      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116,
        name: 'Juan Perez',
        image: Images[3],
      }
    ]
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "los permisos han sido denegados"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  render() {
    const interpolations = this.state.denuncias.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <Text>Encontrando tu localizacion actual...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>los permisos de localizacion no fueron dados.</Text>
        ) : this.state.mapRegion === null ? (
          <Text>el mapa de la region no existe.</Text>
        ) : (
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
          >
            {this.state.denuncias.map((marker,index) => {
              // const opacityStyle = {
              //   opacity: interpolations[index].opacity
              // };
              const { width, height } = Dimensions.get("window");

              const CARD_HEIGHT = height / 4;
              const CARD_WIDTH = CARD_HEIGHT - 50;

              function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
              }
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              return (
                // <MapView.Marker key={index} coordinate={{
                //   latitude: marker.latitude,
                //   longitude: marker.longitude
                // }}>
                //   <Animated.View style={[styles.markerWrap, opacityStyle]}>
                //     <Animated.View style={[styles.ring, scaleStyle]} />
                //     <View style={styles.marker} />
                //   </Animated.View>
                // </MapView.Marker>
                


                <MapView.Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                  title={"myTitle"}
                  description={"myDescription"}
                  pinColor={getRandomColor()}
                  onCalloutPress={() => {
                    this.props.navigate('Desaparecidos');
                  }}
                >
                  
                  <MapView.Callout>
                    <View>
                      <Text>Mas informacion</Text>
                      <View
          style={{
            backgroundColor: 'rgba(220,230,218,1)',
            width: 35,
            height: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="plus" color="green" size={10} />
          <Text
            style={{
              color: 'green',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {1}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(220,230,218,1)',
            width: 35,
            height: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="minu" color="green" size={10} />
          <Text
            style={{
              color: 'red',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {1}
          </Text>
        </View>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
                
              );
            })}
          </MapView>
          
        )}
        <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
              {this.state.denuncias.map((marker, index) => (
                <View style={styles.card} key={index}>
                  <Image
                    source={marker.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.description}
                    </Text>
                  </View>
                </View>
              ))}
            </Animated.ScrollView>
        {/* <Text>Location: {this.state.locationResult}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: 10
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 100,
    width: 100,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
