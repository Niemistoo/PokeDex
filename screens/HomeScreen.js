import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Button } from "react-native-paper"

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?&limit=151'

export default function HomeScreen({ navigation }) {
    //Implement screen that loads 20 pokemon at start and saves them to local cache
    //Screen has a button to load next 20 pokemons in FlatList
    //Screen loads a preview image for every pokemon
    //pokemon can be clicked and navigate to PokemonScreen that loads PokemonCard
    //User can search for Pokemons

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const loadPokemons = async () => {
            const data = await fetchPokemons()
            setPokemons(data)
        }
        loadPokemons()
    }, [])

    const fetchPokemons = async () => {
        const cachedData = await AsyncStorage.getItem("pokemons")

        if (cachedData && cachedData.length !== 0) {
            console.log("Using cached data")
            return JSON.parse(cachedData)
        }

        try {
            console.log("Fetching Pokemons")
            const response = await fetch(BASE_URL)
            const data = await response.json()

            const pokemons = data.results[0]

            await AsyncStorage.setItem("pokemons", JSON.stringify(pokemons))
            return pokemons

        } catch (error) {
            console.log("Error fetching Pokemon data ", error)
            return []
        }
    }

    const Pokemon = ({ pokemon }) => {
            <Text>{pokemon.name}</Text>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>PokeDex</Text>
            <FlatList
                data={pokemons}
                renderItem={({ item }) => <Pokemon pokemon={item} />}
                keyExtractor={(pokemon) => pokemon.name}
            />
            <Button title="PokemonScreen" onPress={() => navigation.navigate('PokemonScreen')}>PokemonScreen</Button>
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
    }
})