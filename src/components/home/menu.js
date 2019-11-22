import React, { Component } from "react";
import { Text, View,Button,ImageBackground,Image,Modal,ActivityIndicator,StyleSheet } from "react-native";
import axios from 'react-native-axios';
import {
    TypeTitle,
    RequestButton,
    RequestButtonText
  } from "../../css/styles";

    const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
  

export default class Menu extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const emailDono = navigation.getParam('emailDono', 'some default value');
        this.state={
            emailDono:emailDono,
            pets: [],
            petsEncontrados:[],
            loading: true,
        };
        
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('http://18.188.48.213:8080/pet/meusPets/digo-digo5@hotmail.com')
        .then(response => this.setState({ pets: response.data,loading :false}));
        axios.get('http://18.188.48.213:8080/pet/meusPetsEncontrados/digo-digo5@hotmail.com')
        .then(response => this.setState({ petsEncontrados: response.data }));
    }
    funcAtualiza(){
        this._isMounted = true;
        axios.get('http://18.188.48.213:8080/pet/meusPets/digo-digo5@hotmail.com')
        .then(response => this.setState({ pets: response.data,loading :false }));
        axios.get('http://18.188.48.213:8080/pet/meusPetsEncontrados/digo-digo5@hotmail.com')
        .then(response => this.setState({ petsEncontrados: response.data }));
  }
    petEncontrado(id){
        this.setState({
            loading: true,
          });
        axios.get('http://18.188.48.213:8080/pet/petEncontrado/'+id)
        .then(response => funcAtualiza());
    }
    
    render() {
        const Loader = props => {
            const {
              loading,
              ...attributes
            } = props;
        }
            return (
                <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%'}}>
                     <Modal
                            transparent={true}
                            animationType={'none'}
                            visible={this.state.loading}
                            onRequestClose={() => {console.log('close modal')}}>
                            <View style={styles.modalBackground}>
                                <View style={styles.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={this.state.loading} />
                                </View>
                            </View>
                    </Modal>                
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

