import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import COLORS from './colors';
import Button from './Button';
import Input from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const ResetPasswordCodeScreen = ({navigation}) => {
  const [code, setCode] = React.useState('');
  const [inputs, setInputs] = React.useState({code: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const userCred = await AsyncStorage.getItem('userCred');
        if (userCred) {
          const { email } = JSON.parse(userCred);
          setEmail(email);
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
    if (!inputs.code) {
      handleError('Please input verification code', 'code');
      isValid = false;
    }
    if (isValid) {
      passwordresetcode();
    }
  };

  

   const passwordresetcode = () => {
    setLoading(true);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const payload = { email, code: inputs.code }; // Use inputs.code here
    fetch('https://1dcd-196-189-29-219.ngrok-free.app/Account/code-verification/', {
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
      if (data.email) {
        const userCreds = {
          email: data.email,
          code: data.code,
        };
       AsyncStorage.setItem('userCreds', JSON.stringify(userCreds)).then(() => {
           navigation.navigate('UpdatePasswordScreen')
        })
        ;
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
          Enter Your Verification Codes to Proceed 
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'code')}
            onFocus={() => handleError(null, 'code')}
            iconName="code_outline"
            label="code"
            placeholder="Enter your verification code"
            error={errors.code}
          />
       
          <Button title="Security Code validate"  onPress={validate}/>
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

export default ResetPasswordCodeScreen;