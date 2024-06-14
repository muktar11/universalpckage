import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AuthScreen from './AuthStack'; // Import your authentication stack
import Navigation from './Navigation'; // Import your main navigation stack
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if access token is available in AsyncStorage
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          if (userData.access_token) {
            setUserAuthenticated(true); // User is authenticated
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        Alert.alert('Error', 'An error occurred while checking authentication.');
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    checkAuthentication();
  }, []);

    if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return  <AuthScreen /> ;
}
