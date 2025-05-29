import trendingAnime from '@/data/trending';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Trending = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Background */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A3E', '#2D1B69']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header with Glassmorphism */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.glassHeader}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerEmoji}>🔥</Text>
            <View>
              <Text style={styles.headerText}>Trending Anime</Text>
              <Text style={styles.subText}>Last 6 Months</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.listWrapper}>
          {trendingAnime.map((anime, index) => (
            <TouchableOpacity key={anime.id} activeOpacity={0.9}>
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                style={styles.card}
              >
                <View style={styles.rankContainer}>
                  <LinearGradient
                    colors={['#f43f5e', '#8b5cf6']}
                    style={styles.rankBadge}
                  >
                    <Text style={styles.rankNumber}>#{index + 1}</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.imageContainer}>
                  <Image source={{ uri: anime.image }} style={styles.image} />
                  <View style={styles.imageOverlay} />
                  <View style={styles.trendingBadge}>
                    <Text style={styles.trendingText}>🔥 HOT</Text>
                  </View>
                </View>
                
                <View style={styles.textWrapper}>
                  <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
                  <Text style={styles.genre}>{anime.genre}</Text>
                  <View style={styles.statsContainer}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>⭐ {anime.rating}</Text>
                    </View>
                    <View style={styles.trendIndicator}>
                      <View style={styles.trendBar} />
                      <Text style={styles.trendText}>Trending</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.chevron}>
                  <Text style={styles.chevronText}>›</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  glassHeader: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subText: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    fontSize: 14,
    fontWeight: '500',
  },
  listWrapper: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
  },
  rankContainer: {
    marginRight: 16,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(244,63,94,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backdropFilter: 'blur(10px)',
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendBar: {
    width: 20,
    height: 3,
    backgroundColor: '#f43f5e',
    borderRadius: 2,
    marginRight: 6,
  },
  trendText: {
    fontSize: 11,
    color: '#f43f5e',
    fontWeight: '600',
  },
  chevron: {
    padding: 8,
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '300',
  },
});