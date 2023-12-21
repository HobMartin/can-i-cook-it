import { useEffect, useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { checkCameraPermission } from "../../screens/PredictScreen/helper";
import { SelectImageModal } from "../SelectImageModal";
import { Image } from "react-native";

export type Step = {
  description: string;
  image: StepImage | null;
};

type Props = {
  steps: Step[];
  onChange: (value: Step[]) => void;
};

export type StepImage = {
  uri: string;
  base64: string;
};

export const StepsInput = ({ steps, onChange }: Props) => {
  const [stepsCount, setStepsCount] = useState(steps?.length || 1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (value: string, index: number) => {
    const newData = [...steps];
    newData[index] = { ...newData[index], description: value };
    onChange(newData);
  };

  const handleAddInput = () => {
    setStepsCount((prev) => prev + 1);

    onChange([...steps, { description: "", image: null }]);
  };

  const handleRemoveInput = (index: number) => {
    setStepsCount((prev) => prev - 1);

    const newData = [...steps];
    newData.splice(index, 1);

    onChange(newData);
  };

  const handleAddImage = (
    image: { uri: string; base64: string },
    index: number
  ) => {
    const newData = [...steps];
    newData[index] = { ...newData[index], image };

    onChange(newData);
  };

  const handleRemoveImage = (index: number) => {
    const newData = [...steps];
    newData[index] = { ...newData[index], image: null };

    onChange(newData);
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const inputsToRender = useMemo(
    () => Array.from({ length: stepsCount }, (_, index) => index),
    [stepsCount]
  );

  return (
    <View
      style={{
        marginBottom: 40,
      }}
    >
      {inputsToRender.map((index) => (
        <View key={index} style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginBottom: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Крок {index + 1}
            </Text>
            {stepsCount > 1 && (
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
          <TextInput
            placeholder="Вкажіть опис кроку..."
            multiline
            editable
            numberOfLines={4}
            value={steps[index].description}
            style={{
              marginBottom: 20,
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              paddingTop: 10,
              height: 100,
              backgroundColor: "#fff",
              fontSize: 16,
            }}
            onChangeText={(value) => handleInputChange(value, index)}
          />
          {steps[index]?.image?.uri && (
            <View>
              <Text style={{ marginBottom: 10 }}>Фото кроку</Text>
              <View
                style={{
                  position: "relative",
                  height: 200,
                  width: "100%",
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: steps[index].image?.uri }}
                  style={{
                    width: "100%",
                    height: "100%",
                    marginBottom: 20,
                    borderRadius: 10,
                  }}
                />
                <Button
                  icon="close"
                  onPress={() => {
                    handleRemoveImage(index);
                  }}
                  style={{
                    height: 30,
                    alignItems: "center",
                    backgroundColor: "#df4759",
                    justifyContent: "center",
                    aspectRatio: 1,
                    borderRadius: 100,
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                />
              </View>
            </View>
          )}
          {!steps[index]?.image?.uri && (
            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Бажаєте додати фото?</Text>
              <Button
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderStyle: "dashed",
                  backgroundColor: "transparent",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                textStyle={{ color: "#000" }}
                icon="image"
                iconColor="#000"
                text="Додати фото"
                onPress={() => setModalVisible(true)}
              />
              <SelectImageModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onImageSelect={(uri, base64) => {
                  handleAddImage({ uri, base64 }, index);
                }}
              />
            </View>
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
        text="Додати крок"
        onPress={() => handleAddInput()}
      >
        <Ionicons name="add" size={24} color="black" />
      </Button>
    </View>
  );
};
