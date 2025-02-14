import { Pressable, StyleSheet, Text } from "react-native"

export default function PokemonRow({ pokemon, navigation }) {
    const url = pokemon.url

    return (
        <Pressable 
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
            onPress={() => navigation.navigate("Pokémon", { url: pokemon.url })}
        >
            <Text style={styles.rowtext}>{pokemon.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f8f8f8',  // Vaalea pohja
        paddingVertical: 12,         // Lisää korkeutta
        paddingHorizontal: 20,       // Lisää sivuilla tilaa
        marginVertical: 5,           // Väli riveille
        borderRadius: 10,            // Pehmeät kulmat
        elevation: 3,                // Kevyt varjo Androidilla
        shadowColor: '#000',         // Varjo iOS:lle
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonPressed: {
        backgroundColor: '#e0e0e0', // Tummentuu painettaessa
    },
    rowtext: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",              // Tumma teksti parempaan luettavuuteen
        textTransform: "capitalize", // Pokémon-nimet alkavat isolla
    }

})