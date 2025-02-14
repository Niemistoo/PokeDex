import { TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"

export default function SearchBar({ criteria, setCriteria }) {

    return (
        <View style={styles.searchcontainer}>
            <TextInput
                placeholder='Pokemon name'
                value={criteria}
                onChangeText={text => setCriteria(text)}
                mode='outlined'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchcontainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    }

})