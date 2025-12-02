// components/FlipBook.tsx
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Direction = "left" | "right";

interface FlipBookProps {
  pages: React.ReactNode[];
  direction?: Direction;
  /** Return true to consume the tap (e.g., when you navigate) and prevent flipping */
  onCardPress?: (pageIndex: number) => boolean | void;
}

export default function FlipBook({
  pages,
  direction = "right",
  onCardPress,
}: FlipBookProps) {
  const [index, setIndex] = useState(0);
  const progress = useSharedValue(0);

  const onFlip = () => {
    if (pages.length <= 1 || progress.value !== 0) return;

    progress.value = withTiming(1, { duration: 450 }, (finished) => {
      if (finished) {
        const next = (index + 1) % pages.length; // (kept same)
        setIndex(next);
        progress.value = 0;
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const sign = direction === "right" ? 1 : -1;
    const angle = interpolate(progress.value, [0, 1], [0, 180 * sign]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${angle}deg` }],
    };
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        const handled = onCardPress?.(index);
        if (handled === true) return; // do NOT flip if caller handled the tap
        onFlip(); // otherwise, short tap flips (kept long-press too)
      }}
      onLongPress={onFlip}     // kept same: hold to flip
      delayLongPress={0}       // kept same
    >
      <Animated.View style={[styles.page, animatedStyle]}>
        {pages[index]}
      </Animated.View>
      <View style={styles.shadow} pointerEvents="none" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "46%",
    aspectRatio: 1,
    marginHorizontal: "2%",
    borderRadius: 16,
    overflow: "hidden",
  },
  page: {
    flex: 1,
    backgroundColor: "#7E6F6F",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backfaceVisibility: "hidden",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});
