import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AdminDashboard from './screens/AdminDashboard';
import AddHotel from './screens/AddHotel';

import { auth } from './Firebase';
import AddRoom from './screens/AddRoom';
import Dashboard from './screens/Dashboard';
import Bookings from './components/Bookings';
import Rooms from './components/Rooms';
import UpdateHotel from './components/UpdateHotel';

const Stack = createStackNavigator();

const myOptionsLogin = {
  headerStyle: {
    backgroundColor: '#FC6A03',
    height: 200,
    
  },
  headerTintColor: '#fff',
  title: 'LOGIN',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 28,
  }
};

const myOptionsSignUp = {
  headerStyle: {
    backgroundColor: '#FC6A03',
    height: 200,
  },
  headerTintColor: '#fff',
  title: 'REGISTER',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 28,
  }
};

function App() {

  const [admin, setAdmin] = useState('')

  // method to check if the user exists on the firebase auth
  useEffect(() => {
    const unregister = auth.onAuthStateChanged(adminExist => {
      if (adminExist) {
        setAdmin(adminExist);
      } else {
        setAdmin('')
      }
    })
    return () => {
      unregister();
    }
  }, [])

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {/* {admin?
          <>
            <Stack.Screen name='AddHotel' component={AddHotel}/>
            <Stack.Screen name='Dashboard' component={AdminDashboard} />
          </>
          :
          <>
            <Stack.Screen name='Login' component={Login} options={myOptionsLogin}/>
            <Stack.Screen name='Register' component={SignUp} options={myOptionsSignUp}/>    
          </>
        } */}
        
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name='AddHotel' component={AddHotel} options={{headerShown: false}}/>
          <Stack.Screen name='Dashboard' component={AdminDashboard} options={{headerShown: false}} />
          <Stack.Screen name='UpdateHotel' component={UpdateHotel} options={{headerShown: false}} />
          {/* <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}/> */}
          <Stack.Screen name='AddRoom' component={AddRoom} options={{headerShown: false}} />
          <Stack.Screen name='Bookings' component={Bookings} options={{headerShown: false}} />
          <Stack.Screen name='Rooms' component={Rooms} options={{headerShown: false}} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
