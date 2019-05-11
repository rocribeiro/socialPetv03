import React, { Component } from 'react';

import { View,TextInput, Button} from 'react-native';
import Photo from '../camera/selecaoFotos'

// import { Container } from './styles';

export default class cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:'Cão',
      tipo:'Cachorro',
      raca:'Fura Saco',
      perdido:'Sim',
      descricao:'imsdiemdim23idm43idmi4mid4m',
      foto:'',
      dono:'1'
    };
  }
    render() {
        return(
            <View>
              <TextInput
                  value={this.state.nome}
                  onChangeText={nome => this.setState({nome})}
                  placeholder="Nome"
                />
                <TextInput
                  value={this.state.tipo}
                  onChangeText={tipo => this.setState({tipo})}
                  placeholder="Tipo de Pet"
                />
                <TextInput
                  value={this.state.raca}
                  onChangeText={raca => this.setState({raca})}
                  placeholder="Raça"
                />
                <TextInput
                  value={this.state.perdido}
                  onChangeText={perdido => this.setState({perdido})}
                  placeholder="Perdido?"
                />
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  value={this.state.descricao}
                  onChangeText={descricao => this.setState({descricao})}
                  placeholder="Descrição"/>
                <Photo/>
                <Button onPress={this.myfun} title="Cadastrar"/>
            </View>
        );
      }

      myfun=()=>{
        alert(Photo.prototype.state.avatarSource);
        fetch('http://192.168.15.13:8080/pet/addPet', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: this.state.nome,
            tipo:this.state.tipo,
            raca:this.state.raca,
            perdido:this.state.perdido,
            descricao:this.state.descricao,
            foto: Photo.props.state.avatarSource,
            dono:"1"
          }),
        });
      }
}



cadastro.navigationOptions = {
    title: 'Cadastro',
  }
  