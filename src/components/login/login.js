import React, { Component } from 'react';
import { SocialIcon, Button } from 'react-native-elements'
import { View,Text,TouchableOpacity,Alert,Image,StyleSheet,ImageBackground  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    LoginManager,
    AccessToken,
    GraphRequestManager,
    GraphRequest,
  } from 'react-native-fbsdk';
  import {
    Container,
    TypeTitle,
    TypeDescription,
    RequestButton,
    RequestButtonText,
    TextModal,
    instructions,
  } from "../../css/styles";
  const styles = StyleSheet.create({
    botaoFb: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
      marginLeft:30,
      bottom: 0,
      width:300
      
      },
    });

export default class login extends Component {
    static navigationOptions = {
        header: null,
      };
    constructor(props) {
        super(props);
      }
      
_fbAuth(){
    var that = this;
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result){
        if(result.isCancelled){
            alert("Login Cancelado!");
        }else{
            AccessToken.getCurrentAccessToken().then(
                (data) =>{
                    let acessToken = data.accessToken;
                    const responseInfoCallback = (error,result)=>{
                        setTimeout(()=>{
                            if(error){
                                Alert.alert('Error'+ error.toString());
                            }else{
                                //erro
                                if(result.email == undefined){
                                    Alert.alert('Error'+ 'Necessario email valido');
                                }else{//sucesso
                                    that.props.navigation.push("Map", {
                                        nome: result.name,
                                        email: result.email,
                                        acessToken:acessToken
                                      });
                                   // Alert.alert('Nome:'+result.name+ '\nemail:'+result.email);
                                }
                               
                            }
                        },200)
                    }
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken:acessToken,
                            parameters:{
                                fields:{
                                    string: 'email,name,first_name,middle_name,last_name'
                                }
                            }
                        },
                        responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                })
            }   
        },function(error){
            alert('erro:'+ error)
        })
    }
   
    
  render() {
    return(
        <ImageBackground source={require('../../img/background.jpeg')} style={{width: '100%', height: '100%'}} >
            <Image style={{height: '50%', width: '100%'}} source={require('../../img/Logo.png')} />
            <SocialIcon
                title='Logar com'
                button
                type='facebook'
                onPress={this._fbAuth.bind(this)}   
                style={styles.botaoFb}
                />
            
        </ImageBackground >
    );
  }
}
