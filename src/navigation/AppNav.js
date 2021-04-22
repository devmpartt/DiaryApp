import {createStackNavigator} from 'react-navigation-stack';
import TextList from '../screens/TextList';
import ImageList from '../screens/ImageList';
import TextContent from '../screens/TextContent';
import ImageContent from '../screens/ImageContent'
import AddText from '../screens/AddText';
import AddImage from '../screens/AddImage';

const AppNavigation = createStackNavigator(
    {
        Home: {screen: TextList},
        ImageList: {screen: ImageList},
        TextContent: {screen: TextContent},
        ImageContent: {screen: ImageContent},
        AddText:{screen: AddText},
        AddImage:{screen: AddImage}
    },
    {
        headerShown: 'none',
        defaultNavigationOptions: {
            header: null,
            gesturesEnabled: true,
            
        },
    }
  )
  export default AppNavigation