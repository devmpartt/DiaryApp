import { createStackNavigator } from 'react-navigation-stack';
import Loading from '../screens/Loading';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';

const AuthNav = createStackNavigator(
    {
    Home: {screen: Loading},
    LogIn: {screen: LogIn},
    SignUp: {screen: SignUp},
    },
    {
        headerShown: 'none',
        defaultNavigationOptions: {
            header: null,
            gesturesEnabled: true,
            
        },
    }
)

export default AuthNav;