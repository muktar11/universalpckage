import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios'; // Import Axios
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";

export async function getRecentMyReceipt() {
  try {
     const token = await AsyncStorage.getItem('userData');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    // Parse the token from the user data object
    const userData = JSON.parse(token);
    const accessToken = userData.access_token;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(apiUrl+'/Account/student-receipt/4/' , {
      headers: {
         'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Assuming JSON content type
      
      }
    });

    const receipts = response.data; // Accessing response data directly
    return receipts;
  } catch (error) {
    console.error('Error fetching recent my receipt:', error);
    throw error;
  }
}

const PaymentInfo = () => {
  const [receipts, setReceipts] = useState([]);
  const theme = useColorScheme();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const recentReceipts = await getRecentMyReceipt();
        setReceipts(recentReceipts);
      } catch (error) {
        console.error('Error fetching receipt:', error);
      }
    };

    fetchReceipt();
  }, []);

  const GrayText = ({ children, numberOfLines, style }) => (
    <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );

  return (
    <View style={styles.container}>
      {receipts.length > 0 ? (
        receipts.map((receipt, index) => (
          <View key={index} style={styles.singleItem}>
            <View style={styles.row}>
              <View style={styles.tweetContentContainer}>
              <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
                
                 CheckoutRequestID
  
              </Text>
             
              <GrayText>{receipt.CheckoutRequestID}·</GrayText>
              
            </View>
             <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
                      MerchantRequestID
  
              </Text>
             
              <GrayText>{receipt.MerchantRequestID}·</GrayText>
              
            </View>
             <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
                      
        ResultDesc
                  </Text>
             
              <GrayText>{receipt.ResultDesc}·</GrayText>
              
            </View>

              <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
       
        Amount
       

              </Text>
             
              <GrayText>{receipt.Amount}·</GrayText>
              
            </View>

              <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
        MpesaReceiptNumber
              </Text>
             
              <GrayText>{receipt.MpesaReceiptNumber}·</GrayText>
              
            </View>

              <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
                
        TransactionDate
              </Text>
             
              <GrayText>{receipt.TransactionDate}·</GrayText>
              
            </View>

              <View style={styles.rowTop}>
              <Text
                numberOfLines={1}
                style={[
                  styles.header,
                  { color: theme === "dark" ? "#FFF" : "#000" },
                ]}
              >
                     
        PhoneNumber
              </Text>
             
              <GrayText>{receipt.PhoneNumber}·</GrayText>
              
            </View>



           
            <Text
              style={[
                styles.description,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              
            </Text>

          </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noReceiptText}>No receipts available</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    padding: 16,
  },
  singleItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tweetContentContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
  },
  gray: {
    color: '#888',
  },
  noReceiptText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentInfo;
