import React, { Component } from 'react';

import { View,TextInput, Button} from 'react-native';
import Photo from '../camera/selecaoFotos'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'react-native-axios'

// import { Container } from './styles';

export default class cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:'Cão',
      tipo:'Cachorro',
      raca:'Fura Saco',
      perdido:true,
      descricao:'imsdiemdim23idm43idmi4mid4m',
      latitudePerdido:null,
      longitudePerdido:null,
      foto:null,
      dono:''
    };
  }
   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        alert(latitude); 
        this.setState({
          latitudePerdido:latitude,
          longitudePerdido:longitude,
        });
      }
    );
   
  }
  
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('base64')
      if(value !== null) {
        this.setState({ foto: value })
        alert(this.state.foto);
      }
    } catch(e) {
      // error reading value
    }
  }
    render() {
        return(
            <View>
              <TextInput
                  value={this.state.nome}
                  onChangeText={nome => this.setState({nome})}
                  placeholder="Nome"
                />
                <TextInput
                  value={this.state.tipo}
                  onChangeText={tipo => this.setState({tipo})}
                  placeholder="Tipo de Pet"
                />
                <TextInput
                  value={this.state.raca}
                  onChangeText={raca => this.setState({raca})}
                  placeholder="Raça"
                />
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  value={this.state.descricao}
                  onChangeText={descricao => this.setState({descricao})}
                  placeholder="Descrição"/>
                <Photo/>
                <Button onPress={this.myfun} title="Cadastrar"/>
            </View>
        );
      }

      myfun=()=>{
        axios({
          method: 'post',
          url: 'http://192.168.22.135:8080/pet/addPet',
          data: {
            nome: this.state.nome,
            tipo:this.state.tipo,
            raca:this.state.raca,
            perdido:this.state.perdido,
            descricao:this.state.descricao,
            latitudePerdido:this.state.latitudePerdido,
            longitudePerdido:this.state.longitudePerdido,
            foto: this.state.foto
          },
          headers: {'Content-Type': 'application/json'}
        });
      }
}



cadastro.navigationOptions = {
    title: 'Cadastro',
  }
  