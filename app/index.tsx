import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CalendarHeader from "../components/CalendarHeader";

const taupe = "#7E6F6F";

function Tile({
  label, onPress, disabled = true,
}: { label: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed, hovered }) => [
        styles.tile,
        (pressed || hovered) && { backgroundColor: "#6c6060" },
        disabled && { cursor: "default" as any },
      ]}
    >
      <Text style={styles.tileText}>{label}</Text>
    </Pressable>
  );
}

export default function ExploreScreen() {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>EXPLORE</Text>
      <CalendarHeader date={date} setDate={setDate} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          <Tile label="TIPS FOR TOMORROW" />
          <Tile label="GUIDED MEDITATIONS" />
          <Tile
            label="MENTAL PREP CHECKLIST"
            disabled={false}
            onPress={() => router.push("/mental")}
          />
          <Tile label="RELAXATION TECHNIQUES" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: { color: "#9a9a9a", fontSize: 16, fontWeight: "600", marginTop: 12, marginLeft: 12 },
  scrollContent: { paddingHorizontal: 12, paddingBottom: 24 },
  grid: { gap: 12, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  tile: {
    backgroundColor: taupe, borderRadius: 16, width: "48%", aspectRatio: 1,
    alignItems: "center", justifyContent: "center", padding: 10,
  },
  tileText: { color: "white", textAlign: "center", fontWeight: "700", letterSpacing: 0.5 },
});
