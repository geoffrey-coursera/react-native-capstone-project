export { CollapsibleView as default };

import { useUpdateEffect } from '@/hooks/useUpdateEffect';
import { runOnce } from '@/lib/functional';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';

type CollapsibleViewProps = {
    wrapperStyle?: ViewStyle
    style?: ViewStyle
    children: ReactNode,
    collapsed?: boolean,
    duration?: number
};

/** A view which height is transitioned to and from 0 when you set `collapsed` to `true` or `false` programmatically */
const CollapsibleView = ({
    wrapperStyle,
    style,
    children,
    collapsed,
    duration=200
}: CollapsibleViewProps) => {
    const [baseHeight, setBaseHeight] = useState<number | null>(null);

    const measureHeight = useCallback(runOnce((e: LayoutChangeEvent) => {
        const baseHeight = e.nativeEvent.layout.height;
        height.setValue(baseHeight);
        setBaseHeight(baseHeight);
    }), []);

    const height = useRef(new Animated.Value(0)).current;

    const config = { duration, useNativeDriver: false };

    const close = Animated.timing(height, { toValue: 0, ...config });
    
    const open = Animated.timing(height, { toValue: baseHeight ?? 0, ...config });
    
    useUpdateEffect(() => {
        collapsed ? close.start() : open.start();
    }, [collapsed]);

    const dynamicHeight = baseHeight !== null && { height };

    return(
        <Animated.View style={[styles.wrapper, wrapperStyle, dynamicHeight]}>
            <View style={style} onLayout={measureHeight}>
                {children}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden'
    }
});