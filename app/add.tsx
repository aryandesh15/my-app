// app/add.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>+ New Item (coming soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, fontWeight: "600" },
});
