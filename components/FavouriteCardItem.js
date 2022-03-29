import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FavouriteCardItem = props => {

    const width = Dimensions.get('window').width;

    const [isFavourite, setIsFavourite] = useState(props.isFavourite);

    const Stars = props => {
        let rating = props.rating;
        let disp = []

        for (var i = 1; i <= 5; i++) {
            let star = <Ionicon name="star" size={18} color="#F0E010" />
            if (i > rating) {
                star = <Ionicon name="star-outline" size={18} color="grey" />
            }
            disp.push(star);
        }

        return (<View style={{ flexDirection: 'row' }} >{disp}</View>)

    }

    return (
        <View style={styles.screen}>
            <View style={[...styles.container, ...{ width: width * 0.9 }]} >
                <Image source={{ uri: props.image }} style={styles.image} />
                <View style={styles.detailContainer}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                        <Text style={{ fontWeight: '800', marginTop: 3 }} >{props.address}</Text>
                        <Text style={{fontWeight: '800', marginTop: 3 }}>{props.price}</Text>
                        <View style={{ marginTop: 3 }} >
                            <Stars rating={props.rating} />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} >
                            {isFavourite ? <Ionicon name="heart" size={25} color="red" /> : <Ionicon name="heart-outline" size={25} color="grey" />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    container: { 
        height: 250, 
        margin: 20, 
        alignItems: 'center', 
        borderRadius: 25, 
        overflow: 'hidden' 
    },
    image: { 
        flex: 12, 
        height: 250, 
        width: '100%' 
    },
    detailContainer: { 
        flex: 3, 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20 }
});

export default FavouriteCardItem;