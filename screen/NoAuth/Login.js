import { View, Text, TextInput, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { StoreUserData } from "../../storage/storage";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const data = { email: "mgmg" };
  const MakeLogin = () => {
    console.log("login");
    StoreUserData(data);
    dispatch({ type: "login", data });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 2, padding: 10 }} />
      <TextInput
        placeholder="Password"
        style={{ borderWidth: 2, padding: 10, marginVertical: 10 }}
      />
      <Button title="Login" onPress={MakeLogin} />
    </View>
  );
};

export default Login;
