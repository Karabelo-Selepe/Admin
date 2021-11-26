import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth, } from '../Firebase';

import FloatingButton from '../components/FloatingButton';

const AdminDashboard = ({navigation, route}) => {

    const { adminEmail, adminUid } = route.params;
 
    const SignOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened
            alert('Somehing went wrong! : ' + error);
        });
    }
    
    return(
        <View style={styles.container}>
            <View style={{backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', height: '30%', }}>
                <Text style={{color: '#F02A4B', fontWeight: 'bold', fontSize: 40}}>Dashboard</Text>
            </View>
            <View style={{ paddingLeft: '22%', paddingTop: '20%', backgroundColor: '#F02A4B', height: '80%', borderRadius: 40}}>
                    
                    <TouchableOpacity  onPress={() => navigation.navigate('Bookings', {adminUid: adminUid})}>
                        <View style={styles.tbRoom} >
                            <MaterialCommunityIcons name="format-list-text" size={20} color='#FFF'/>
                            <Text style={{paddingLeft: '10%', color: '#FFF'}}>BOOKINGS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingTop: 10}} onPress={() => navigation.navigate('Rooms', {adminUid: adminUid, adminEmail: adminEmail})}>
                        <View style={styles.tbRoom} >
                            <MaterialCommunityIcons name="bed" size={20} color='#FFF'/>
                            <Text style={{paddingLeft: '10%', color: '#FFF'}}>ROOMS</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingTop: 10}} onPress={() => navigation.navigate('UpdateHotel', {adminUid: adminUid, adminEmail: adminEmail})}>
                        <View style={styles.tbRoom} >
                            <FontAwesome name="home" size={20} color='#FFF' />
                            <Text style={{paddingLeft: '10%', color: '#FFF'}}>HOTEL</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingTop: 10}} onPress={SignOut}>
                        <View style={styles.tbRoom} >
                            <MaterialCommunityIcons name="logout" size={20} color='#FFF' />
                            <Text style={{paddingLeft: '10%', color: '#FFF'}}>LOGOUT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  tbRoom: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 10,
    width: '75%',
    paddingLeft: '20%',
    paddingVertical: 20
  },
  row: {
    paddingLeft: 10,
  },
    text2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AdminDashboard;
