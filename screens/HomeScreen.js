import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useMemo, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import PokemonRow from "../components/PokemonRow"
import SearchBar from "../components/SearchBar"

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?&limit=151'

export default function HomeScreen({ navigation }) {

    const [pokemons, setPokemons] = useState([])
    const [criteria, setCriteria] = useState('')
    const filteredPokemons = useMemo(() => 
        criteria.length > 0 ? pokemons.filter((pokemon) => pokemon.name.startsWith(criteria.toLowerCase())) : pokemons,[pokemons, criteria])

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

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.header}>PokéDex</Text>
                <SearchBar styles={styles.searchfield} criteria={criteria} setCriteria={setCriteria} />
                <View style={styles.listview}>
                    <FlatList
                        data={filteredPokemons}
                        renderItem={({ item }) => <PokemonRow pokemon={item} navigation={navigation} />}
                        keyExtractor={(pokemon) => pokemon.name}
                    />
                </View>

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
    searchcontainer: {
        marginTop: 16,
    },
    searchfield: {
        borderRadius: 50,
        marginBottom: 8,
    },
    listview: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20,
        borderWidth: 5,
        width: '100%',
        paddingHorizontal: 10,
    },
})