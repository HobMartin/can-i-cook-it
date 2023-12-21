import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const STAR_COUNT = 5;
const STAR_SIZE = 32;

type Props = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

export function Rating({ onRatingChange, rating }: Props) {
  const handleRatingChange = (rating: number) => {
    onRatingChange(rating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Вам сподобався рецепт?</Text>
      <View style={styles.stars}>
        {Array.from({ length: STAR_COUNT }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRatingChange(index + 1)}
          >
            <MaterialIcons
              name={rating >= index + 1 ? "star" : "star-border"}
              size={STAR_SIZE}
              style={
                rating >= index + 1
                  ? styles.starSelected
                  : styles.starUnselected
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
});
