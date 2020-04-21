import * as React from 'react';
import {TextInput, Button, Snackbar, Headline} from 'react-native-paper';
import {AuthContext} from '../../App';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchLogin} from '../Store/actions/authActions';

const SignInScreen = ({
  navigation,
  loading,
  isError,
  loginError,
  isSuccess,
  user,
  login,
}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const {signIn} = React.useContext(AuthContext);

  const validate = () => {
    if (username.trim().length > 0 && password.length > 0) {
      login(username, password);
    }
  };

  React.useEffect(() => {
    setVisible(isError);
  }, [isError]);

  React.useEffect(() => {
    console.log(isSuccess);

    if (isSuccess) {
      signIn(user);
    }
  }, [user, signIn, isSuccess]);

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
      <Button
        style={styles.items}
        loading={loading}
        onPress={validate}
        mode="contained">
        Sign In
      </Button>
      <Button
        style={styles.items}
        onPress={() => navigation.navigate('SignUp')}
        mode="text">
        Sign Up here!
      </Button>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        {loginError}
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

const mapStateToProps = (state, ownProps) => ({
  loading: state.auth.isLoginLoading,
  isError: state.auth.isLoginError,
  loginError: state.auth.loginError,
  isSuccess: state.auth.isLoginSuccess,
  user: state.auth.user,
});

const actionCreators = {
  login: fetchLogin,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(SignInScreen);
