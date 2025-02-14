import { TextInput } from "react-native-paper"
import { View } from "react-native"

export default function SearchBar({ styles, criteria, setCriteria }) {

    return (
        <View style={styles.searchcontainer}>
            <TextInput style={styles}
                placeholder='Pokemon name'
                value={criteria}
                onChangeText={text => setCriteria(text)}
                mode='outlined'
            />
        </View>
    )
}