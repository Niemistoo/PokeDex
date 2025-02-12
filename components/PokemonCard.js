import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Image } from "expo-image"

export default function PokemonCard({ pokemon }) {
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const typeColors = {
        bug: '#729f3f',
        dragon: '#f16e57',
        electric: '#eed535',
        fairy: '#fdb9e9',
        fighting: '#d56723',
        fire: '#fd7d24',
        flying: '#92d4e7',
        ghost: '#7b62a3',
        grass: '#9bcc50',
        ground: '#ab9842',
        ice: '#51c4e7',
        normal: '#a4acaf',
        poison: '#b97fc9',
        psychic: '#f366b9',
        rock: '#a38c21',
        steel: '#9eb7b8',
        water: '#4592c4',
    }

    if (pokemon) {
        return (
            <View style={styles.card} >
                <Image
                    style={styles.image}
                    source={{ uri: pokemon.img_src }}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.id}># {pokemon.id}</Text>
                <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
                <View style={styles.typecontainer}>
                    {pokemon.types &&
                        pokemon.types.map((type, index) => {
                            const backgroundColor = typeColors[type] || '#ffffff';
                            return (
                                <Text style={[styles.type, { backgroundColor }]} key={index}>{type}</Text>
                            )
                        })}
                </View>
                <Text style={styles.data}></Text>
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
        borderWidth: 5,
        borderColor: 'black',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#0553',
    },
    id: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 40
    },
    typecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    type: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: 'green',
        minWidth: 80,
    }
});