import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/NoAuth/Login";
import Home from "./screen/Auth/Home";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { GetUserData } from "./storage/storage";
import * as SplashScreen from "expo-splash-screen";
const Stack = createStackNavigator();
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const NoAuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const RootContainer = () => {
  const AuthData = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const UserData = async () => {
    const result = await GetUserData();
    console.log(result, "d");
    if (result) {
      dispatch({ type: "login", data: { ...result } });
    }
    setAppIsReady(true);
  };
  useEffect(() => {
    UserData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        {!AuthData.email && <NoAuthScreen />}
        {AuthData.email && <AuthScreen />}
      </View>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootContainer />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
