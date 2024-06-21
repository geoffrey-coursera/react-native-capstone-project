export { MainView as default };

import { View, StyleSheet, ViewProps, ScrollView } from "react-native";

type MainViewProps = ViewProps & {
    scrollable?: boolean
}

const MainView = (props: MainViewProps) => {
    const { children, style, scrollable, ...rest } = props;
    const innerStyle = scrollable ? styles.mainView : [styles.mainView, style];
    return (
        scrollable
        ? <ScrollView style={innerStyle}>
            <MainView {...props} scrollable={false} />
          </ScrollView>
        : <View style={innerStyle} {...rest}>{children}</View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    }
});