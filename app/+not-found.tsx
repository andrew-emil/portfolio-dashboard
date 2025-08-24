import { Link } from "expo-router";
import { GlowButton } from "@/components/glow-button";
import { View, Text } from "react-native";

export default function NotFound() {
  return (
    <View className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <View className="mx-auto grid max-w-lg place-items-center gap-4 sm:gap-6 p-6 sm:p-10 text-center">
        <View className="space-y-3 sm:space-y-4">
          <Text className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            404
          </Text>
          <Text className="text-xl sm:text-2xl font-semibold text-gray-100">
            Page Not Found
          </Text>
          <Text className="text-gray-400 text-sm sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </Text>
        </View>
        <Link href="/" asChild>
          <GlowButton>Go Home</GlowButton>
        </Link>
      </View>
    </View>
  );
}
