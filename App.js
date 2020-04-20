/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Root from './src/Navigation/HomeNavigator';
import SignInScreen from './src/Screens/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import SplashScreen from './src/Screens/SplashScreen';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const Stack = createStackNavigator();

export const AuthContext = React.createContext();

const App = ({navigation}) => {
  // AsyncStorage.clear();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE':
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RESTORE', user: JSON.parse(user)});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', user: data.user});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // console.log('HERE', data);

        dispatch({type: 'SIGN_IN', user: data.user});
      },
    }),
    [],
  );

  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={DefaultTheme.colors.primary}
          />
          {state.isLoading ? (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
          ) : state.user == null ? (
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  // pop animation for logout
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Sign up',
                }}
              />
            </Stack.Navigator>
          ) : (
            <Root />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
