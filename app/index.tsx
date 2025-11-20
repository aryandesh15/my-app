// app/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CalendarHeader from "../components/CalendarHeader";
import FlipBook from "../components/FlipBook";
import useDateStore from "../store/useDateStore";

interface CardPageProps {
  title: string;
  subtitle?: string;
  big?: string;
  small?: string;
}

function CardPage({ title, subtitle, big, small }: CardPageProps) {
  return (
    <View>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      <Text style={styles.cardTitle}>{title}</Text>
      {big && <Text style={styles.big}>{big}</Text>}
      {small && <Text style={styles.small}>{small}</Text>}
    </View>
  );
}

export default function Today() {
  const date = useDateStore(s => s.date);
  const setDate = useDateStore(s => s.setDate);
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Top bar */}
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

      <Text style={styles.quote}>
        “The race is won before you even step on the track—win it in your mind
        first.”
      </Text>

      {/* Flip books row */}
      <View style={styles.row}>
        {/* LEFT page – no tap action, only long-press to flip */}
        <FlipBook
          direction="left"
          pages={[
            <CardPage
              key="today"
              title="TODAY IS"
              subtitle="Speed Endurance Day"
              big="2.5 hrs"
              small="till warm up"
            />,
            <CardPage
              key="tomorrow"
              title="TOMORROW"
              subtitle="Recovery Jog"
              big="40 min"
            />,
            <CardPage
              key="rest"
              title="REST DAY"
              subtitle="Mobility + Stretch"
              big="30 min"
            />,
          ]}
        />

        {/* RIGHT page – tap opens questionnaire when on page 0 */}
        <FlipBook
          direction="right"
          pages={[
            <CardPage
              key="pre"
              title="Pre-Workout"
              subtitle="Questionnaire"
              small="Tap to fill ⦿"
            />,
            <CardPage
              key="hydration"
              title="Hydration"
              subtitle="Checklist"
              small="Tap to view"
            />,
            <CardPage
              key="mindset"
              title="Mindset"
              subtitle="Daily Prompt"
              small="Tap to reflect"
            />,
          ]}
          onCardPress={pageIndex => {
            if (pageIndex === 0) {
              router.push("/questionnaire");
            }
          }}
        />
      </View>

      {/* Countdown */}
      <View style={styles.countContainer}>
        <Text style={styles.countNumber}>4</Text>
        <Text style={styles.countLabel}>days till</Text>
        <Text style={styles.raceDay}>RACE DAY</Text>
      </View>
    </ScrollView>
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
  quote: {
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  cardSubtitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  big: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginTop: 6,
  },
  small: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 4,
  },
  countContainer: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 40,
  },
  countNumber: {
    fontSize: 48,
    fontWeight: "800",
  },
  countLabel: {
    marginTop: -6,
    color: "#555",
  },
  raceDay: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "800",
  },
});
