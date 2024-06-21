export { ErrorBubble as default };

import { Shades } from "@/lib/Colors";
import CustomView from "@/components/CustomView";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    errorBubble: {
        marginTop: 8,
        backgroundColor: Shades.error['10%'],
        borderRadius: 12,
        borderColor:  Shades.error['33%'],
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 6
    }
});

const ErrorBubble = CustomView(styles.errorBubble);