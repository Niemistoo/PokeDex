import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import PokemonCard from './components/PokemonCard';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

export default function App() {
  const [searchText, setSearchText] = useState('')
  const [pokemon, setPokemon] = useState({ id: 1, name: 'Bulbasaur' })

  const fetchPokemon = (id) => {
    console.log("Fetching Pokemon id: ", id)
    if (id !== null) {
      const address = BASE_URL + id
      fetch(address)
        .then(response => response.json())
        .then((result) => {
          const json = result
          console.log(json.sprites.other["official-artwork"].front_default)
          setPokemon({
            id: json.id,
            name: json.name,
            img_src: json.sprites.other["official-artwork"].front_default
          })
        }).catch((error) => {
          console.log(error)
          setPokemon(null)
        })
    }
  }

  const fetchPokemonImage = (url) => {
    if (url) {
      fetch(url)

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>PokeDex</Text>
        {pokemon &&
          <PokemonCard pokemon={pokemon} />
        }
        <TextInput style={styles.searchfield}
          placeholder='Pokemon ID or name'
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Button title='Search' onPress={() => fetchPokemon(searchText)} />

        <StatusBar style="auto" />
      </View>
    </View>
  );
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
    margin: 8,
    paddingHorizontal: 16,
    backgroundColor: 'lightgray'
  },
  searchfield: {
    padding: 16,
    backgroundColor: 'fff'
  }
});
