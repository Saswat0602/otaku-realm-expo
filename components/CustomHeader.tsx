import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
}

export default function CustomHeader({ title, subtitle }: CustomHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerWrapper}>
      <BlurView intensity={30} tint="dark" style={styles.headerBlur}>
        <LinearGradient
          colors={['rgba(15,15,35,0.8)', 'rgba(15,15,35,0.6)']}
          style={styles.headerContainer}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => router.push('/')}
              style={styles.backButton}
            >
              <BlurView intensity={40} tint="dark" style={styles.backButtonBlur}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </BlurView>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>{title}</Text>
              {subtitle && <Text style={styles.headerSubtext}>{subtitle}</Text>}
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerBlur: {
    overflow: 'hidden',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  titleContainer: {
    flex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  headerSubtext: {
    color: '#A0A0B0',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 