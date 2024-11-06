import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "@/screeens/SplashScreen";
import Onboarding from "@/screeens/Onboarding";
import Login from "@/screeens/Login";
import Signup from "@/screeens/Signup";
import Homepage from "@/screeens/Homepage";
import MyAccount from "@/screeens/MyAccount";
import MyCart from "@/screeens/MyCart";
import { Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/hooks/context/AuthContext";
import { CartProvider } from "@/hooks/context/CartContext";
import { client } from "@/hooks/lib/apollo";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Homepage: undefined;
  Onboarding: undefined;
  Signup: undefined;
  Home: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") iconName = "home";
        else if (route.name === "My Cart") iconName = "shopping-cart";
        else if (route.name === "My Account") iconName = "user";

        return (
          <Feather
            name={iconName}
            size={24}
            color={focused ? "#006D5B" : "gray"}
          />
        );
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "700",
      },
      tabBarStyle: {
        height: Platform.OS === "ios" ? 89 : 55,
      },
      tabBarActiveTintColor: "#006D5B",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Homepage} />
    <Tab.Screen name="My Cart" component={MyCart} />
    <Tab.Screen name="My Account" component={MyAccount} />
  </Tab.Navigator>
);

export default function HomeScreen() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Homepage" component={TabNavigator} />
          </Stack.Navigator>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({});
