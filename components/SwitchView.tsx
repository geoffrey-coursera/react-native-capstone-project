export { SwitchView as default };

import { useUpdateEffect } from '@/hooks/useUpdateEffect';
import { ReactNode, useRef } from 'react';
import { Animated, View } from 'react-native';

type SwitchViewProps = {
    children: ReactNode,
    active: number,
    height: number
    duration?: number,
};

/** A view which transitions from and to the first or the second of its children views with an animation */
const SwitchView = ({ children, height, active, duration=200 }: SwitchViewProps) => {
    const posY = useRef(new Animated.Value(0)).current;

    const switchTo = (index: number) => Animated.timing(posY, {
        toValue: -1 * index * height,
        duration,
        useNativeDriver: false
    }).start();
    
    useUpdateEffect(() => switchTo(active), [active]);

    return(
        <View style={{ height, overflow: 'hidden' }}>
            <Animated.View style={{ top: posY }}>
                {children}
            </Animated.View>
        </View>
    );
};