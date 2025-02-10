import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { Button, PaperProvider, TextInput } from 'react-native-paper';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export default function App() {
  const [searchText, setSearchText] = useState('')
  const [pokemon, setPokemon] = useState({ id: 1, name: 'Bulbasaur' })

  const fetchPokemon = (id) => {
    if (id !== null) {
      const address = BASE_URL + id
      setSearchText('')
      fetch(address)
        .then(response => response.json())
        .then((result) => {
          const json = result
          console.log(json.sprites.other["official-artwork"].front_default)
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

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>PokeDex</Text>
          {pokemon &&
            <PokemonCard pokemon={pokemon} />
          }
          <View style={styles.searchcontainer}>
            <TextInput style={styles.searchfield}
              placeholder='Pokemon ID or name'
              value={searchText}
              onChangeText={text => setSearchText(text)}
              mode='outlined'
            />
            <Pressable style={styles.button} title='Search' onPress={() => fetchPokemon(searchText)}>
              <Text style={styles.buttontext}>Search</Text>
            </Pressable>
          </View>

          <StatusBar style="auto" />
        </View>
      </View>
    </PaperProvider>
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
    fontWeight: 'bold',
    margin: 8,
    paddingHorizontal: 16,
    backgroundColor: 'yellow',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 10,
  },
  searchcontainer: {
    flexDirection: 'column',
    marginTop: 16,
  },
  searchfield: {
    borderRadius: 50,
    marginBottom: 8,
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
