import React, { Component } from "react";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {View} from 'react-native';

export default class endereco extends Component{
    render(){
      const {localizacao} = this.props
        return <GooglePlacesAutocomplete
            placeholder="Endereço que seu pet se perdeu"
            placeholderTextColor="#333"
            onPress={localizacao}
            query={{
                key:'AIzaSyC7eAcQS191Ov4R1a6R4MEC367Eu3jQw_4',
                language:'pt'
            }}
            textInputProps={{
                autoCapitalize:'none',
                autoCorrect:false
            }}
            fetchDetails
            enablePoweredByContainer={false}

            styles={{
                container: {
                  position:"absolute",
                  top:40,
                  width: "100%"
                },
                textInputContainer: {
                  backgroundColor: "transparent",
                  height: 54,
                  marginHorizontal: 20,
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                textInput: {
                  height: 54,
                  margin: 0,
                  borderRadius: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { x: 0, y: 0 },
                  shadowRadius: 15,
                  borderWidth: 1,
                  borderColor: "#DDD",
                  fontSize: 18
                },
                listView: {
                  borderWidth: 1,
                  borderColor: "#DDD",
                  backgroundColor: "#FFF",
                  marginHorizontal: 20,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { x: 0, y: 0 },
                  shadowRadius: 15,
                  marginTop: 10
                },
                description: {
                  fontSize: 16
                },
                row: {
                  padding: 20,
                  height: 58
                }
              }}
        />
    }
}