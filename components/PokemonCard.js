import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Image } from "expo-image"

export default function PokemonCard({ pokemon }) {
    const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    if (pokemon) {
        console.log(pokemon.img_src)
        return (
            <View style={styles.card} >
                <Image
                    style={styles.image}
                    source={{uri: pokemon.img_src}}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.namefield}>ID: {pokemon.id} Name: {pokemon.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 300,  // Lisää tämä!
        backgroundColor: '#0553',
    },
    
});