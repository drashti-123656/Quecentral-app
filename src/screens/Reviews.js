import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReviewCard from './../components/cards/ReviewCard'
import { getReviews } from './../services/dashboard'

const Reviews = () => {
    const [reviewsData, setReviewsData] = useState([])

    useEffect(() => {
        fetchReviewData()
    }, [])

    const fetchReviewData = async () => {
        let response = await getReviews()
        console.log(response)
    }

    return (
        <View style={styles.container}>
            <ReviewCard />
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    }
})
