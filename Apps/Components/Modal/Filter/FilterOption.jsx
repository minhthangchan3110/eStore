import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FilterOptions = ({ title, options, onSelectOption }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectOption = (option) => {
    const isSelected = selectedOptions[option];
    setSelectedOptions({
      ...selectedOptions,
      [option]: !isSelected,
    });
    onSelectOption(option); // Gọi hàm onSelectOption để thông báo option đã được chọn
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.optionsContainer}>
          {Object.keys(options).map((key) => (
            <View key={key} style={styles.optionRow}>
              {options[key].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOptions[option] && styles.selectedOption,
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions[option] && styles.selectedOptionText,
                    ]}
                  >
                    {option.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
  title: {
    color: "white",
    fontSize: 18,
    paddingVertical: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
  },
  optionText: {
    color: "white",
  },
  selectedOption: {
    borderColor: "red",
  },
  selectedOptionText: {
    color: "red",
  },
});

export default FilterOptions;
