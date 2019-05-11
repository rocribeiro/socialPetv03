import React, { Component } from "react";
import { View} from "react-native";
import MapView from "react-native-maps";

import {
  Container,
  TypeTitle,
  TypeDescription,
  RequestButton,
  RequestButtonText
} from "../../css/styles";

export default class Map extends Component {
  state = {
    region: null
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout:2000,//tempo em que vai ficar tentando pegar a location caso n'ao consiga vai retornar erro.
        enableHighAccuracy:true,//serve para pegar a location via gps pois e melhor mais detalhada
        maximumAge:1000 //cache para quardar a location do usuario
      }
    );
  }


  render() {
    const { region } = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
         />
        <Container>
          <RequestButton onPress={() =>  navigate('Cadastro')}>
            <RequestButtonText>Perdi Meu Pet</RequestButtonText>
          </RequestButton>
        </Container>
      </View>
    );
  }
}
Map.navigationOptions = {
  title: 'Home',
}
