import React from 'react';
import Browse from '../screens/Browse';
import Explore from '../screens/Explore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Product from '../screens/Product';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Forgot from '../screens/Fogot';
//
// const screens = createStackNavigator(
//   {
//     Browse,
//     Explore,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: theme.sizes.base * 4,
//         backgroundColor: theme.colors.white, // or 'white
//         borderBottomColor: 'transparent',
//       },
//       headerBackImage: <Image source={require('../assets/icons/back.png')} />,
//       headerBackTitle: null,
//       headerLeftContainerStyle: {
//         alignItems: 'center',
//         marginLeft: theme.sizes.base * 2,
//         paddingRight: theme.sizes.base,
//       },
//       headerRightContainerStyle: {
//         alignItems: 'center',
//         paddingRight: theme.sizes.base,
//       },
//     },
//   },
// );
//
// export default createAppContainer(screens);
const Stack = createNativeStackNavigator();
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
