import { Ingredient } from "../../api/types";
import {
  Text,
  View,
  SafeAreaView,
  useThemeColor,
  Button,
} from "../../components/Themed";
import { receiptScreenStyles } from "./styles";

type Props = {
  ingredients: Ingredient[];
};

export const Ingredients = ({ ingredients }: Props) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={receiptScreenStyles.ingredientTitle}>Інгредієнти</Text>
      {ingredients?.map((ingredient) => {
        return (
          <View key={ingredient.id}>
            <Text style={receiptScreenStyles.ingredientText}>
              {ingredient.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
