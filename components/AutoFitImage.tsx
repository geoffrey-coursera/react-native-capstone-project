export { AutoFitImage as default };

import { ReactNode, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import type { LayoutChangeEvent, ImageSourcePropType, ImageStyle, ImageResizeMode, ViewStyle } from 'react-native';

type AutoFitImageProps = {
    position: 'left' | 'right'
    source: ImageSourcePropType,
    gap?: number,
    wrapperStyle?: ViewStyle
    contentStyle?: ViewStyle
    imageStyle: ImageStyle,
    resizeMode?: ImageResizeMode,
    children: ReactNode,
};

const AutoFitImage = ({
    position,
    source,
    gap,
    wrapperStyle,
    contentStyle,
    imageStyle={},
    resizeMode='cover',
    children,
}: AutoFitImageProps) => {
    const [height, setHeight] = useState(0);

    const measureHeight = (e: LayoutChangeEvent) => {
        setHeight(e.nativeEvent.layout.height);
    };

    const content = (
        <View style={[styles.content, contentStyle]} onLayout={measureHeight}>
            {children}
        </View>
    );

    return(
        <View style={[styles.wrapper, wrapperStyle, gap !== undefined && {gap}]}>
            {position === 'right' && content}
            <Image
                source={source}
                resizeMode={resizeMode}
                style={[imageStyle, {height}]}
            />
            {position === 'left' && content}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    },
    content: {
        flexShrink: 1
    }
});