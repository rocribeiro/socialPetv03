import React, { Component } from 'react';

import { View,Text,TouchableOpacity,Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:'Tirar Uma Foto',
    chooseFromLibraryButtonTitle:'Abrir Suas Fotos'
  };

export default class camera extends Component<Props> {
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
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });
}


  render() {
    return(
        <View>
            <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}} onPress={this.myfun}>
                <Text style={{color:'#fff'}}>Selecionar Foto do Pet</Text>
            </TouchableOpacity>
            <Image source={this.state.avatarSource} style={{width:50,height:50,margin:10}}/>
        </View>
    );
  }
}
