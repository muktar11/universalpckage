import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios'; // Import Axios


export async function getRecentCourses() {
  try {
    // Retrieve token from local storage

    const token = await AsyncStorage.getItem('userData');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    // Parse the token from the user data object
    const userData = JSON.parse(token);
    const accessToken = userData.access_token;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(apiUrl+'/Account/api/register/course', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });
   
    const courses = response.data; // Accessing response data directly
    return courses;
  } catch (error) {
    console.error('Error fetching recent courses:', error);
    throw error;
  }
}