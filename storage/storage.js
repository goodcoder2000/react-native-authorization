import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreUserData = async (data) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const GetUserData = async () => {
  try {
    const result = await AsyncStorage.getItem("user");
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};
export const ClearData = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
