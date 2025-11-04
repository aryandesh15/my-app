import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import CalendarHeader from "../components/CalendarHeader";

const deep = "#2a1f1f";

function Likert({
  label, value, onChange,
}: { label: string; value: number | null; onChange: (n: number) => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <View style={styles.likertRow}>
        {[1,2,3,4,5].map(n => (
          <Pressable
            key={n}
            onPress={() => onChange(n)}
            style={[
              styles.likertDot,
              value === n && styles.likertDotActive,
            ]}
          >
            <Text style={[styles.likertText, value === n && { color: "white" }]}>{n}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function Mental() {
  const [date, setDate] = useState(new Date());
  const [journal, setJournal] = useState("");
  const [confident, setConfident] = useState<number|null>(null);
  const [anxious, setAnxious] = useState<number|null>(null);
  const [stressed, setStressed] = useState<number|null>(null);

  const submit = () => {
    Alert.alert("Submitted", JSON.stringify({ journal, confident, anxious, stressed }, null, 2));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.header}>Mental</Text>
      <CalendarHeader date={date} setDate={setDate} />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>How are you feeling today?</Text>
          <TextInput
            placeholder="Start typing here..."
            placeholderTextColor="#cfcfcf"
            multiline
            value={journal}
            onChangeText={setJournal}
            style={styles.input}
          />
        </View>

        <Likert label="How confident were you today?" value={confident} onChange={setConfident} />
        <Likert label="How anxious were you today?" value={anxious} onChange={setAnxious} />
        <Likert label="How stressed were you today?" value={stressed} onChange={setStressed} />
      </ScrollView>

      <Pressable onPress={submit} style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { color: "#9a9a9a", fontSize: 16, fontWeight: "600", marginTop: 12, marginLeft: 12 },
  card: { backgroundColor: deep, borderRadius: 16, padding: 14, marginBottom: 14 },
  cardLabel: { color: "white", marginBottom: 8, fontWeight: "600" },
  input: { backgroundColor: "#3b2f2f", borderRadius: 10, minHeight: 90, padding: 10, color: "white" },
  likertRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  likertDot: {
    width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: "#d9d1d1",
    alignItems: "center", justifyContent: "center", backgroundColor: "#efeaea",
  },
  likertDotActive: { backgroundColor: "#5b4a4a", borderColor: "#5b4a4a" },
  likertText: { color: "#4b3f3f", fontWeight: "700" },
  submitBtn: {
    position: "absolute", left: 16, right: 16, bottom: 24,
    backgroundColor: "#3b2f2f", paddingVertical: 14, borderRadius: 14, alignItems: "center",
  },
  submitText: { color: "white", fontWeight: "700", fontSize: 16 },
});
