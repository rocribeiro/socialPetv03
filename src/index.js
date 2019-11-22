import Map from './components/home/map';
import cadastroPetAchado from './components/cadastro/cadastroPetAchado';
import Cadastro from './components/cadastro/cadastroComponent';
import Login from './components/login/login';
import Menu from './components/home/menu';
import { createAppContainer, createStackNavigator,createDrawerNavigator } from 'react-navigation';

const Routes = createAppContainer(
    createStackNavigator({
        Login:Login,
        Map: Map,
        Cadastro: Cadastro,
        cadastroPetAchado:cadastroPetAchado,
        Menu: Menu
    })
);


export default Routes;
