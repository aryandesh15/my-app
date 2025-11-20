// app/you.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import RingProgress from "../components/RingProgress";

type SectionKey = "overview" | "pbs" | "standings" | "workouts";

export default function You() {
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeTab, setActiveTab] = useState<SectionKey>("overview");
  const sectionPositions = useRef<Record<SectionKey, number>>({
    overview: 0,
    pbs: 0,
    standings: 0,
    workouts: 0,
  }).current;

  const handleScrollTo = (key: SectionKey) => {
    setActiveTab(key);
    const y = sectionPositions[key] ?? 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const entries = Object.entries(sectionPositions) as [SectionKey, number][];
    const sorted = entries.sort((a, b) => a[1] - b[1]);

    let current: SectionKey = "overview";
    for (const [key, pos] of sorted) {
      if (y + 80 >= pos) current = key;
      else break;
    }
    if (current !== activeTab) setActiveTab(current);
  };

  const TabButton = ({ label, keyName }: { label: string; keyName: SectionKey }) => (
    <Pressable onPress={() => handleScrollTo(keyName)} style={styles.tabBtn}>
      <Text
        style={[
          styles.tabText,
          activeTab === keyName && styles.tabTextActive,
        ]}
      >
        {label}
      </Text>
      {activeTab === keyName && <View style={styles.tabUnderline} />}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Top bar with icons */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton}>
          <Ionicons name="flame" size={22} color="#3B2F2F" />
        </Pressable>
        <Text style={styles.topText}>Profile</Text>
        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#3B2F2F" />
        </Pressable>
      </View>

      {/* Profile row: picture next to name */}
      <View style={styles.profileRow}>
        <Image
          // default profile picture
          source={{
            uri: "https://images.pexels.com/photos/3760850/pexels-photo-3760850.jpeg?auto=compress&cs=tinysrgb&w=200",
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Lydia Troupe</Text>
          <Text style={styles.subtitle}>Main Event: 400m</Text>
          <Text style={styles.subtitle}>“In-Season” — Race Week</Text>
        </View>
      </View>

      {/* Top nav bar */}
      <View style={styles.tabsRow}>
        <TabButton label="Overview" keyName="overview" />
        <TabButton label="Personal Bests" keyName="pbs" />
        <TabButton label="National Standings" keyName="standings" />
        <TabButton label="Workouts" keyName="workouts" />
      </View>

      {/* Scrollable content */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* OVERVIEW SECTION */}
        <View
          onLayout={(e) => {
            sectionPositions.overview = e.nativeEvent.layout.y;
          }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Personal Goals – Outdoor 2025</Text>
          <View style={styles.ringsRow}>
            <RingProgress progress={0.62} label="Mind" />
            <RingProgress progress={0.5} label="Speed" />
            <RingProgress progress={0.95} label="Strength" />
          </View>
        </View>

        {/* PERSONAL BESTS */}
        <View
          onLayout={(e) => {
            sectionPositions.pbs = e.nativeEvent.layout.y;
          }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Personal Bests</Text>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Outdoor</Text>
            <Text style={styles.cardText}>100m: 11.56</Text>
            <Text style={styles.cardText}>200m: 23.52</Text>
            <Text style={styles.cardText}>400m: 53.20</Text>
            <Text style={styles.cardText}>4x400m: 3:40.28</Text>
          </View>
        </View>

        {/* NATIONAL STANDINGS */}
        <View
          onLayout={(e) => {
            sectionPositions.standings = e.nativeEvent.layout.y;
          }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>National Standings</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>400m – 3rd nationally</Text>
            <Text style={styles.cardText}>200m – 5th nationally</Text>
          </View>
        </View>

        {/* WORKOUTS */}
        <View
          onLayout={(e) => {
            sectionPositions.workouts = e.nativeEvent.layout.y;
          }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Mon – Speed Endurance, 6x300m</Text>
            <Text style={styles.cardText}>Tue – Recovery Jog, 40min</Text>
            <Text style={styles.cardText}>Wed – Strength, Lower Body</Text>
          </View>
        </View>
      </ScrollView>
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
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
  },
  name: { fontSize: 20, fontWeight: "700", color: "#3B2F2F" },
  subtitle: { color: "#7D6F6F", marginTop: 2 },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDD",
    paddingBottom: 4,
  },
  tabBtn: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 13,
    color: "#777",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#3B2F2F",
    fontWeight: "700",
  },
  tabUnderline: {
    marginTop: 4,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#3B2F2F",
    width: 30,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#3B2F2F",
  },
  ringsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  card: {
    backgroundColor: "#7E6F6F",
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  cardHeader: {
    color: "white",
    fontWeight: "700",
    marginBottom: 6,
  },
  cardText: {
    color: "white",
    marginBottom: 4,
  },
});
