import { Picker } from "@react-native-picker/picker";
import { Text, View } from "../Themed";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

type Props = {
  onChange: (value: Values) => void;
  value: Values;
  style?: any;
};

export type Values = "diff" | "medium" | "hard";

const values = {
  diff: "Легко",
  medium: "Середньо",
  hard: "Складно",
};

export const DifficultPicker = ({ onChange, value, style }: Props) => {
  const [selectedValue, setSelectedValue] = useState<Values>(value);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View
        style={[
          {
            marginBottom: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          style,
        ]}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Складність</Text>
        <Pressable
          style={{
            backgroundColor: "#efeded",
            borderRadius: 10,
            padding: 10,
            alignSelf: "flex-start",
          }}
          onPress={() => {
            setModalVisible(true);
            console.log("pressed");
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#000",
            }}
          >
            {values[value]}
          </Text>
        </Pressable>
        <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <BlurView
            intensity={20}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                width: "80%",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                borderWidth: 1,
                borderColor: "#d3d3d3",
                shadowOpacity: 0.25,
                shadowRadius: 30,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  padding: 20,
                  paddingBottom: 0,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Виберіть складність
              </Text>
              <Picker
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  padding: 20,
                  height: 200,
                  fontSize: 10,
                  borderRadius: 20,
                }}
                selectedValue={selectedValue}
                itemStyle={{ fontSize: 20, height: 150 }}
                onValueChange={(itemValue) => {
                  setSelectedValue(itemValue);
                }}
              >
                <Picker.Item label="Легко" value="diff" />
                <Picker.Item label="Середньо" value="medium" />
                <Picker.Item label="Складно" value="hard" />
              </Picker>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  borderBottomLeftRadius: 20,
                  borderBottomEndRadius: 20,
                }}
              >
                <Pressable
                  style={{
                    padding: 10,
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderColor: "#d3d3d3",
                    flexGrow: 1,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Скасувати
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    padding: 10,
                    borderTopWidth: 1,
                    borderColor: "#d3d3d3",
                    flexGrow: 1,
                  }}
                  onPress={() => {
                    setModalVisible(false);
                    onChange(selectedValue);
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Підтвердити
                  </Text>
                </Pressable>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </View>
  );
};
