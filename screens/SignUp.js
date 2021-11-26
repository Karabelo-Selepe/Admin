import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';

import { auth, db } from '../Firebase';

const SignUp = ({navigation}) => {
    // ...
    const [showIndicator, setShowIncator] = useState(false)

    // ...
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
         
    const registerUser = () => {
        if(!names || !email || !mobile || !password) {
            alert('Please add all the fields!')
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                navigation.navigate('AddHotel', { uid: user.uid, adminEmail: user.email});

                return(
                    db.collection('admins').doc(user.email).set({
                        uid: user.uid,
                        names: names,
                        email: user.email,
                        mobile: mobile
                    })
                );
            }
        )
        .catch((error) => {
            alert('Something went wrong! : ' + error);
        });

        setShowIncator(true)
        setTimeout(() => {
            setShowIncator(false)
            //alert('Hotel Successfully Added!')
        }, 3000)
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#F02A4B', justifyContent: 'center', paddingLeft: '15%' , height: '35%', elevation: 5, borderRadius: 30}}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 40}}>REGISTER</Text>
                <Text style={{color: '#FFF', fontSize: 18}}>Register with a new email account</Text>
                <Text style={{color: '#FFF', fontSize: 18}}>account</Text>
            </View>
            <ScrollView>
                <View style={{marginTop: 20, backgroundColor: '#FFF', height: '77%', borderRadius: 30, }}>
                    <View style={styles.input} >
                        <Text style={{paddingRight: 220, fontSize: 16, color: '#F02A4B', padding:10}}>Full Names</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            placeholder='John Doe'
                            value={names}
                            onChangeText={names => setNames(names)}
                            color='#F02A4B'
                        />
                    </View>

                    <View style={styles.input} >
                        <Text style={{paddingRight: 200, fontSize: 16, color: '#F02A4B', padding:10}}>Email Address</Text>
                        <TextInput
                            style={styles.inputBox} 
                            placeholder='johndoe@mail.com'
                            value={email}
                            onChangeText={email => setEmail(email)}
                            color='#F02A4B'
                        />
                    </View>

                    <View style={styles.input} >
                        <Text style={{paddingRight: 250, fontSize: 16, color: '#F02A4B', padding:10}}>Mobile</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            placeholder='eg... 0781234567'
                            value={mobile}
                            onChangeText={mobile => setMobile(mobile)}
                            color='#F02A4B'
                        />
                    </View>

                                <View style={styles.input} >
                                    <Text style={{paddingRight: 220, fontSize: 16, color: '#F02A4B', padding:10}}>Password</Text>
                                    <TextInput 
                                        style={styles.inputBox} 
                                        placeholder='123456789' 
                                        value={password}
                                        onChangeText={password => setPassword(password)}
                                        secureTextEntry
                                        color='#F02A4B'
                                    />
                                </View>
                                
                            </View>
                            
                            <View style={{}}>
                                {!showIndicator ?
                                    <TouchableOpacity style={styles.touch1} onPress={registerUser}>
                                        <Text style={styles.text2}>REGISTER</Text>
                                    </TouchableOpacity>
                                :
                                    <ActivityIndicator size='large' color='#F02A4B' />
                                }

                                <View style={{flexDirection: 'row', paddingLeft: 80, paddingBottom: 30, padding:10}}>
                                    <Text style={{color: '#000', fontSize: 16}}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                                        <Text style={{color: '#F02A4B', fontSize: 16}}>LOGIN</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
            </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  input: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputBox: {
        width: '80%',
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

export default SignUp;
