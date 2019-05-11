import Map from './components/home/map';
import Cadastro from './components/cadastro/cadastroComponent'

import { createAppContainer, createStackNavigator } from 'react-navigation';

const Routes = createAppContainer(
  createStackNavigator({
    Home: Map,
    Cadastro: Cadastro,
  })
);

export default Routes;