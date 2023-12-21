import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Text, View } from "../Themed";
import { StyleProp, TextInput, TextStyle } from "react-native";
import _, { set } from "lodash";
import { Ionicons } from "@expo/vector-icons";

export type Ingredient = {
  name: string;
};

type Props = {
  ingredients: Ingredient[];
  onChange: (value: Ingredient[]) => void;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
};

const PLACEHOLDERS = "Вкажіть інградієнт та кількість..";

export const DynamicInputs = ({ inputStyle, ingredients, onChange }: Props) => {
  const [inputCount, setInputCount] = useState(1);

  const handleInputChange = (value: string, index: number) => {
    const newData = [...ingredients];
    newData[index] = { name: value };
    onChange(newData);
  };

  const handleAddInput = () => {
    setInputCount((prev) => prev + 1);
    onChange([...ingredients, { name: "" }]);
  };

  const handleRemoveInput = (index: number) => {
    setInputCount((prev) => prev - 1);

    const newData = [...ingredients];
    newData.splice(index, 1);
    onChange(newData);
  };

  const inputsToRender = useMemo(
    () => Array.from({ length: inputCount }, (_, index) => index),
    [inputCount]
  );

  return (
    <View
      style={{
        marginBottom: 40,
      }}
    >
      {inputsToRender.map((index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={PLACEHOLDERS}
            style={[
              {
                flex: 1,
                marginEnd: inputCount > 1 ? 20 : 0,
                backgroundColor: "#fff",
                width: "100%",
              },
              inputStyle,
            ]}
            focusable
            value={ingredients[index].name}
            onChangeText={(value) => handleInputChange(value, index)}
          />
          {inputCount > 1 && (
            <Button
              icon="trash"
              onPress={() => handleRemoveInput(index)}
              style={{
                padding: 5,
                marginBottom: 20,
                alignItems: "center",
                backgroundColor: "#df4759",
                justifyContent: "center",
                aspectRatio: 1,
                borderRadius: 10,
              }}
            />
          )}
        </View>
      ))}
      <Button
        style={{
          borderColor: "#000",
          borderWidth: 1,
          borderRadius: 10,
          borderStyle: "dashed",
          backgroundColor: "transparent",
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        textStyle={{ color: "#000" }}
        icon="add"
        iconColor="#000"
        text="Додати інградієнт"
        onPress={handleAddInput}
      >
        <Ionicons name="add" size={24} color="black" />
      </Button>
    </View>
  );
};
