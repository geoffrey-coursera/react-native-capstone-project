export { CustomView as default };

import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

const CustomView = (style: StyleProp<ViewStyle>) => ({ children }: { children?: ReactNode }) => (
    <View style={style}>{children}</View>
)