import React, { Component } from "react";
import { View} from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

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
        <MapView style={{ flex: 1 }} region={region} showsUserLocation loadingEnabled>
        <MapView.Marker
            coordinate={{latitude: -9.01 ,
            longitude: -35.22}}
            title={"perdido"}
            description={"Tartaruga, Perdida"}
         />
         <MapView.Marker
            coordinate={{latitude:-28.52 ,
            longitude: -52.99}}
            title={"Perdido"}
            description={"Cachorro,perdido"}
         />
         <MapView.Marker
            coordinate={{latitude:-23.54 ,
            longitude: -46.63}}
            title={"Achado"}
            description={"Gato, Achado"}
            pinColor='#64FE2E'
         />
        </MapView>
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
