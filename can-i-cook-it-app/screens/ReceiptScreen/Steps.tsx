import { Image } from "react-native";
import { Step } from "../../api/types";
import { Text, View } from "../../components/Themed";
import { receiptScreenStyles } from "./styles";

type Props = {
  steps: Step[];
};

export const Steps = ({ steps }: Props) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={receiptScreenStyles.stepsTitle}>Кроки</Text>
      {steps?.map((step) => {
        return (
          <View key={step.id}>
            <View style={receiptScreenStyles.stepNumberContainer}>
              <Text style={receiptScreenStyles.stepNumberText}>
                Крок {step.number}
              </Text>
            </View>
            <View style={receiptScreenStyles.stepContainer}>
              {step.image && (
                <View style={receiptScreenStyles.stepImageContainer}>
                  <Image
                    style={receiptScreenStyles.stepImage}
                    source={{ uri: step.image }}
                  />
                </View>
              )}
              <Text style={receiptScreenStyles.stepText}>
                {step.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
