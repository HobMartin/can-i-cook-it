import { useMemo, useState } from "react";
import { Text, View } from "../Themed";
import { Modal, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import DateTimePicker from "@react-native-community/datetimepicker";
import { durationToDate, getDuration, getTimeToCook } from "./utils";

type Props = {
  value: number;
  onChange: (value: number) => void;
  style?: any;
};
export const TimeToCook = ({ value, style, onChange }: Props) => {
  const [selectedValue, setSelectedValue] = useState<number>(value);
  const [modalVisible, setModalVisible] = useState(false);
  const label = useMemo(() => {
    const date = durationToDate(value);
    return getTimeToCook(
      getDuration(date.getHours(), date.getMinutes())
    ).text.trim();
  }, [value]);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Час приготування
        </Text>
        <Pressable
          style={{
            backgroundColor: "#efeded",
            borderRadius: 10,
            padding: 10,
            alignSelf: "flex-start",
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#000",
            }}
          >
            {label || "Виберіть час"}
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
                Виберіть час приготування
              </Text>
              <DateTimePicker
                mode="countdown"
                value={durationToDate(selectedValue)}
                onChange={(_, date) => {
                  if (date) {
                    const duration = getDuration(
                      date.getHours(),
                      date.getMinutes()
                    );
                    setSelectedValue(duration);
                  }
                }}
                display="spinner"
              />
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
