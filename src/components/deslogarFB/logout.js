import React, { Component } from 'react';

import { View,Button,Image } from 'react-native';


export default class camera extends Component {
    constructor(props){
        super(props)
        this.state={
            avatarSource:null
        }
    }
logout=()=>{
    LoginManager.logOut();
}

  render() {
    return(
        <View>
          <View style={{marginTop:10,padding:5,width: 320}}>
            <Button
              title="Deslogar"
              onPress={this.logout}    
            />
          </View>
        </View>
    );
  }
}
