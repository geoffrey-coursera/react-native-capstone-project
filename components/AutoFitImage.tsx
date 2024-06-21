export { AutoFitImage as default };

import { ReactNode, useState } from 'react';
import { View, Image } from 'react-native';
import type { LayoutChangeEvent, ImageSourcePropType, ImageStyle, ImageResizeMode } from 'react-native';

type AutoFitImageProps = {
    position: 'left' | 'right'
    source: ImageSourcePropType,
    gap?: number,
    imageStyle: ImageStyle,
    resizeMode?: ImageResizeMode,
    children: ReactNode,
};

const AutoFitImage = ({
    position,
    source,
    gap=0,
    imageStyle={},
    resizeMode='cover',
    children
}: AutoFitImageProps) => {
    const [height, setHeight] = useState(0);

    const measureHeight = (e: LayoutChangeEvent) => {
        setHeight(e.nativeEvent.layout.height);
    };

    const content = (
        <View style={{ flexShrink: 1 }} onLayout={measureHeight}>
            {children}
        </View>
    );

    return(
        <View style={{ flexDirection: 'row', gap }}>
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