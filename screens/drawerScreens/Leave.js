import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Leave = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setIsAuthenticated(false);
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error clearing user data:', error);
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button
        title="Log Out"
        onPress={handleLogout}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    padding: 10,
  },
});

export default Leave;