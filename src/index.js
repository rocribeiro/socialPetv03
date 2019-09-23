import Map from './components/home/map';
import CadastroAchei from './components/cadastro/cadastroAchei';
import Cadastro from './components/cadastro/cadastroComponent';
import Login from './components/login/login';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const Routes = createAppContainer(
    createStackNavigator({
        Login:Login,
        Map: Map,
        Cadastro: Cadastro,
        CadastroAchei:CadastroAchei
    })
);

export default Routes;
