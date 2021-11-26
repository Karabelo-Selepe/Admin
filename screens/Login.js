import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { auth } from '../Firebase';

const Login = ({navigation}) => {
    // ...
    const [showIndicator, setShowIncator] = useState(false)

    // ...
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        if(!email || !password) {
            alert('Please add all the fields!')
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed In
                const user = userCredential.user;
                navigation.navigate('Dashboard', {adminUid: user.uid})

                console.log('User signed in! : ' , user.email) // Checking if it works
            })
            .catch((error) => {
                alert('Something went wron! : ' + error);
            });

        setShowIncator(true)
        setTimeout(() => {
            setShowIncator(false)
            alert('You Successfully Logged!')
        }, 3000)
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#F02A4B', justifyContent: 'center', paddingLeft: '15%' , height: '35%', elevation: 5}}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 40}}>LOGIN</Text>
                <Text style={{color: '#FFF', fontSize: 18}}>Login with a created Admin account</Text>
                <Text style={{color: '#FFF', fontSize: 18}}>account</Text>
            </View>
            <View style={{backgroundColor: '#FFF', height: '100%', borderRadius: 30, }} >
                {/* <View style={{marginTop: 40}}> */}
                <View style={styles.input} >
                    <Text style={{paddingRight: 200, fontSize: 16, color: '#F02A4B', padding:10}}>Email Address</Text>
                    <TextInput 
                        style={styles.inputBox} 
                        color='#F02A4B'
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                </View>

                <View style={styles.input} >
                    <Text style={{paddingRight: 230, fontSize: 16, color: '#F02A4B', padding:10}}>Password</Text>
                    <TextInput 
                        style={styles.inputBox}  
                        color='#F02A4B'
                        value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry
                    />
                </View>
            {/* </View> */}
            <View style={{paddingTop: '20%'}}>
                    {!showIndicator ? 
                        <TouchableOpacity style={styles.touch1} onPress={loginUser}>
                            <Text style={styles.text2}>LOGIN</Text>
                        </TouchableOpacity>
                    :
                        <ActivityIndicator size='large' color='#F02A4B' />
                    }

                    <View style={{flexDirection: 'row', paddingLeft: 80, paddingTop: 10}}>
                        <Text style={{color: '#000', fontSize: 16}}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('Register')}>
                            <Text style={{color: '#F02A4B', fontSize: 16}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F02A4B',
    width: '100%',
    height: '100%',
  },
  input: {
      marginTop: '10%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputBox: {
        width: '85%',
        borderBottomWidth: 1,
        height: 50,
        borderColor: '#F02A4B',
        paddingLeft: 15,
    },
    touch1: {
        backgroundColor: '#F02A4B',
        width: 220,
        borderRadius: 20,
        padding: 15,
        marginLeft: 70,
    },
    text2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
