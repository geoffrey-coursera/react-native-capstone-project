export { RenderOffScreen as default };

import React, { ReactNode } from 'react';
import {LayoutChangeEvent, View, ViewProps, StyleSheet} from 'react-native';

type Props =  Omit<ViewProps, 'children'> & {
  render: () => ReactNode
  onLayout?: (e: LayoutChangeEvent) => void;
}

const RenderOffScreen = ({ render, onLayout, style, ...rest }: Props) => (
    <View onLayout={onLayout} style={[style, hide]} {...rest}>{render()}</View>
);

const { hide } = StyleSheet.create({
    hide: {
        position: 'absolute',
        width: '100%',
        zIndex: -1,
        opacity: 0,
    }
});