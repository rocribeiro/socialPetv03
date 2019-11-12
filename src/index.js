import Map from './components/home/map';
import cadastroPetAchado from './components/cadastro/cadastroPetAchado';
import Cadastro from './components/cadastro/cadastroComponent';
import Login from './components/login/login';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const Routes = createAppContainer(
    createStackNavigator({
        //Login:Login,
        Map: Map,
        Cadastro: Cadastro,
        cadastroPetAchado:cadastroPetAchado
    })
);

export default Routes;
