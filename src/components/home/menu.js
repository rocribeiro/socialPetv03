import React, { Component } from "react";
import { Text, View,Button,ImageBackground,Image } from "react-native";
import axios from 'react-native-axios'
import {
    TypeTitle,
    RequestButton,
    RequestButtonText
  } from "../../css/styles";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const emailDono = navigation.getParam('emailDono', 'some default value');
        this.state={
            emailDono:emailDono,
            pets: [],
            petsEncontrados:[]
        };
    }
    componentDidMount() {
        axios.get('http://18.188.48.213:8080/pet/meusPets/digo-digo5@hotmail.com')
        .then(response => this.setState({ pets: response.data }));
        axios.get('http://18.188.48.213:8080/pet/meusPetsEncontrados/digo-digo5@hotmail.com')
        .then(response => this.setState({ petsEncontrados: response.data }));
    }
    componentDidUpdate(){
        axios.get('http://18.188.48.213:8080/pet/meusPets/digo-digo5@hotmail.com')
        .then(response => this.setState({ pets: response.data }));
        axios.get('http://18.188.48.213:8080/pet/meusPetsEncontrados/digo-digo5@hotmail.com')
        .then(response => this.setState({ petsEncontrados: response.data }));
  }
    petEncontrado(id){
        axios.get('http://18.188.48.213:8080/pet/petEncontrado/'+id)
        .then(response => componentDidUpdate());
    }

    render() {
            return (
                <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%'}}>                
            <View style={{flex:2,margin:10}}>
                <View>
                    <TypeTitle>Meus Pets Perdidos:</TypeTitle>
                    {this.state.pets.map(pet => (
                    <View  key={pet.id}>
                        <Text>Nome / Apelido:</Text>
                        <Text>{pet.nome}</Text>
                        <Image style={{width:50,height:50,margin:10}} source={{uri: 'data:image/gif;base64,'+pet.foto}}/>
                        <Button 
                        title="Achei Meu Pet"
                        onPress={() => {
                            this.petEncontrado(pet.id);
                        }}
                    />     
                    </View>
                    ))}
                </View>
                <View>
                    <TypeTitle>Meus Pets Encontrados:</TypeTitle>
                        {this.state.petsEncontrados.map(pet => (
                        <View  key={pet.id}>
                            <Text>Nome / Apelido:</Text>
                            <Text>{pet.nome}</Text>
                            <Image style={{width:50,height:50,margin:10}} source={{uri: 'data:image/gif;base64,'+pet.foto}}/>
                            <Button 
                            title="Achei o dono dele =)"
                            onPress={() => {
                                this.petEncontrado(pet.id);
                            }}
                        />     
                        </View>
                        ))}
                </View>
            </View>
            </ImageBackground>
            );
    }
}

