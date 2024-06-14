import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import COLORS from './colors';
import Button from './Button';
import Input from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const UpdatePasswordScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({new_password: '', confirm_password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const userCreds = await AsyncStorage.getItem('userCreds');
        if (userCreds) {
          const { email, code } = JSON.parse(userCreds);
          setEmail(email);
          setCode(code);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve email from storage.');
      }
    };

    getEmailFromStorage();
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.new_password) {
      handleError('Please input new_password', 'new_password');
      isValid = false;
    }
    if (!inputs.confirm_password) {
      handleError('Please input confrim_password', 'confirm_password');
      isValid = false;
    }
    if (isValid) {
      UpdatePassword();
    }
  };

    const UpdatePassword = () => {
    setLoading(true);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const payload = { email, code, new_password: inputs.new_password, confirm_password: inputs.confirm_password };
    fetch(apiUrl+'/Account/password-reset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
      Alert.prompt('success', 'password updated successfully')
           navigation.navigate('LoginScreen')  
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
          Enter Your Password to Proceed 
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'new_password')}
            onFocus={() => handleError(null, 'new_password')}
            iconName="password-outline"
            label="New Password"
            placeholder="Enter your New Password"
            error={errors.new_password}
          />

            <Input
            onChangeText={text => handleOnchange(text, 'confirm_password')}
            onFocus={() => handleError(null, 'confirm_password')}
            iconName="confirm-password-outline"
            label="Confirm Password"
            placeholder="Enter your Confirm Password "
            error={errors.confirm_password}
          />
       
        <Button title="Password Reset" onPress={validate} />
      
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.grey,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            already have an account? Login
          </Text>
        
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;