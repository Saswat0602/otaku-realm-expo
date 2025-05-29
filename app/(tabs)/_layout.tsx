import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFD700',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(15,15,35,0.95)', 'rgba(26,26,62,0.95)']}
            style={StyleSheet.absoluteFillObject}
          />
        ),
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
              borderTopWidth: 0,
              elevation: 0,
              height: 80,
              paddingBottom: 20,
            },
            default: {
              borderTopWidth: 0,
              elevation: 0,
              height: 70,
            },
          }),
          backgroundColor: 'transparent',
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FFD700', '#FFA500'] : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.iconContainer}
            >
              <Ionicons name="home" size={24} color={focused ? '#000' : '#fff'} />
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="Popular"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FFD700', '#FFA500'] : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.iconContainer}
            >
              <Ionicons name="flame" size={24} color={focused ? '#000' : '#fff'} />
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="Trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FFD700', '#FFA500'] : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.iconContainer}
            >
              <Ionicons name="trending-up" size={24} color={focused ? '#000' : '#fff'} />
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="Top100"
        options={{
          title: 'Top 100',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FFD700', '#FFA500'] : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.iconContainer}
            >
              <Ionicons name="trophy" size={24} color={focused ? '#000' : '#fff'} />
            </LinearGradient>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
});
