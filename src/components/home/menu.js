import React, { Component } from "react";
import { Modal, Text, View, ImageBackground, Image, BackHandler, TouchableOpacity,SafeAreaView,ScrollView } from "react-native";
import { Left, Right, Icon, Button } from 'native-base';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const emailDono = navigation.getParam('emailDono', 'some default value');
        this.state={
            pets: []
        };
    }
    componentDidMount() {
        axios.get('http://18.188.48.213:8080/pet/meusPets/'+emailDono)
        .then(response => this.setState({ pets: response.data }));
    }
    petEncontrado(id){
        axios.get('http://18.188.48.213:8080/pet/'+id);
    }

    render() {
            return (
            <View>
                <View>
                {this.state.pets.map(pet => (
                        <Text key={pet.id}>{pet.nome}</Text>
                        
                  ))};
                </View>
                <View>
                   {this.state.pets.map(pet => (
                        <Button 
                        title="Achei Meu Pet"
                        key={pet.id}
                        onPress={() => {
                            this.petEncontrado(pet.id);
                        }}
                    />     
                    ))};
                  </View>
            </View>
            );
    }
}

