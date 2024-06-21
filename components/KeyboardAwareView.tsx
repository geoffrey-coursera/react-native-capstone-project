import { useEffect, useState } from "react";
import { Keyboard, Platform, View, ViewProps } from "react-native";

export { KeyboardAwareView as default };

type KeyboardAwareViewProps = Omit<ViewProps, 'onLayout'> & {
    onLayout: (keyboardHeight: number) => void,
    height: number
}

/** Alternative to KeyboardAvoidingView which behaves the same across platforms.
 * It expects a static height.
 */
const KeyboardAwareView = ({ children, style, height, onLayout, ...props }: KeyboardAwareViewProps) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
  
    useEffect(() => {
        const onShow = (e: any) => {
            const height = e.endCoordinates.height;
            setKeyboardHeight(height);
            onLayout(height)
        };
        const onHide = () => {
            setKeyboardHeight(0);
            onLayout(0)
        };

        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        
        const showListener = Keyboard.addListener(showEvent, onShow);
        const hideListener = Keyboard.addListener(hideEvent, onHide);
        
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);
  
    return (
        <View style={[style, { flex: 0, height, paddingBottom: keyboardHeight }]} {...props}>
            {children}
        </View>
    );
};