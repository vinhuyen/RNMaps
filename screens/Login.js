import React, {Component} from 'react';
import {Block, Text, Input, Button} from '../components';
import {theme} from '../constants';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

const VALID_EMAIL = 'uyenxinh@gmail.com';
const VALID_PASSWORD = 'subscribe';

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
  };

  handleLogin() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({loading: true});

    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({errors, loading: false});

    if (!errors.length) {
      navigation.navigate('Browse');
    }
  }
  render() {
    const {navigation} = this.props;
    const {loading, errors} = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              secureTextEntry
              onChangeText={text => this.setState({password: text})}
            />
            <Button onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text bold center>
                  Login
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text
                gray
                caption
                center
                style={{textDecorationLine: 'underline'}}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
