import React from "react";
import { Button } from "react-native";

export const BackButton = ({ navigation }) => (
  <Button title="Back" onPress={() => navigation.goBack()} color="black" />
);

export const DoneButton = ({ onPress }) => (
  <Button title="Done" onPress={onPress} color="black" />
);
