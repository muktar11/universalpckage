import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {  useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import COLORS from './colors';
import Input from './Input';
import Loader from './Loader';
import Buttons from './Button';
import PhoneInput from "react-native-phone-number-input";
import * as ImagePicker from "expo-image-picker"; 
import { useNavigation } from '@react-navigation/native';


const RegistrationScreen = ({setIsAuthenticated}) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    sales_person_id: '',
    address: '',
    password: '',
    password2: '',
  });
  const [profile_imageUrl, setProfile_ImageUrl] = useState([]);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
 
    useEffect(() => {
    const checkToken = async () => {
        const tokenString = await AsyncStorage.getItem('userData');
        if (tokenString) {
          setIsAuthenticated(true)
      } 
    };
    checkToken();
  }, []);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.first_name) {
      handleError('Please input first_name', 'first_name');
      isValid = false;
    }

    if (!inputs.last_name) {
      handleError('Please input last_name', 'last_name');
      isValid = false;
    }

    if (!inputs.address) {
      handleError('Please input address', 'address');
      isValid = false;
    }


    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (!inputs.password2) {
      handleError('Please confirm password', 'password2');
      isValid = false;
    } else if (inputs.password !== inputs.password2) {
      handleError('Passwords do not match', 'password2');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    const updatedInputs = { ...inputs, phone: value };
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    setLoading(true);
    fetch(apiUrl+'/Account/api/register/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInputs),
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
      } else {
        // Registration failed
        Alert.alert('Error', 'User registration failed. Please check your details and try again.');
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

 

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const pickImage = async () => {
    // Request permission to access media library  
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const uriParts = uri.split('/');
      const filename = uriParts[uriParts.length - 1];
      
      setImage(uri);
      setImageName(filename);
    }

  };

 
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Universal
        </Text>
        <Text style={{color: COLORS.black, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
        <Input
            onChangeText={text => handleOnchange(text, 'first_name')}
            onFocus={() => handleError(null, 'first_name')}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your First Name"
            error={errors.first_name}
          />

<Input
            onChangeText={text => handleOnchange(text, 'last_name')}
            onFocus={() => handleError(null, 'last_name')}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.last_name}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

<PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            onChangeFormattedText={(text) => {
              setValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />



<Input
            onChangeText={text => handleOnchange(text, 'address')}
            onFocus={() => handleError(null, 'address')}
            iconName="account-outline"
            label="Address"
            placeholder="Enter your Adress"
            error={errors.address}
          />

    <Input
            onChangeText={text => handleOnchange(text, 'sales_person_id')}
            onFocus={() => handleError(null, 'sales_person_id')}
            iconName="account-outline"
            label="SPID (opitional)"
            placeholder="Enter your SPID"
            error={errors.sales_person_id}
          />

    <View style={styles.container}> 
 
            {/* Button to choose an image */} 
            <TouchableOpacity style={styles.button} 
                onPress={pickImage}> 
                <Text style={styles.buttonText}> 
                    Profile Pic
                </Text> 
            </TouchableOpacity> 
           {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 9999, }} />
          
        </>
      )}
        </View> 


        
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

<Input
            onChangeText={text => handleOnchange(text, 'password2')}
            onFocus={() => handleError(null, 'password2')}
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Confirm password"
            error={errors.password2}
            password
          /> 
         <Buttons title="Register" onPress={validate}/>
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.grey,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 16, 
    }, 
    header: { 
        fontSize: 20, 
        marginBottom: 16, 
    }, 
    button: { 
        backgroundColor: "#007AFF", 
        padding: 10, 
        borderRadius: 8, 
        marginBottom: 16, 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4, 
        elevation: 5, 
    }, 
    buttonText: { 
        color: "#FFFFFF", 
        fontSize: 16, 
        fontWeight: "bold", 
    }, 
    imageContainer: { 
        borderRadius: 8, 
        marginBottom: 16, 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4, 
        elevation: 5, 
    }, 
    image: { 
        width: 200, 
        height: 200, 
        borderRadius: 8, 
    }, 
    errorText: { 
        color: "red", 
        marginTop: 16, 
    }, 
});
