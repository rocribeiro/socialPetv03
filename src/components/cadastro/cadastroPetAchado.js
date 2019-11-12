import React, { Component } from 'react';

import { View,TextInput,StyleSheet,ImageBackground,Button,Image,Text} from 'react-native';
import axios from 'react-native-axios';
import ImagePicker from 'react-native-image-picker';


import {
  TypeTitle,
  RequestButton,
  RequestButtonText
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
  
  const options = {
    takePhotoButtonTitle:'Tirar Uma Foto',
    chooseFromLibraryButtonTitle:'Abrir Suas Fotos'
  };
export default class cadastroPetAchado extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const nomeDono = navigation.getParam('nomeDono', 'NO-ID');
    const emailDono = navigation.getParam('emailDono', 'some default value');
    const foto = navigation.getParam('base64', '');
    this.state = {
      tipo:'Cachorro',
      raca:'Labrador',
      perdido:true,
      descricao:'Achei ele proximo ao Metrô',
      latitudeEncontrado:null,
      longitudeEncontrado:null,
      foto:null,
      dono:{
        nome:nomeDono,
        email:emailDono
      },
     
    };
  }
  myfun=()=>{
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }else {
          const source =  response.data ;
          console.log(source);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            foto: source,
          });
        }
      });  
}
   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          latitudeEncontrado:latitude,
          longitudeEncontrado:longitude,
        });
      }
    );
   
  }
  
  
    render() {
        return(
            <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%'}}>
              <View style={{margin:10,padding:10}}>
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
                <View>
              <View style={{marginTop:10,padding:5,width: 320}}>
                <Button
                  title="Selecionar Foto do Pet"
                  onPress={this.myfun}    
                />
              </View>
              <Image style={{width:50,height:50,margin:10}} source={{uri: 'data:image/gif;base64,'+this.state.foto}}/>
            </View>
                <Button
                  title="Cadastrar"
                  onPress={this.funCadastro}
                  color="#66CDAA"
                />
                 <RequestButton onPress={() => {this.props.navigation.pop()}}>
                    <RequestButtonText><Text style={{color: 'black'}}>Voltar</Text></RequestButtonText>
                  </RequestButton>
                </View>
            </ImageBackground>
        );
      }
      funCadastro=()=>{
        var that = this;
        axios({
          method: 'post',
          url: 'http://3.133.104.63:8080/pet/detect',
          data: {
            tipo:this.state.tipo,
            raca:this.state.raca,
            perdido:this.state.perdido,
            descricao:this.state.descricao,
            latitudeEncontrado:this.state.latitudeEncontrado,
            longitudeEncontrado:this.state.longitudeEncontrado,
            foto: this.state.foto,
            base64:this.state.foto,
            dono:this.state.dono
          },
          headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
          console.log(response);
            if(response.data == true){
              alert("Pet Cadastrado!");
              that.props.navigation.navigate("Map");
            }else{
              alert("Coloque outra foto do seu Pet");
            }
          }).catch(error => {
              alert("erro");
              console.log(error)
          })
            
        
      }
}

