import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNav from './src/navigation/AuthNav';
import AppNav from './src/navigation/AppNav';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNav,
    App: AppNav,
  },
  {
    headerShown: 'none',
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: true,
        
    },
}
);

const AppContainer = createAppContainer(SwitchNavigator);
AppRegistry.registerComponent(appName, () => App);
export default AppContainer
