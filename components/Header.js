import { Dimensions, StyleSheet, Text } from "react-native"

const { width } = Dimensions.get("window");

export default function Header() {
    const fontSize = width > 400 ? 60 : 40

    return (
        <Text style={[styles.header, { fontSize }]}>PokéDex</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        fontWeight: 'bold',
        margin: 8,
        paddingHorizontal: 16,
        backgroundColor: 'yellow',
        borderWidth: 5,
        borderColor: 'black',
        borderRadius: 10,
    },
})