import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth, } from '../Firebase';

const Bookings = () => {

    // ... querying a list of bookings from firestore
    const [bookings, setBookings] = useState(null);

    const getBookings = async () => {
        const admin = auth?.currentUser?.uid;

        const querySnap = await db.collection('bookings').where('adminUid', '==', admin).get();
        const allBookings = querySnap.docs.map(docSnap => docSnap.data())

        setBookings(allBookings);
    }
    useEffect(() => {
        getBookings();
    },[])

    return (
       <View style={styles.container}>
            <View >
                <View style={{backgroundColor: '#BB8A52', justifyContent: 'center', alignItems: 'center', height: '30%'}}>
                <Text>Bookings</Text>
            </View>
                <View style={{padding: 20}}>
                    <FlatList
                        data={bookings}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return(
                                <SafeAreaView style={{flex: 1}}>
                                    <ScrollView>
                                        <TouchableOpacity onPress={() => ('')}>
                                            <View style={styles.tbRoom}>
                                                <Image 
                                                    source={{uri: 'https://a.mktgcdn.com/p/1IxJ3Gktr3qc9MM8x9yjuw_W6lo0VM3PNXYwXRSyjIc/2048x1366.jpg'}}
                                                    style={{height: 75, width: 100, borderRadius: 10}}
                                                />
                                                <View style={styles.row}>
                                                    <Text style={{color: '#F02A4B', fontWeight: 'bold'}}>{item.roomName}</Text>
                                                    <Text style={{color: '#F02A4B'}}>Adults: {item.adults}</Text>  
                                                    <Text style={{color: '#F02A4B'}}>Children: {item.children}</Text>  
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </SafeAreaView>     
                            ); 
                        }}
                    />
                </View>
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
    borderColor: '#F02A4B',
    borderRadius: 10,
    width: '100%',
  },
  row: {
    paddingLeft: 10,
  },
});

export default Bookings;


