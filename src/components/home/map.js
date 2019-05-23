import React, { Component } from "react";
import { View} from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import axios from 'react-native-axios'

import {
  Container,
  TypeTitle,
  TypeDescription,
  RequestButton,
  RequestButtonText
} from "../../css/styles";

export default class Map extends Component {
  state = {
    region: null,
    pets:[]
  };

   componentDidMount(){
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

      axios.get('http://192.168.22.135:8080/pet/')
      .then(response => this.setState({ pets: response.data }));
  }
  

  render() {
    const { region } = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} region={region} showsUserLocation loadingEnabled>
        {this.state.pets.map(pet =>(
              <MapView.Marker
                coordinate={{latitude: pet.latitudePerdido,
                  longitude: pet.longitudePerdido}}
                  title={pet.nome}
                  description={pet.descricao}
                  key={pet.id}
              />
        ))}
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
