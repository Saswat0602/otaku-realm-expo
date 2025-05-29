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
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFillObject}>
            <LinearGradient
              colors={['rgba(10,10,25,0.98)', 'rgba(20,20,45,0.97)', 'rgba(15,5,30,0.95)']}
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
              height: 85,
              paddingBottom: 25,
              paddingTop: 8,
            },
            default: {
              borderTopWidth: 0,
              elevation: 0,
              height: 75,
              paddingTop: 6,
            },
          }),
          backgroundColor: 'transparent',
          borderTopColor: 'rgba(225,0,255,0.2)',
          shadowColor: '#E100FF',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
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
                  ? [
                      'rgba(225,0,255,0.95)',  // Bright purple
                      'rgba(180,0,230,0.9)',   // Medium purple
                      'rgba(130,0,180,0.85)',  // Deep purple
                      'rgba(100,0,150,0.8)',   // Dark purple
                      'rgba(225,0,255,0.95)',  // Back to bright purple for smooth loop
                    ] 
                  : ['rgba(255,255,255,0.12)', 'rgba(200,200,255,0.08)', 'rgba(150,150,200,0.04)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={focused ? [0, 0.3, 0.6, 0.8, 1] : undefined}
                style={[
                  styles.iconContainer, 
                  focused && styles.iconContainerActive,
                  focused && {
                    borderWidth: 1.5,
                    borderColor: 'rgba(225,0,255,0.4)',
                    shadowColor: '#E100FF',
                    shadowOpacity: 0.6,
                    shadowRadius: 12,
                    elevation: 8,
                  }
                ]}
              >
                <Ionicons 
                  name="home" 
                  size={22} 
                  color={focused ? '#fff' : 'rgba(255,255,255,0.6)'} 
                  style={[
                    focused && styles.iconActive,
                    focused && {
                      textShadowColor: 'rgba(225,0,255,0.5)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 10,
                    }
                  ]}
                />
                {focused && (
                  <>
                    <View style={styles.glowEffect} />
                    <View style={styles.innerGlow} />
                  </>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  iconContainerActive: {
    transform: [{ scale: 1.12 }],
    shadowColor: '#E100FF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderColor: 'rgba(225,0,255,0.3)',
    borderWidth: 1.5,
  },
  iconActive: {
    transform: [{ scale: 1.08 }],
  },
  glowEffect: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: 'rgba(225,0,255,0.15)',
    top: -7.5,
    left: -7.5,
    zIndex: -1,
  },
  innerGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(225,0,255,0.2)',
    top: 5,
    left: 5,
    zIndex: -1,
    shadowColor: '#E100FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E100FF',
    shadowColor: '#E100FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
});