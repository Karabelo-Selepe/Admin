import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnimatedLottieView from 'lottie-react-native';

const AppLoader = () => {
    return (
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../assets/loading.json')} autoPlay loop />
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({      
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});

export default AppLoader;