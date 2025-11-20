import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarHeader from "../components/CalendarHeader";
import useDateStore from "../store/useDateStore";

export default function CalendarScreen() {
  const date = useDateStore((s) => s.date);
  const setDate = useDateStore((s) => s.setDate);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const selectedKey = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${pad(
    today.getMonth() + 1
  )}-${pad(today.getDate())}`;

  // Build marked dates: selected day + today's outline
  const marked: any = {};

  if (selectedKey) {
    marked[selectedKey] = {
      selected: true,
      selectedColor: "#3B2F2F",
      selectedTextColor: "#fff",
    };
  }

  if (todayKey && todayKey !== selectedKey) {
    marked[todayKey] = {
      customStyles: {
        container: {
          borderWidth: 2,
          borderColor: "#3B2F2F",
          borderRadius: 16,
        },
        text: {
          color: "#3B2F2F",
          fontWeight: "600",
        },
      },
    };
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Top bar with icons + tagline */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton}>
          <Ionicons name="flame" size={22} color="#3B2F2F" />
        </Pressable>
        <Text style={styles.topText}>Less doubt, more wins.</Text>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#3B2F2F" />
        </Pressable>
      </View>

      <CalendarHeader date={date} setDate={setDate} />

      <Calendar
        style={styles.calendar}
        markingType="custom"
        theme={{
          textSectionTitleDisabledColor: "#ccc",
          selectedDayBackgroundColor: "#3B2F2F",
          selectedDayTextColor: "#fff",
          todayTextColor: "#3B2F2F",
          arrowColor: "#3B2F2F",
          monthTextColor: "#3B2F2F",
          textMonthFontWeight: "bold",
          textDayFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        onDayPress={(d) => {
          // parse manually to avoid timezone shift
          const [y, m, day] = d.dateString.split("-").map(Number);
          setDate(new Date(y, m - 1, day));
        }}
        markedDates={marked}
      />

      <View style={styles.footer}>
        <Text style={styles.streak}>You have a 6-day streak 🔥</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    margin: 16,
    borderRadius: 20,
    paddingBottom: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  streak: {
    color: "#3B2F2F",
    fontWeight: "600",
  },
});
