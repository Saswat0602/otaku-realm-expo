import { useGetTrendingAnimeQuery } from '@/redux/api/animeApi';
import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TestScreen() {
  const { data, error, isLoading, isError } = useGetTrendingAnimeQuery({ page: 1 });

  // Log the state for debugging
  console.log('Test Screen State:', {
    data,
    error,
    isLoading,
    isError,
    token: Constants.expoConfig?.extra?.anilistToken ? 'Present' : 'Missing'
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading data</Text>
        <Text style={styles.text}>Error details: {JSON.stringify(error, null, 2)}</Text>
        <Text style={styles.text}>Token status: {Constants.expoConfig?.extra?.anilistToken ? 'Present' : 'Missing'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Test Screen</Text>
      <Text style={styles.text}>Token status: {Constants.expoConfig?.extra?.anilistToken ? 'Present' : 'Missing'}</Text>
      <Text style={styles.text}>Raw API Response:</Text>
      <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 18,
    marginBottom: 16,
  },
  dataText: {
    color: '#fff',
    fontFamily: 'monospace',
  },
}); 