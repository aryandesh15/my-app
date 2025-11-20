import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function RingProgress({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  const size = 80;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - progress * circumference;

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#D9D9D9"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <Circle
          stroke="#3B2F2F"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center" },
  percent: { position: "absolute", top: 28, fontWeight: "700", fontSize: 16 },
  label: { marginTop: 4, color: "#444" },
});
