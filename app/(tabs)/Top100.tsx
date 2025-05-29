import animeTop from '@/data/top100';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const Top100 = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Background */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A3E', '#2D1B69']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Floating Orbs Background */}
      <View style={styles.orbContainer}>
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </View>

      {/* Header with Glassmorphism */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.glassHeader}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerEmoji}>🏆</Text>
            <View>
              <Text style={styles.headerText}>Top 100 Anime</Text>
              <Text style={styles.subText}>Greatest of all time</Text>
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
          {animeTop.map((anime, index) => (
            <TouchableOpacity key={anime.id} activeOpacity={0.9}>
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                style={styles.card}
              >
                <View style={styles.rankContainer}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    style={styles.rankBadge}
                  >
                    <Text style={styles.rankNumber}>#{index + 1}</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.imageContainer}>
                  <Image source={{ uri: anime.image }} style={styles.image} />
                  <View style={styles.imageOverlay} />
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {anime.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.textWrapper}>
                  <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
                  <Text style={styles.genre}>{anime.genre}</Text>
                  <View style={styles.statsContainer}>
                    <View style={styles.scoreIndicator}>
                      <View style={styles.scoreBar} />
                      <Text style={styles.scoreText}>Top Rated</Text>
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

export default Top100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#FFD700',
    top: -100,
    right: -100,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: '#FFA500',
    bottom: -50,
    left: -50,
  },
  orb3: {
    width: 150,
    height: 150,
    backgroundColor: '#FF6B6B',
    top: '50%',
    right: -50,
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  glassHeader: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  listWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  rankContainer: {
    marginRight: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  genre: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBar: {
    width: 24,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginRight: 6,
  },
  scoreText: {
    fontSize: 11,
    color: '#FFD700',
    fontWeight: '600',
  },
  chevron: {
    padding: 8,
  },
  chevronText: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '300',
  },
});
