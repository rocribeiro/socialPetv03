import React, { Component } from 'react';

import { View,TextInput, Button,StyleSheet} from 'react-native';
import Photo from '../camera/selecaoFotos';
import axios from 'react-native-axios';

import {
  TypeTitle
} from "../../css/styles";

const styles = StyleSheet.create({
  input: {
  color: 'black' ,
  backgroundColor: 'white',
  padding: 5,
  borderRadius: 5,
  borderWidth: 0.2,
  borderColor: 'black',
  //alignItems: 'center',
  //justifyContent: 'center',
  width: 250
  //display: inline-block,
  //border: none,

  },
  botao: {
    color: 'white' ,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150
    //display: inline-block,
    //border: none,
    },
  });

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
  
    render() {
        return(
            <View>
              <TypeTitle>Nome:</TypeTitle>
              <TextInput
                  value={this.state.nome}
                  onChangeText={nome => this.setState({nome})}
                  placeholder="Nome"
                  style={styles.input}
                />
                <TypeTitle>Tipo:</TypeTitle>
                <TextInput
                  value={this.state.tipo}
                  onChangeText={tipo => this.setState({tipo})}
                  placeholder="Tipo de Pet"
                  style={styles.input}
                />
              <TypeTitle>Raça:</TypeTitle>
                <TextInput
                  style={styles.input}
                  value={this.state.raca}
                  onChangeText={raca => this.setState({raca})}
                  placeholder="Raça"
                />
                <TypeTitle>Descrição:</TypeTitle>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  numberOfLines={4}
                  value={this.state.descricao}
                  onChangeText={descricao => this.setState({descricao})}
                  placeholder="Descrição"/>
                <Photo/>
                <Button style={styles.botao} onPress={this.myfun} title="Cadastrar"/>
            </View>
        );
      }

      myfun=()=>{
        axios({
          method: 'post',
          url: 'http://18.191.161.180:8080/pet/addPet',
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
        alert("Pet Cadastrado!");
        this.props.navigation.navigate("Map");
      }
}

cadastro.navigationOptions = {
    title: 'Cadastro',
  }