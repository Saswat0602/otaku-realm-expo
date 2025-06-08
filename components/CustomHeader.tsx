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
    <LinearGradient
      colors={['#0F0F23', 'rgba(15,15,35,0.9)']}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity 
          onPress={() => router.push('/')}
          style={styles.backButton}
        >
          <BlurView intensity={20} tint="dark" style={styles.backButtonBlur}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </BlurView>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtext}>{subtitle}</Text>}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  },
  titleContainer: {
    flex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtext: {
    color: '#A0A0B0',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
}); 