import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  View
} from "react-native";
import axiosClient from "../lib/axiosClient";
import { ContactDto } from "@/types/dtos/contact.dto";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const [progress, setProgress] = useState<number>(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        await Font.loadAsync({
          "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
          "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
          "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
        });

        setProgress(20);

        const { data } = await axiosClient.get<ContactDto[]>("/contacts", {
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.floor(
                (progressEvent.loaded / progressEvent.total) * 60
              );
              setProgress(20 + percent);
            }
          },
        });

        setTimeout(() => {
          setProgress(100);
          SplashScreen.hideAsync();
          router.replace({
            pathname: "/(tabs)",
            params: { apiData: JSON.stringify(data) },
          });
        }, 600);
      } catch (error: any) {
        console.error("Error loading data:", error);
        setTimeout(() => {
          setProgress(100);
          SplashScreen.hideAsync();
          router.replace({
            pathname: "/(tabs)",
            params: { errorMessage: "Failed to load contacts data" },
          });
        }, 600);
      }
    };

    loadData();
  }, [router]);


  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, progress]);


  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="items-center justify-center screen">
      <LinearGradient
        colors={["#9333ea40", "#c026d340", "#ec489940"]}
        style={{
          padding: 24,
          borderRadius: 999,
          marginBottom: 28,
          shadowColor: "#9333ea",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 20,

          elevation: 20,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </LinearGradient>

      {/* Title */}
      <Text className="text-foreground text-3xl font-bold mb-3">
        Andrew Emil
      </Text>
      <Text className="text-muted-foreground text-lg mb-8">
        Software Developer
      </Text>

      {/* Progress Bar */}
      <View className="w-full h-4 bg-card rounded-full overflow-hidden mb-3">
        <Animated.View
          style={{
            width: widthInterpolated,
            height: "100%",
          }}
        >
          <LinearGradient
            colors={["#9333ea", "#c026d3", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      {/* Percentage */}
      <Text className="text-foreground text-center font-inter-italic text-sm">{progress}%</Text>
      {/* Loading spinner */}
      <ActivityIndicator
        size="large"
        color="#9333ea"
        style={{ marginTop: 32 }}
      />
    </View>
  );
}
