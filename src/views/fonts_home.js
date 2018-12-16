import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, ScrollView, Dimensions } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { Button } from "react-native-elements";

export default class Fonts extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    denuncias: [
      {
        latitude: -16.503908699999997,
        longitude: -68.1334116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1234116
      },
      {
        latitude: -16.504908699999997,
        longitude: -68.1134116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116
      },
      {
        latitude: -16.507908699999997,
        longitude: -68.1434116
      },
      {
        latitude: -16.508908699999997,
        longitude: -68.1734116
      },
      {
        latitude: -16.500908699999997,
        longitude: -68.1934116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116
      },
      {
        latitude: -16.501108699999997,
        longitude: -68.1134116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116
      },
      {
        latitude: -16.502908699999997,
        longitude: -68.1434116
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
            {this.state.denuncias.map(marker => {
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
              return (
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
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              );
            })}
          </MapView>
        )}

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
