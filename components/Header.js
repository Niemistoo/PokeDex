import { StyleSheet, Text } from "react-native"

export default function Header() {
    return (
        <Text style={styles.header}>PokéDex</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        fontSize: 60,
        fontWeight: 'bold',
        margin: 8,
        paddingHorizontal: 16,
        backgroundColor: 'yellow',
        borderWidth: 5,
        borderColor: 'black',
        borderRadius: 10,
    },
})