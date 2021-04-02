import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SQLite from 'expo-sqlite';
import MyCollection from './scripts/CollectionScreen.js'
import AddWine from './scripts/AddWineScreen.js'