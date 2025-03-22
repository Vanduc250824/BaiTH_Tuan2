import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import { BackButton, DoneButton } from "./Navbar/Navbar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "red" }, 
          headerTintColor: "black", 
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        }}
      >
       <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerRight: () => <DoneButton onPress={() => alert("Hoàn thành!")} />,
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={({ navigation }) => ({
            headerLeft: () => <BackButton navigation={navigation} />,
            headerRight: () => <DoneButton onPress={() => alert("Xác nhận!")} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}