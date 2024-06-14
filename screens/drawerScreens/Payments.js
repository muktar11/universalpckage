import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Button,
  Image,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import Input from './Input.js';
import Buttons from './Button.js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
// Function to make API request




export async function fetchProfileData() {
  try {

    const token = await AsyncStorage.getItem('userData');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    // Parse the token from the user data object
    const userData = JSON.parse(token);
    const accessToken = userData.access_token;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    // Retrieve token from local storage
    const response = await axios.get(apiUrl+'/Account/api/students/profile/4/' , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });  
    const data = response.data; // Accessing response data directly
    console.log('data', data)
    return data;
  } catch (error) {
    console.error('Error fetching recent my profile:', error);
    throw error;
  }
}



const registerUser = async (email, new_password, confirmPassword) => {
  try {
    // Make your API request here, for example using fetch or axios
    const token = await AsyncStorage.getItem('userData');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    // Parse the token from the user data object
    const userData = JSON.parse(token);
    const accessToken = userData.access_token;

    const response = await fetch('https://ef19-196-189-29-108.ngrok-free.app/Account/reset-password/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        new_password: new_password,
        confirmPassword: confirmPassword,
      }),
    });
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export default  function  Payments() {

  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const [inputs, setInputs] = React.useState({
    email: '',
    new_password: '',
    confirmPassword: '', // Added confirm password
  });
  const [errors, setErrors] = React.useState({});

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOnchange = (value, fieldName) => {
    setInputs({
      ...inputs,
      [fieldName]: value,
    });
  };

  const handleError = (error, fieldName) => {
    setErrors({
      ...errors,
      [fieldName]: error,
    });
  };

  const handleRegister = () => {
    // Perform validation if needed

    // Call the API function with email, password, and confirm password
    registerUser(inputs.email, inputs.new_password, inputs.confirmPassword);
  };

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getProfileData = async () => {
        try {
          const data = await fetchProfileData();
          setProfile(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      getProfileData();
    }, []);

    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error fetching profile data: {error.message}</Text>;
    }

    if (!profile) {
      return <Text>No profile data available</Text>;
    }


   

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>

        
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <Image
              alt=""
              source={{ uri: profile.profile_imageUrl }}
              style={styles.profileAvatar} />

             <Text style={styles.profileName}>{`${profile.first_name} ${profile.last_name}`}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>

            <TouchableOpacity
              onPress={toggleModal}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit" size={16} />

                <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1, backgroundColor: "gray" }}>
            

              <Input
            onChangeText={text => handleOnchange(text, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

        
        
          <Input
            onChangeText={text => handleOnchange(text, 'new_password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.new_password}
            password
          />


<Input
            onChangeText={text => handleOnchange(text, 'confirmPassword')}
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Enter your password"
            error={errors.confirmPassword}
            password
          />

<Buttons title="Register"  onPress={handleRegister}/>
              <Button title="return" onPress={toggleModal} />
            </View>
      </Modal>
      
              </View>
            </TouchableOpacity>
          </View>
          {/*   <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="globe"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Language</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>English</Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="moon"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({ ...form, darkMode })}
                    value={form.darkMode} />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="navigation"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Los Angeles, CA</Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notifications</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="at-sign"
                        size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Email Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({ ...form, emailNotifications })
                      }
                      value={form.emailNotifications} />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="bell"
                        size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Push Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications} />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <View
                      style={[styles.rowIcon, { backgroundColor: '#FE3C30' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="music"
                        size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Sound</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>Default</Text>

                    <FeatherIcon
                      color="#C6C6C6"
                      name="chevron-right"
                      size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View> */}

         

          <Text style={styles.contentFooter}>Universal Online University  </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
   
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#929292',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
   
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    marginRight: 4,
  },
});