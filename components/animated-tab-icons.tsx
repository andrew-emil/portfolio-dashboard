import { IconName } from "@/types/icon-name";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";

function AnimatedTabIcon({
    focused,
    icon,
    iconOutline,
    color,
}: {
    focused: boolean;
    icon: IconName;
    iconOutline: IconName;
    color: string;
}) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <MaterialCommunityIcons
                    name={focused ? icon : iconOutline}
                    size={24}
                    color={color}
                />
            </Animated.View>
        </Pressable>
    );
}

export default AnimatedTabIcon;
