import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios'; // Import Axios



export async function getRecentMyBooks() {
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
    const response = await axios.get(apiUrl+'/Account/student-books/4/' , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Assuming JSON content type
        // Add other headers if needed
      }
    });

   
    const mybooks = response.data; // Accessing response data directly
    return mybooks;
  } catch (error) {
    console.error('Error fetching recent mybooks:', error);
    throw error;
  }
}