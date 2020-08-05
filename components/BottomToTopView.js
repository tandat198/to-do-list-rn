import React, { useRef } from "react";
import { Animated } from "react-native";

export default function BottomToTopView(props) {
    const fadeAnim = useRef(new Animated.Value(props.height)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View
            style={{
                ...props.style,
                transform: [{ translateY: fadeAnim }],
            }}
        >
            {props.children}
        </Animated.View>
    );
}
