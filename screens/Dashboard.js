import React from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { FloatingAction } from "react-native-floating-action";

import Bookings from '../components/Bookings';
import Rooms from '../components/Rooms';

const BookingsRoute = () => (
  <View style={{ flex: 1}}>
      <Bookings/>
  </View>
);

const RoomsRoute = () => (
  <View style={{ flex: 1}}>
      <Rooms/>
  </View>
);

const renderScene = SceneMap({
  bookings: BookingsRoute,
  rooms: RoomsRoute,
});

const Dashboard = ({navigation}) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'bookings', title: 'Bookings' },
        { key: 'rooms', title: 'Rooms' },
    ]);

    return (
        <View style={{flex:1, marginTop: 30,}}>
            <Text> Welcome </Text>
            <View style={{backgroundColor: '#F02A4B', width: 50, height: 50, borderRadius: 50 / 2, bottom: -70, left: 280}} >
                <TouchableOpacity onPress={() => navigation.navigate('AddRoom')} >
                    <Text style={{color: '#FFF', fontSize: 28, left: 18, top: 7}}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 100,
  },
});

export default Dashboard;
