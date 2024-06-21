export { MainView as default };

import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

const MainView = ({ children }: { children: ReactNode }) => (
    <View style={styles.mainView}>{children}</View>
);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    }
});