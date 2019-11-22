import React, { Component } from "react";
import { Modal, Text, View, ImageBackground,Image,BackHandler,TouchableOpacity,TouchableHighlight } from "react-native";
import { DrawerActions } from 'react-navigation-drawer';
import Share,{Button} from 'react-native-share';
import MapView from "react-native-maps";
import axios from 'react-native-axios'
import { Marker } from 'react-native-maps';
import Logout from '../deslogarFB/logout';
import OneSignal from 'react-native-onesignal';
import { Header } from 'react-native-elements';

import {
  Container,
  TypeTitle,
  RequestButton,
  RequestButtonText,
  TextModal,
} from "../../css/styles";
export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const nome = navigation.getParam('nome', 'NO-ID');
    const email = navigation.getParam('email', 'some default value');
    const acessToken = navigation.getParam('acessToken', 'some default value');
    this.state = {
      region: null,
      pets: [],
      visible: false,
      modalVisible: false,
      dono:{
        nomeDono:nome,
        emailDono:email,
      },
        petModal:{
          nome:null,
          descricao:null,
          raca:null,
          perdido:null,
          latitudePerdido:null,
          longitudePerdido:null
        }
    };
  
  }
  

  setModalVisible(visible,nome,descricao,raca,latitudePerdido,longitudePerdido,nomeDono,emailDono,foto,perdido,achado) {
    this.setState({ modalVisible: visible });
    this.setState({ 
      petModal:{
        nome:nome,
        descricao:descricao,
        raca:raca,
        latitudePerdido:latitudePerdido,
        longitudePerdido:longitudePerdido,
        foto:foto,
        nomeDono:nomeDono,
        emailDono:emailDono,
        perdido:perdido,
        achado:achado
    }
     });

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => { return true; });
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          }
        });
      }, //sucesso
      () => { }, //erro
      {
        timeout: 2000,//tempo em que vai ficar tentando pegar a location caso n'ao consiga vai retornar erro.
        enableHighAccuracy: true,//serve para pegar a location via gps pois e melhor mais detalhada
        maximumAge: 1000 //cache para quardar a location do usuario
      }
    );

    axios.get('http://18.188.48.213:8080/pet/')
      .then(response => this.setState({ pets: response.data }));

      OneSignal.init("cc75646d-bba9-436a-8734-af22fd56b494");

  }
  componentDidUpdate(){
    axios.get('http://18.188.48.213:8080/pet/')
      .then(response => this.setState({ pets: response.data }));
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({visible:false});
  }
  onOpen() {
    console.log("OPEN")
    this.setState({visible:true});
  }
  render() {
    let shareOptions = {
      title: "Alerta!!!",
      message: "Nós Ajude a Encontrar Nosso Animalzinho,Ele se chama "+this.state.petModal.nome+" é da raça "+this.state.petModal.raca+" e foi visto a ultima fez proximo",
      url: "https://www.google.com/maps/search/?api=1&query="+this.state.petModal.latitudePerdido+","+this.state.petModal.longitudePerdido,
    };
    let shareOptions2 = {
      title: "Alerta!!!",
      message: "Acabei de encontrar um Animazinho ele é da raça "+this.state.petModal.raca+" e foi encontrado no seguinte local.",
      url: "https://www.google.com/maps/search/?api=1&query="+this.state.petModal.latitudePerdido+","+this.state.petModal.longitudePerdido,
    };
    const { region,marcador } = this.state;
    
    //const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
         <TouchableOpacity  onPress={() => this.props.navigation.navigate("Menu",{
                emailDono:this.state.dono.emailDono})} style={{height: '5%', width: '10%',marginLeft: 15}}>
              <Image  style={{height: '100%', width: '100%'}} source={require('../../img/menuburger.png')} />
          </TouchableOpacity >
        <MapView style={{ flex: 1 }} region={region} showsUserLocation loadingEnabled>
        {this.state.pets.map(pet => (
            <Marker
                  coordinate={{
                    latitude: pet.latitudePerdido,
                    longitude: pet.longitudePerdido
                  }}
                  key={pet.id}
                  onPress={() => { this.setModalVisible(true,pet.nome,pet.descricao,pet.raca,pet.latitudePerdido,pet.longitudePerdido,pet.donoNome,pet.donoEmail,pet.foto,pet.perdido,pet.achado) }}
                  pinColor= {pet.colorMarker}
                />
                ))}
        </MapView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%',marginTop: 22}}>
          <View style={{
            flexDirection: 'row',
            height: 100,
            padding: 20,
          }}>        
            <View style={{flex:0.98}}>
              
              <Image style={{height: '200%', width: '70%',justifyContent: 'center',alignItems: 'center'}} source={{uri: 'data:image/gif;base64,'+this.state.petModal.foto}} />
                  <TypeTitle>Nome do Pet:</TypeTitle>
                  <TextModal>{this.state.petModal.nome}</TextModal>
                  <TypeTitle>Descrição:</TypeTitle>
                  <TextModal>{this.state.petModal.descricao}</TextModal>
                  <TypeTitle>Raça</TypeTitle>
                  <TextModal>{this.state.petModal.raca}</TextModal>
                  <TypeTitle>Contato</TypeTitle>
                  <TextModal>Email: {this.state.petModal.emailDono}</TextModal>
                  <TextModal>Falar com: {this.state.petModal.nomeDono}</TextModal>
                  <RequestButton onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                    <RequestButtonText><Text style={{color: 'black'}}>Sair</Text></RequestButtonText>
                  </RequestButton>
            </View>
            <View style={{flex:0.2}}>
            <TouchableOpacity onPress={()=>{
              if(this.state.petModal.achado ==true){
                Share.open(shareOptions2);
              }else{
                Share.open(shareOptions);
              }
              }}>
              <Image style={{height: '107%', width: '117%'}}  source={require('../../img/share.png')} />
            </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>
        </Modal>
        <Container>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>                                                                                           
            <View style={{height:100}}>
              <TypeTitle style={{marginRight:100}}>Perdi Meu Pet</TypeTitle>
              <RequestButton onPress={() => this.props.navigation.navigate("Cadastro",{
                nomeDono:this.state.dono.nomeDono,
                emailDono: this.state.dono.emailDono
                })}>
                  <Image style={{height: '80%', width: '30%',marginRight:100}} source={require('../../img/petAlert.png')} />
              </RequestButton>
            </View>
            <View style={{height:100}}>
              <TypeTitle >Achei um Pet</TypeTitle>
              <RequestButton onPress={() => this.props.navigation.navigate("cadastroPetAchado",{
                nomeDono:this.state.dono.nomeDono,
                emailDono: this.state.dono.emailDono
                })}>
                  <Image style={{height: '100%', width: '50%'}} source={require('../../img/acheiPet.png')} />
              </RequestButton>
            </View>
          </View>
        </Container>
      </View>
    );
  }
}

