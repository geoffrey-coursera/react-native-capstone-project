export { Checkbox as default };
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Pressable } from 'react-native';
import { Highlight } from '@/components/StyledText';
import { Colors, Shades } from '@/lib/Colors';

type CheckBoxProps = {
    label: string,
    checked: boolean,
    onToggle: (a: boolean) => void,
};

const Checkbox = ({ label, checked, onToggle }: CheckBoxProps) =>  (
    <Pressable style={styles.inputField} onPress={() => onToggle(!checked)}>
        <View style={[styles.checkbox, checked && styles.checked]}>
            <Ionicons name="checkmark-sharp" style={[styles.checkMark, !checked && styles.hide]} />
        </View>
        <Highlight>{label}</Highlight>
    </Pressable>
);

const styles = StyleSheet.create({
    inputField: {
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Shades.green['10%'],
        backgroundColor: Colors.paper
    },
    checked: {
        backgroundColor: Colors.green,
        borderColor: Colors.green,
    },
    checkMark: {
        fontSize: 18,
        textAlign: 'right',
        color: Colors.paper,
    },
    hide: {
        opacity: 0
    }
});