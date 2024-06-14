
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
    const profile = response.data; // Accessing response data directly
    console.log('data', data)
    return profile;
  } catch (error) {
    console.error('Error fetching recent my profile:', error);
    throw error;
  }
}


