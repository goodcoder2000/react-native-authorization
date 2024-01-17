import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ClearData } from "../../storage/storage";

const Home = () => {
  const { dispatch } = useContext(AuthContext);
  const CallOut = () => {
    dispatch({ type: "logout" });
    ClearData();
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="Out" onPress={CallOut} />
    </View>
  );
};

export default Home;
