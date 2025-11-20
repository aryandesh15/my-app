// app/questionnaire.tsx
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const questions = [
  {
    id: 1,
    title: "How confident are you feeling about today's practice?",
    minLabel: "Not confident at all",
    maxLabel: "Extremely confident",
    scaleLabels: [
      "Not at all confident",
      "Slightly confident",
      "Somewhat confident",
      "Very confident",
      "Extremely confident",
    ],
  },
  {
    id: 2,
    title: "How nervous are you feeling about today's practice?",
    minLabel: "Not nervous at all",
    maxLabel: "Extremely nervous",
    scaleLabels: [
      "Not at all nervous",
      "Slightly nervous",
      "Moderately nervous",
      "Very nervous",
      "Extremely nervous",
    ],
  },
];

const anxietyOptions = [
  "Cognitive",
  "Somatic",
  "Social",
  "Anticipatory",
  "None",
];

export default function Questionnaire() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [confidence, setConfidence] = useState(3);
  const [nervousness, setNervousness] = useState(3);
  const [anxTypes, setAnxTypes] = useState<string[]>(["Somatic", "Anticipatory"]);
  const [note, setNote] = useState("");

  const totalSteps = 4;
  const progress = (step + 1) / totalSteps;

  const next = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      router.back();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const toggleType = (label: string) => {
    setAnxTypes(prev =>
      prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label],
    );
  };

  const renderScaleQuestion = (isConfidence: boolean) => {
    const q = isConfidence ? questions[0] : questions[1];
    const value = isConfidence ? confidence : nervousness;
    const feelingText = q.scaleLabels[value - 1];

    return (
      <>
        <Text style={styles.questionXofY}>
          Question {step + 1} of {totalSteps}
        </Text>
        <Text style={styles.questionText}>{q.title}</Text>

        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={styles.imFeeling}>I'm feeling</Text>
          <Text style={styles.feeling}>{feelingText}</Text>
        </View>

        <View style={styles.sliderLabelsRow}>
          <Text style={styles.scaleLabel}>{q.minLabel}</Text>
          <Text style={styles.scaleLabelRight}>{q.maxLabel}</Text>
        </View>

        <Slider
          style={{ width: "100%", marginTop: 8 }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={value}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="rgba(255,255,255,0.4)"
          thumbTintColor="#ffffff"
          onValueChange={val =>
            isConfidence ? setConfidence(val) : setNervousness(val)
          }
        />
      </>
    );
  };

  const renderContent = () => {
    if (step === 0) {
      return renderScaleQuestion(true);
    }

    if (step === 1) {
      return renderScaleQuestion(false);
    }

    if (step === 2) {
      return (
        <>
          <Text style={styles.questionXofY}>
            Question 3 of {totalSteps}
          </Text>
          <Text style={styles.questionText}>
            Which of the following best describe what kind of anxiety you're
            feeling? (select all that apply)
          </Text>

          <View style={{ marginTop: 28, gap: 10 }}>
            {anxietyOptions.map(label => {
              const selected = anxTypes.includes(label);
              return (
                <Pressable
                  key={label}
                  onPress={() => toggleType(label)}
                  style={[
                    styles.optionRow,
                    selected && styles.optionRowSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      selected && styles.optionLabelSelected,
                    ]}
                  >
                    {label}
                  </Text>
                  <View
                    style={[
                      styles.optionCircle,
                      selected && styles.optionCircleSelected,
                    ]}
                  >
                    {selected && (
                      <Ionicons name="checkmark" size={16} color="#000" />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </>
      );
    }

    // step 3 – notes
    return (
      <>
        <Text style={styles.questionXofY}>
          Question 4 of {totalSteps}
        </Text>
        <Text style={styles.questionText}>
          Anything else you’d like your coach to know before practice?
        </Text>
        <TextInput
          placeholder="Type a short note..."
          placeholderTextColor="#bbb"
          multiline
          value={note}
          onChangeText={setNote}
          style={styles.textArea}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* gradient background */}
      <LinearGradient
        colors={["#050505", "#ff5b1f"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.topTitle}>Pre-workout Questionnaire</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 32,
        }}
      >
        {renderContent()}

        {/* navigation buttons */}
        <View style={styles.bottomButtonsRow}>
          <Pressable
            style={[styles.secondaryBtn, step === 0 && { opacity: 0.5 }]}
            onPress={goBack}
          >
            <Text style={styles.secondaryText}>
              {step === 0 ? "Back" : "Previous"}
            </Text>
          </Pressable>

          <Pressable style={styles.nextBtn} onPress={next}>
            <Text style={styles.nextText}>
              {step === totalSteps - 1 ? "Finish" : "Next →"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  progressTrack: {
    marginTop: 12,
    marginHorizontal: 16,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    flexDirection: "row",
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#fff",
  },
  questionXofY: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 8,
  },
  questionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  imFeeling: {
    color: "#eee",
    fontSize: 15,
  },
  feeling: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  sliderLabelsRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scaleLabel: {
    color: "#bbb",
    fontSize: 11,
    width: "45%",
  },
  scaleLabelRight: {
    color: "#bbb",
    fontSize: 11,
    width: "45%",
    textAlign: "right",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  optionRowSelected: {
    backgroundColor: "#fff",
  },
  optionLabel: {
    color: "#eee",
    fontSize: 15,
  },
  optionLabelSelected: {
    color: "#000",
    fontWeight: "600",
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleSelected: {
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  textArea: {
    marginTop: 20,
    minHeight: 120,
    borderRadius: 14,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
  bottomButtonsRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  secondaryText: {
    color: "#fff",
    fontWeight: "500",
  },
  nextBtn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
    backgroundColor: "#000",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
