import { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLOR from './color';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({setIsAuthenticated }) => {
    const navigation = useNavigation();    
    useEffect(() => {
    const checkToken = async () => {
        const tokenString = await AsyncStorage.getItem('userData');
        if (tokenString) {
           AsyncStorage.setItem('userData', JSON.stringify(userData)).then(() => {
           setIsAuthenticated(true);
        });
      } 
    };
        checkToken();
    }, []);

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLOR.secondary, COLOR.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../assets/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../assets/hero3.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../assets/hero3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../assets/hero2.jpg")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLOR.black
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLOR.black
                    }}>Started</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLOR.grey,
                            marginVertical: 4
                        }}>Join Universal Today!</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLOR.grey,
                        }}>Enhance your skills with Online Education</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={() => navigation.navigate("LoginScreen")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLOR.black
                        }}>Dont have an account?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("RegistrationScreen")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLOR.black,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}> Register </Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome