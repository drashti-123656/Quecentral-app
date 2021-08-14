import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux'
import { COLORS } from './../../utils/theme'
import { logout } from '../../redux/actions/auth'



const Logout = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(logout())
    }, [])

    return (
     <View style={styles.container}>
        <ActivityIndicator color={COLORS.PRIMARY}/>

     </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    icons: {
        width: 40,
        height: 40,
    },

});

export default Logout