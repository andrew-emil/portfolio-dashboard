import { IconName } from "@/types/icon-name";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

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

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: focused ? 1.2 : 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    }, [focused, scaleAnim]);

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialCommunityIcons
                name={focused ? icon : iconOutline}
                size={24}
                color={color}
            />
        </Animated.View>
    );
}

export default AnimatedTabIcon;