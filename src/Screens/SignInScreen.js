import * as React from 'react';
import {TextInput, Button, Snackbar, Headline} from 'react-native-paper';
import {AuthContext} from '../../App';
import AsyncStorage from '@react-native-community/async-storage';
import {View, StyleSheet} from 'react-native';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const {signIn} = React.useContext(AuthContext);

  const validate = async () => {
    let allUsers = await AsyncStorage.getItem('ALL_USERS');
    if (allUsers) {
      allUsers = JSON.parse(allUsers);
      const user = allUsers.find(res => res.user.username === username);
      if (user) {
        if (user.user.password === password) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          signIn(user);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  };

  return (
    <View style={styles.content}>
      <Headline>FeedGLLFL Sign-in</Headline>
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
        Sign In
      </Button>
      <Button
        style={styles.items}
        onPress={() => navigation.navigate('SignUp')}
        mode="text">
        Sign Up here!
      </Button>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Invalid credentials. Please check and try again.
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

export default SignInScreen;
