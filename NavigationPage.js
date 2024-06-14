import React from 'react';
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerGroup from './DrawerGroup';

const Drawer = createDrawerNavigator();

export default function NavigationPage() {
  const theme = useColorScheme();

  return (
    
    <DrawerGroup />
  );
}