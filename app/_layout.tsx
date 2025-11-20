// app/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B2F2F",
        tabBarInactiveTintColor: "#BEB7B7",
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },
      }}
    >
      {/* TODAY */}
      <Tabs.Screen
        name="index"
        options={{
          title: "TODAY",
          tabBarIcon: ({ color }) => (
            <Ionicons name="sunny-outline" size={22} color={color} />
          ),
        }}
      />

      {/* CALENDAR */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: "CALENDAR",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />

      {/* + (ADD) */}
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 28,
                backgroundColor: "#3B2F2F",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20, // float the button up a bit
              }}
            >
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
        }}
      />

      {/* FRIENDS */}
      <Tabs.Screen
        name="friends"
        options={{
          title: "FRIENDS",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}
      />

      {/* YOU / PROFILE */}
      <Tabs.Screen
        name="you"
        options={{
          title: "YOU",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      {/* HIDDEN QUESTIONNAIRE ROUTE (no tab button) */}
      <Tabs.Screen
        name="questionnaire"
        options={{
          href: null,           // keep it out of the tab bar
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
