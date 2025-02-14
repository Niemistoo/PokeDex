import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import PokemonRow from "../components/PokemonRow"
import SearchBar from "../components/SearchBar"
import Header from "../components/Header"

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?&limit=151'

export default function HomeScreen({ navigation }) {

    const [pokemons, setPokemons] = useState([])
    const [criteria, setCriteria] = useState('')
    const filteredPokemons = useMemo(() =>
        criteria.length > 0 ? pokemons.filter((pokemon) => pokemon.name.startsWith(criteria.toLowerCase())) : pokemons, [pokemons, criteria])

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

            const pokemons = data.results
            console.log(pokemons)

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
                <Header />
                <SearchBar criteria={criteria} setCriteria={setCriteria} />
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
        padding: 24,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        width: '100%',
        height: '100%',
        marginTop: 0,
    },
    listview: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20,
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 16,
    },
})