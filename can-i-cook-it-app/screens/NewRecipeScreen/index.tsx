import { Text, TextInput, View } from "../../components/Themed";
import { Pressable, ScrollView } from "react-native";
import { newReceiptScreenStyles } from "./styles";
import { DynamicInputs } from "../../components/DynamicInputs";
import { useState } from "react";
import { StepsInput } from "../../components/StepsInput";
import { DifficultPicker } from "../../components/DifficultPicker";
import { TimeToCook } from "../../components/TimeToCook";
import dayjs from "dayjs";
import { NewRecipe, NewRecipeErrors, RecipeFields } from "./types";
import { getInvalidFields, isValid, parseProperty } from "./helper";
import { ReceiptImage } from "../../components/ReceiptImage";
import { ERRORS_MESSAGES } from "./constants";
import { fxAddNewReceipt } from "./model";
import { router } from "expo-router";

const PLACEHOLDERS = ["Вкажіть інградієнт..", "Вкажіть кількість.."];

const initialErrors: NewRecipeErrors = {
  name: "",
  receiptImage: "",
  ingredients: "",
  steps: "",
  difficult: "",
  timeToCook: "",
};

const initialData: NewRecipe = {
  name: "",
  receiptImage: null,
  difficult: "diff",
  timeToCook: 0,
  ingredients: [
    {
      name: "",
    },
  ],
  steps: [
    {
      description: "",
      image: null,
    },
  ],
};
export default function NewReceiptScreen() {
  const [data, setData] = useState<NewRecipe>(initialData);
  const [errors, setErrors] = useState<NewRecipeErrors>(initialErrors);
  console.log(errors);

  const handleSave = async () => {
    // check data
    console.log(data);

    const invalidFields = getInvalidFields(data); //["steps[0].description", "receiptImage"]
    if (invalidFields.length) {
      const newErrors = { ...initialErrors };
      // "steps[0].description" -> "steps"
      const parsedFields = invalidFields.map<RecipeFields>((field) => {
        return (parseProperty(field) ?? field) as RecipeFields;
      });
      parsedFields.forEach((field) => {
        newErrors[field] = ERRORS_MESSAGES[field];
      });
      setErrors(newErrors);
      return;
    }
    // save data
    await fxAddNewReceipt({ data });

    router.replace({
      pathname: "/receipt",
      params: {
        activeTab: "2",
      },
    });
  };

  return (
    <ScrollView style={newReceiptScreenStyles.scrollContainer}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Назва
        </Text>
        <TextInput
          style={newReceiptScreenStyles.input}
          placeholder="Введіть назву..."
          value={data.name}
          onChangeText={(value) => {
            setData((prev) => ({ ...prev, name: value }));
          }}
        />
      </View>
      <ReceiptImage
        image={data.receiptImage}
        onChange={(value) =>
          setData((prev) => ({
            ...prev,
            receiptImage: value,
          }))
        }
      />
      <DifficultPicker
        value={data.difficult}
        onChange={(value) => {
          setData((prev) => ({ ...prev, difficult: value }));
        }}
      />
      <TimeToCook
        value={data.timeToCook}
        onChange={(value) => {
          setData((prev) => ({ ...prev, timeToCook: value }));
        }}
      />
      <View>
        <Text style={newReceiptScreenStyles.title}>Інградієнти</Text>
        <DynamicInputs
          ingredients={data.ingredients}
          onChange={(value) => {
            setData((prev) => ({ ...prev, ingredients: value }));
          }}
          inputStyle={newReceiptScreenStyles.input}
          placeholder={PLACEHOLDERS[0]}
        />
      </View>

      <View>
        <Text style={newReceiptScreenStyles.title}>Кроки</Text>
        <StepsInput
          steps={data.steps}
          onChange={(value) => {
            setData((prev) => ({ ...prev, steps: value }));
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#df4759",
            padding: 20,
            borderRadius: 10,
            width: "50%",
            alignItems: "center",
          }}
          onPress={handleSave}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Зберегти
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
