import { BottomTabNavigationOptions, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp, Theme } from "@react-navigation/native";

export const screenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
        theme: Theme;
    }) => BottomTabNavigationOptions)
    | undefined = {
    headerShown: false,

    // Colors to match portfolio theme
    tabBarActiveTintColor: "#BB86FC", // purple accent
    tabBarInactiveTintColor: "#888", // soft gray

    // Dark modern tab bar
    tabBarStyle: {
        backgroundColor: "#0B0B14", // deep navy / dark background
        borderTopWidth: 1,
        borderTopColor: "#1E1E2F",
        elevation: 8,
        height: 65,
        paddingBottom: 6,
        paddingTop: 6,
    },

    // Centered label
    tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: "600",
        textTransform: "capitalize",
        letterSpacing: 0.3,
        marginTop: 2,
    },

    // Keep icon above text
    tabBarIconStyle: {
        marginBottom: -2,
    },

    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    tabBarAllowFontScaling: true,
};
