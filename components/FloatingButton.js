import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react'
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { FAB } from 'react-native-paper';

export default class FloatingButton extends React.Component {

    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation, {
            toValue, 
            friction: 5
        }).start();

        this.open = !this.open;
    }

    render() {
        const pinStyle = {
            transform: [
                { 
                    scale: this.animation 
                },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -80],
                    })
                }
            ]
        };

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        };

        return (
            <View style={styles.container}>
                <FAB
                    style={styles.fab}
                    icon='plus'

                />

                <TouchableWithoutFeedback>
                    <Animated.View style={{...styles.button, ...styles.secondary, pinStyle}}>
                        <Ionicons name='bed-sharp' size={16} color='#F02A4B' />
                    </Animated.View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback>
                    <Animated.View style={{...styles.button, ...styles.secondary}}>
                        <Ionicons name='bed-sharp' size={16} color='#F02A4B' />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={{...styles.button, ...styles.secondary}}>
                        <Ionicons name='bed-sharp' size={16} color='#F02A4B' />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={{...styles.button, ...styles.menu, rotation}}>
                        <AntDesign name='plus' size={20} color='#FFF' />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 100, 
    },
    button: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        backgroundColor: '#F02A4B',
        left: 160,
    }, 
    secondary: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#FFF',
        left: 165,
        marginTop: 5
    }
});

