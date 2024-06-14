import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export async function getMyInstructor() {
  try {
    const token = await AsyncStorage.getItem('userData');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    // Parse the token from the user data object
    const userData = JSON.parse(token);
    const accessToken = userData.access_token;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(apiUrl+'/Account/api/access/teachers', {
      headers: {
         'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data; // Accessing response data directly
    return data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}

export default function Instructor() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        const data = await getMyInstructor();
        setProfiles(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getInstructorData();
  }, []);

  const toggleModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(!isModalVisible);
  };

    if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching profile data: {error.message}</Text>
      </View>
    );
  }

  if (!profiles.length) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {profiles.map((profile, index) => (
            <View key={index} style={styles.profileContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Instructor</Text>
              </View>
              <View style={styles.profile}>
                <Image
                  alt=""
                  source={{ uri: profile.profile_imageUrl }}
                  style={styles.profilepic}
                />
                <Text style={styles.profileName}>{`${profile.first_name} ${profile.last_name}`}</Text>
                <Text style={styles.profileEmail}>{profile.email}</Text>
                <Text style={styles.profilePhone}>{profile.phone}</Text>
               <Text style={styles.profilePhone}>{profile.bio}</Text>              


                <Text style={styles.profiletag}>Education Credential</Text>
                <TouchableOpacity onPress={() => toggleModal(profile.school_credentials_imageUrl)}>
                  <Image
                    alt=""
                    source={{ uri: profile.school_credentials_imageUrl }}
                    style={styles.profileAvatar}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={styles.contentFooter}>Universal Online University</Text>
        </View>
      </ScrollView>
      <Modal 
        isVisible={isModalVisible} 
        onBackdropPress={() => setModalVisible(false)} 
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Image
            alt="Zoomed Image"
            source={{ uri: selectedImage }}
            style={styles.zoomedImage}
          />
        </View>
      </Modal>
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
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 200,
    height: 360,
    borderRadius: 9,
  },
  profilepic: {
    width: 100,
    height: 100,
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
  profiletag: {
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
  modalContent: {
    flex: 1, // Allows the content to grow and fill the modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ff0000',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
  },
});