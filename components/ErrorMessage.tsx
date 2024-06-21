export { ErrorMessage as default }
export type { ErrorMessage }

import { View } from "react-native";
import { H3, P } from "@/components/StyledText";
import Colors from "@/lib/Colors";

type ErrorMessage = { title: string, body: string };

const ErrorMessage = ({ title, body } : ErrorMessage) => (
    <View style={{padding: 12 + 20, gap: 12}}>
        <H3 color={Colors.green}>{title}</H3>
        <P>{body}</P>
    </View>
);