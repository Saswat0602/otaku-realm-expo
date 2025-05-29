import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E100FF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false, // Hide tab labels
        tabBarBackground: () => (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFillObject}>
            <LinearGradient
              colors={['rgba(10,10,25,0.95)', 'rgba(20,20,45,0.95)', 'rgba(15,5,30,0.9)']}
              style={StyleSheet.absoluteFillObject}
            />
          </BlurView>
        ),
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
              borderTopWidth: 0,
              elevation: 0,
              height: 90,
              paddingBottom: 30,
              paddingTop: 10,
            },
            default: {
              borderTopWidth: 0,
              elevation: 0,
              height: 80,
              paddingTop: 8,
            },
          }),
          backgroundColor: 'transparent',
          borderTopColor: 'rgba(225,0,255,0.3)',
          shadowColor: '#E100FF',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={focused 
                  ? ['rgba(225,0,255,0.9)', 'rgba(150,0,200,0.8)', 'rgba(100,0,150,0.7)'] 
                  : ['rgba(255,255,255,0.15)', 'rgba(200,200,255,0.1)', 'rgba(150,150,200,0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, focused && styles.iconContainerActive]}
              >
                <Ionicons 
                  name="home" 
                  size={26} 
                  color={focused ? '#fff' : 'rgba(255,255,255,0.7)'} 
                  style={focused && styles.iconActive}
                />
                {focused && (
                  <View style={styles.glowEffect} />
                )}
              </LinearGradient>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Popular"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={focused 
                  ? ['rgba(225,0,255,0.9)', 'rgba(150,0,200,0.8)', 'rgba(100,0,150,0.7)'] 
                  : ['rgba(255,255,255,0.15)', 'rgba(200,200,255,0.1)', 'rgba(150,150,200,0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, focused && styles.iconContainerActive]}
              >
                <Ionicons 
                  name="flame" 
                  size={26} 
                  color={focused ? '#fff' : 'rgba(255,255,255,0.7)'} 
                  style={focused && styles.iconActive}
                />
                {focused && (
                  <View style={styles.glowEffect} />
                )}
              </LinearGradient>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={focused 
                  ? ['rgba(225,0,255,0.9)', 'rgba(150,0,200,0.8)', 'rgba(100,0,150,0.7)'] 
                  : ['rgba(255,255,255,0.15)', 'rgba(200,200,255,0.1)', 'rgba(150,150,200,0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, focused && styles.iconContainerActive]}
              >
                <Ionicons 
                  name="trending-up" 
                  size={26} 
                  color={focused ? '#fff' : 'rgba(255,255,255,0.7)'} 
                  style={focused && styles.iconActive}
                />
                {focused && (
                  <View style={styles.glowEffect} />
                )}
              </LinearGradient>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Top100"
        options={{
          title: 'Top 100',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={focused 
                  ? ['rgba(225,0,255,0.9)', 'rgba(150,0,200,0.8)', 'rgba(100,0,150,0.7)'] 
                  : ['rgba(255,255,255,0.15)', 'rgba(200,200,255,0.1)', 'rgba(150,150,200,0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, focused && styles.iconContainerActive]}
              >
                <Ionicons 
                  name="trophy" 
                  size={26} 
                  color={focused ? '#fff' : 'rgba(255,255,255,0.7)'} 
                  style={focused && styles.iconActive}
                />
                {focused && (
                  <View style={styles.glowEffect} />
                )}
              </LinearGradient>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainerActive: {
    transform: [{ scale: 1.15 }],
    shadowColor: '#E100FF',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    borderColor: 'rgba(225,0,255,0.4)',
    borderWidth: 2,
  },
  iconActive: {
    transform: [{ scale: 1.1 }],
  },
  glowEffect: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(225,0,255,0.2)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E100FF',
    shadowColor: '#E100FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
  },
});