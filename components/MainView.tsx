export { MainView as default };

import { View, StyleSheet, ViewProps } from "react-native";

const MainView = ({ children, ...props }: ViewProps) => (
    <View style={styles.mainView} {...props}>{children}</View>
);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    }
});