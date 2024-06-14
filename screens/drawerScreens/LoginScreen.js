import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import COLORS from './colors';
import Button from './Button';
import Input from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../AuthContext';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
        const tokenString = await AsyncStorage.getItem('userData');
        if (tokenString) {
          setIsAuthenticated(true)
      } 
    };
    checkToken();
  }, []);


  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    fetch(apiUrl+'/Account/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
    .then(response => {
      setLoading(false);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      // Assuming your API returns access_token, first_name, and last_name
      // You can handle the response data accordingly
      if (data.access) {
        const userData = {
          access_token: data.access,
          first_name: data.first_name,
          last_name: data.last_name,
          id: data.id,
          loggedIn: true,
        };
       AsyncStorage.setItem('userData', JSON.stringify(userData)).then(() => {
           setIsAuthenticated(true);
        });
      // Call setLoggedIn to indicate user is logged in
      
      } else {
        Alert.alert('Error', 'Invalid Details');
      }
    })
    .catch(error => {
      setLoading(false);
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred, please try again.');
    });
  };
  
  

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
        Universal 
        </Text>
        <Text style={{color: COLORS.black, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.grey,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have an account? Register
          </Text>
          <Text
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            style={{
              color: COLORS.grey,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Forgot Password
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;