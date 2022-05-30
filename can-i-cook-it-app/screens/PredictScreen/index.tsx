import { Text, SafeAreaView } from "../../components/Themed";
import React from "react";
import { predictScreenStyles } from "./styles";

export default function PredictScreen({ navigation }: any) {
  return (
    <SafeAreaView style={predictScreenStyles.container}>
      <Text>PredictScreen</Text>
    </SafeAreaView>
  );
}
