import { StyleSheet } from "react-native";
import { scaled } from "../../../../ui-kit/theme/scaler";
import { themeSpacing } from "../../../../ui-kit/theme/spacer";
import { colors } from "../../../../ui-kit/theme/color";


export const style = StyleSheet.create({
    pointerConteiner: {
        height: scaled(40),
        width: scaled(70),
        borderRadius: themeSpacing(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
})