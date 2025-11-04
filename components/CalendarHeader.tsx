import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CalendarHeader({
  date, setDate,
}: { date: Date; setDate: (d: Date) => void }) {
  const pretty = useMemo(() => {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    return { day, month };
  }, [date]);

  const shift = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    setDate(next);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => shift(-1)} style={styles.arrow}>
        <Text style={styles.arrowText}>‹</Text>
      </Pressable>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.today}>Today</Text>
        <Text style={styles.day}>{pretty.day}</Text>
        <Text style={styles.month}>{pretty.month}</Text>
      </View>

      <Pressable onPress={() => shift(1)} style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 8 },
  today: { color: "#9a9a9a", fontSize: 12, marginTop: 4 },
  day: { fontSize: 20, fontWeight: "700" },
  month: { color: "#9a9a9a", fontSize: 12 },
  arrow: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  arrowText: { fontSize: 24, color: "#333" },
});
