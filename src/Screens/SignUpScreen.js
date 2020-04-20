import * as React from 'react';
import {TextInput, Button, Snackbar, Headline} from 'react-native-paper';
import {AuthContext} from '../../App';
import AsyncStorage from '@react-native-community/async-storage';
import {View, StyleSheet} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const {signUp} = React.useContext(AuthContext);

  const validate = async () => {
    if (username.trim().length > 0 && password.trim().length > 0) {
      // let allUsers = await AsyncStorage.getItem('ALL_USERS');
      // console.log(allUsers);
      // if (allUsers) {
      //   allUsers = JSON.parse(allUsers);
      //   const user = allUsers.find(res => res.user.username === username);
      //   if (user) {
      //     setVisible(true);
      //   } else {
      //     let newUser = {
      //       user: {
      //         username: username,
      //         password: password,
      //       },
      //     };
      //     allUsers.push(newUser);
      //     const allUser = ['ALL_USERS', JSON.stringify(allUsers)];
      //     const newOne = ['user', JSON.stringify(newUser)];
      //     await AsyncStorage.multiSet([allUser, newOne]);
      //     signUp(newUser);
      //   }
      // } else {
      //   let newUser = {
      //     user: {
      //       username: username,
      //       password: password,
      //     },
      //   };
      //   let newList = [];
      //   newList.push(newUser);
      //   const allUser = ['ALL_USERS', JSON.stringify(newList)];
      //   const newOne = ['user', JSON.stringify(newUser)];
      //   await AsyncStorage.multiSet([allUser, newOne]);
      //   signUp(newUser);
      // }
    }
  };

  return (
    <View style={styles.content}>
      <Headline>FeedGLLFL Sign-up</Headline>
      <TextInput
        style={styles.items}
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.items}
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.items} onPress={validate} mode="contained">
        Sign Up
      </Button>
      <Button
        style={styles.items}
        onPress={() => navigation.goBack()}
        mode="text">
        Close
      </Button>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        User already present. Please try logging in!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  items: {
    marginTop: 16,
  },
});

export default SignUpScreen;
