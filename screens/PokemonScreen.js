import { Pressable, StyleSheet, Text, View } from "react-native"
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from 'react';


const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export default function PokemonScreen({ navigation, route }) {

    const [pokemon, setPokemon] = useState(null)

    const { url } = route.params;

    const fetchPokemon = () => {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then((result) => {
                    const json = result
                    setPokemon({
                        id: json.id,
                        name: json.name,
                        types: json.types.map(t => t.type.name),
                        img_src: json.sprites.other["official-artwork"].front_default
                    })
                }).catch((error) => {
                    console.log(error)
                    setPokemon(null)
                })
        }
    }

    useEffect(() => {
        fetchPokemon()
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>PokéDex</Text>
                {pokemon &&
                    <PokemonCard pokemon={pokemon} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        borderColor: 'black'
    },
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
    
    button: {
        backgroundColor: '#2BF',
        borderRadius: 20,
        height: 50,
        justifyContent: 'center'
    },
    buttontext: {
        fontSize: 30,
        textAlign: 'center',
        paddingVertical: 8,
    }
});
