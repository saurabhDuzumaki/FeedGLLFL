import * as React from 'react';
import {TextInput, Button, Snackbar, Headline} from 'react-native-paper';
import {AuthContext} from '../../App';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {signup} from '../Store/actions/authActions';

const SignUpScreen = ({
  navigation,
  loading,
  isSuccess,
  isError,
  user,
  signupValidation,
}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const {signUp} = React.useContext(AuthContext);

  const validate = () => {
    if (username.trim().length > 0 && password.length > 0) {
      signupValidation(username, password);
    }
  };

  if (isSuccess) {
    signUp(user);
  }

  React.useEffect(() => {
    setVisible(isError);
  }, [isError]);

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
      <Button
        style={styles.items}
        loading={loading}
        onPress={validate}
        mode="contained">
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

const mapStateToProps = (state, ownProps) => ({
  loading: state.auth.isSignupLoading,
  isSuccess: state.auth.isSignupSuccess,
  isError: state.auth.isSignupError,
  user: state.auth.user,
});

const actionCreators = {
  signupValidation: signup,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(SignUpScreen);
