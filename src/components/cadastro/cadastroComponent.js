import React, { Component } from 'react';

import { View,TextInput,StyleSheet,ImageBackground,Button} from 'react-native';
import Photo from '../camera/selecaoFotos';
import axios from 'react-native-axios';


import {
  TypeTitle
} from "../../css/styles";

const styles = StyleSheet.create({
  input: {
  color: 'black' ,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  borderWidth: 0.2,
  borderColor: 'black',
  width: 320


  },
  botao: {
    color: 'white' ,
    backgroundColor: '#66CDAA',
    padding: 10,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150
    },
  });

export default class cadastro extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      nome:'Madruguinha',
      tipo:'Cachorro',
      raca:'Labrador',
      perdido:true,
      descricao:'Ele Fugiu nessa amanhã, estava com uma roupinha amarela',
      latitudePerdido:null,
      longitudePerdido:null,
      foto:null,
      dono:{
        nome:'Rodrigo',
        email:'rcr@hot.com'
      }
    };
  }
   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          latitudePerdido:latitude,
          longitudePerdido:longitude,
        });
      }
    );
   
  }
  
  
    render() {
        return(
            <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%'}}>
              <View style={{margin:10,padding:10}}>
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
                  numberOfLines={6}
                  value={this.state.descricao}
                  />
                <Photo/>
                <Button
                  title="Cadastrar"
                  onPress={this.myfun}
                  color="#66CDAA"
                />
                </View>
            </ImageBackground>
        );
      }

      myfun=()=>{
        retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('base64');
            if (value !== null) {
              this.setState({
                foto:value,
              });
            }
          } catch (error) {
            // Error retrieving data
          }
        };
        axios({
          method: 'post',
          url: 'http://192.168.15.14:8080/pet/addPet',
          data: {
            nome: this.state.nome,
            tipo:this.state.tipo,
            raca:this.state.raca,
            perdido:this.state.perdido,
            descricao:this.state.descricao,
            latitudePerdido:this.state.latitudePerdido,
            longitudePerdido:this.state.longitudePerdido,
            foto: this.state.foto,
            dono:this.state.dono
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
          if(response == 200){
            alert("Pet Cadastrado!");
            this.props.navigation.navigate("Map");
          }else{
            alert('Tente Novamente'+error);
          }
         
        });
        
      }
}

