import React, { Component } from 'react';
import { SocialIcon } from 'react-native-elements'
import { View,Text,TouchableOpacity,Alert } from 'react-native';
import {
    LoginManager,
    AccessToken,
    GraphRequestManager,
    GraphRequest
  } from 'react-native-fbsdk';

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
        <View>
            <SocialIcon
                title='Logar com Facebook'
                button
                type='facebook'
                onPress={this._fbAuth.bind(this)}
                />
        </View>
    );
  }
}
