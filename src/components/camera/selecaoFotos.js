import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { View,Button,Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';



const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:'Tirar Uma Foto',
    chooseFromLibraryButtonTitle:'Abrir Suas Fotos'
  };

  

export default class camera extends Component {
    constructor(props){
        super(props)
        this.state={
            avatarSource:null
        }
    }
myfun=()=>{
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }else {
          const source = { uri: response.data };
          console.log(source);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });
}
componentDidMount(){
  storeData = async () => {
    try {
      await AsyncStorage.setItem('base64', this.state.avatarSource)
    } catch (e) {
      // saving error
    }
  }
}


  render() {
    return(
        <View>
          <View style={{marginTop:10,padding:5,width: 320}}>
            <Button
              title="Selecionar Foto do Pet"
              onPress={this.myfun}    
            />
          </View>
            <Image source={this.state.avatarSource} style={{width:50,height:50,margin:10}}/>
        </View>
    );
  }
}
