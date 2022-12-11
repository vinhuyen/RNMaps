// import React, { Component } from "react";
// import {
//   ActivityIndicator,
//   Keyboard,
//   KeyboardAvoidingView,
//   StyleSheet
// } from "react-native";
//
// import { Button, Block, Input, Text } from "../components";
// import { theme } from "../constants";
//
// const VALID_EMAIL = "contact@react-ui-kit.com";
// const VALID_PASSWORD = "subscribe";
//
// export default class Login extends Component {
//   state = {
//     email: VALID_EMAIL,
//     password: VALID_PASSWORD,
//     errors: [],
//     loading: false
//   };
//
//   handleLogin() {
//     const { navigation } = this.props;
//     const { email, password } = this.state;
//     const errors = [];
//
//     Keyboard.dismiss();
//     this.setState({ loading: true });
//
//     // check with backend API or with some static data
//     if (email !== VALID_EMAIL) {
//       errors.push("email");
//     }
//     if (password !== VALID_PASSWORD) {
//       errors.push("password");
//     }
//
//     this.setState({ errors, loading: false });
//
//     if (!errors.length) {
//       navigation.navigate("Browse");
//     }
//   }
//
//   render() {
//     const { navigation } = this.props;
//     const { loading, errors } = this.state;
//     const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
//
//     return (
//       <KeyboardAvoidingView style={styles.login} behavior="padding">
//         <Block padding={[0, theme.sizes.base * 2]}>
//           <Text h1 bold>
//             Login
//           </Text>
//           <Block middle>
//             <Input
//               label="Email"
//               error={hasErrors("email")}
//               style={[styles.input, hasErrors("email")]}
//               defaultValue={this.state.email}
//               onChangeText={text => this.setState({ email: text })}
//             />
//             <Input
//               secure
//               label="Password"
//               error={hasErrors("password")}
//               style={[styles.input, hasErrors("password")]}
//               defaultValue={this.state.password}
//               onChangeText={text => this.setState({ password: text })}
//             />
//             <Button gradient onPress={() => this.handleLogin()}>
//               {loading ? (
//                 <ActivityIndicator size="small" color="white" />
//               ) : (
//                 <Text bold white center>
//                   Login
//                 </Text>
//               )}
//             </Button>
//
//             <Button onPress={() => navigation.navigate("Forgot")}>
//               <Text
//                 gray
//                 caption
//                 center
//                 style={{ textDecorationLine: "underline" }}
//               >
//                 Forgot your password?
//               </Text>
//             </Button>
//           </Block>
//         </Block>
//       </KeyboardAvoidingView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   login: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   input: {
//     borderRadius: 0,
//     borderWidth: 0,
//     borderBottomColor: theme.colors.gray2,
//     borderBottomWidth: StyleSheet.hairlineWidth
//   },
//   hasErrors: {
//     borderBottomColor: theme.colors.accent
//   }
// });
//-------------------
// import React, {Component} from 'react';
// import {Block, Input} from '../components';
// import {Button, Modal, StyleSheet, Text} from 'react-native';
// import axios from 'axios';
// import {categories} from '../constants/mocks';
//
// export default class Settings extends Component {
//   state = {
//     showModal: false,
//     category: {
//       name: '',
//       tags: [],
//       count: 0,
//       id: '',
//     },
//   };
//   componentDidMount() {
//     axios
//       .get('https://6392a026b750c8d178e1ef17.mockapi.io/categories')
//       .then(res => {
//         const categories = res.data;
//         this.setState({categories: this.props.categories});
//       });
//   }
//
//   render() {
//     return (
//       <Block>
//         <Block>
//           <Block>
//             <Input label="Name" value={this.state.category?.name} />
//             <Input label="Tags" value={this.state.category?.tags} />
//             <Input label="Count" value={this.state.category?.count} />
//             {/*<Input label="Image" />*/}
//             <Input label="ID" value={this.state.category?.id} />
//           </Block>
//           <Block>
//             <Button title="Add" style={styles.button} />
//           </Block>
//         </Block>
//         <Block>
//           {categories.map((category, index)=> (
//             <Block key={index} style={styles.list}>
//               <Text>{category.name}</Text>
//               <Text>{category.id}</Text>
//               <Button title="Edit" />
//               <Button title="Delete" />
//             </Block>
//           ))}
//           <Modal />
//         </Block>
//       </Block>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: 'pink',
//     width: 50,
//     height: 50,
//   },
//   list: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });
