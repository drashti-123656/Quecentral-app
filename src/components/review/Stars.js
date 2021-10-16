import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const Stars = ({ rating = 2 }) => {
    return (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Image
                tintColor={rating >= 1 ? '#FBB400' : '#a1a1a1'}
                source={require('../../assets/icons/stars.png')}
                style={styles.ratingsImage}
            />
            <Image
                tintColor={rating >= 2 ? '#FBB400' : '#a1a1a1'}
                source={require('../../assets/icons/stars.png')}
                style={styles.ratingsImage}
            />
            <Image
                tintColor={rating >= 3 ? '#FBB400' : '#a1a1a1'}
                source={require('../../assets/icons/stars.png')}
                style={styles.ratingsImage}
            />
            <Image
                tintColor={rating >= 4 ? '#FBB400' : '#a1a1a1'}
                source={require('../../assets/icons/stars.png')}
                style={styles.ratingsImage}
            />
            <Image
                tintColor={rating == 5 ? '#FBB400' : '#a1a1a1'}
                source={require('../../assets/icons/stars.png')}
                style={styles.ratingsImage}
            />
        </View>
    )
}

export default Stars

const styles = StyleSheet.create({
    ratingsImage: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
})
