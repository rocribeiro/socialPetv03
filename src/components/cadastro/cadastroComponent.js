import React, { Component } from 'react';

import { View,Text,TextInput, } from 'react-native';
import Photo from '../camera/selecaoFotos'

// import { Container } from './styles';

import {
    Container,
    TypeTitle,
    TypeDescription,
    RequestButton,
    RequestButtonText
  } from "../../css/styles";
  

export default class cadastro extends Component {
    render() {
        return(
            <View>
                <TextInput placeholder="Nome"></TextInput>
                <TextInput placeholder="Tipo de Pet"></TextInput>
                <TextInput placeholder="Raça"></TextInput>
                <TypeDescription placeholder="Descrição"></TypeDescription>
                <Photo/>
            </View>
        );
      }
}
cadastro.navigationOptions = {
    title: 'Cadastro',
  }
  