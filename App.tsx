/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import HomeScreen from './screens/home';
import ProductDetailScreen from './screens/detailscreen';
import { Text } from 'react-native';
import NotFoundScreen from './screens/notFoundScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';

type ProductDetailScreenProps = {
  route: {
    params: {
      productId: number;
    };
  };
};

type RootStackParamList = {
  Home: undefined;
  ProductDetail: ProductDetailScreenProps;
  NotFound: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {


  const HandleDeepLink = () => {
    const {navigate} = useNavigation()

    const handleLink = async (link: any) => {            
      let productId = link.url.split('=').pop()
      navigate('ProductDetail', { productId: productId })
    }

    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleLink);          // Foreground events

      dynamicLinks().getInitialLink().then((link) => {              // Background events / Quit event
        if (link) {
          handleLink(link)
        }
      });
                                                                 // App start events
      return () => unsubscribe();

    }, []);

    return null;
  }

  return (
    <NavigationContainer>
      <HandleDeepLink />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product Detail' }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Not Found' }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default App;