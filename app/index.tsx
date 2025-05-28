import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const topSearches = [
  "One Piece", "Attack on Titan", "Death Note", 
  "Solo Leveling", "Bleach", "Fire Force"
];

export default function IndexScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
    //   router.push(`/anime/filter?search=${encodeURIComponent(searchQuery.trim())}` as any);
    }
  };

  const handleTopSearchClick = (title: string) => {
    setSearchQuery(title);
    // router.push(`/anime/filter?search=${encodeURIComponent(title)}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Otaku.<Text style={styles.titleAccent}>Realm</Text>
          </Text>
          <Text style={styles.subtitle}>
            Discover your next favorite anime adventure
          </Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              placeholder="Search anime, manga..."
              placeholderTextColor="#9CA3AF"
              returnKeyType="search"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeader}>
            <Ionicons name="trending-up" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.trendingLabel}>Trending Now</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {topSearches.map((title, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => handleTopSearchClick(title)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)/Home')}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={18} color="white" />
            <Text style={styles.primaryButtonText}>Explore Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            // onPress={() => router.push('/watchlist' as any)}
            activeOpacity={0.8}
          >
            <Ionicons name="star-outline" size={18} color="#667eea" />
            <Text style={styles.secondaryButtonText}>My Watchlist</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Anime Cards - Floating Animation */}
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>Popular This Week</Text>
          <View style={styles.cardsContainer}>
            <View style={[styles.floatingCard, styles.card1]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
                style={styles.cardGradient}
              >
                <Ionicons name="flame" size={24} color="#FF6B6B" />
                <Text style={styles.cardTitle}>One Piece</Text>
                <Text style={styles.cardRating}>⭐ 9.2</Text>
              </LinearGradient>
            </View>
            
            <View style={[styles.floatingCard, styles.card2]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
                style={styles.cardGradient}
              >
                <Ionicons name="flash" size={24} color="#4ECDC4" />
                <Text style={styles.cardTitle}>Attack on Titan</Text>
                <Text style={styles.cardRating}>⭐ 9.0</Text>
              </LinearGradient>
            </View>
            
            <View style={[styles.floatingCard, styles.card3]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
                style={styles.cardGradient}
              >
                <Ionicons name="skull" size={24} color="#FF8A80" />
                <Text style={styles.cardTitle}>Death Note</Text>
                <Text style={styles.cardRating}>⭐ 9.1</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Anime</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Streaming</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  titleAccent: {
    color: '#FFD700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    marginRight: 12,
  },
  searchButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 18,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  trendingSection: {
    marginBottom: 40,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  trendingLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tagText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  ctaSection: {
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: '600',
  },
  featuredSection: {
    marginBottom: 32,
  },
  featuredTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 100,
  },
  floatingCard: {
    width: width * 0.25,
    height: 85,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  card1: {
    transform: [{ translateY: 0 }, { rotate: '-5deg' }],
  },
  card2: {
    transform: [{ translateY: -10 }, { rotate: '2deg' }],
  },
  card3: {
    transform: [{ translateY: 5 }, { rotate: '8deg' }],
  },
  cardGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  cardRating: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '700',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});