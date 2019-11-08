import {AppRegistry} from 'react-native';
import Routes from "./src";
import {name as appName} from './app.json';

if (__DEV__) {
    require('react-devtools');
  }
AppRegistry.registerComponent(appName, () => Routes);
