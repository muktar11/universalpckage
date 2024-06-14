import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import COLORS from './colors';
import Button from './Button';
import Input from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const ForgotPasswordScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (isValid) {
      passwordreset();
    }
  };

   const passwordreset = () => {
    setLoading(true);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    

    fetch(`https://1dcd-196-189-29-219.ngrok-free.app/Account/password-reset-request/`, {
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
        if (data.email) {
          const userCred = {
            email: data.email,
          };
          AsyncStorage.setItem('userCred', JSON.stringify(userCred)).then(() => {
            navigation.navigate('ResetCodeScreen');
          });
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
          Enter Your Emails to Proceed 
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

export default ForgotPasswordScreen;