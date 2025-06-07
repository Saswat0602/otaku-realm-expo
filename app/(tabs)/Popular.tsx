import { animeList, fanFavorites } from '@/data/popular'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

const Popular = () => {
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
              <Text style={styles.headerText}>Popular Anime</Text>
              <Text style={styles.subText}>Trending masterpieces</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>✨ Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={animeList}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.imageOverlay}
                  />
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.cardStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>🎬 {item.episodes} eps</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Fan Favorites Section */}
        <View style={styles.verticalSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💖 Fan Favorites</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {fanFavorites.map((anime, index) => (
            <TouchableOpacity key={anime.id} activeOpacity={0.9}>
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                style={[styles.verticalCard, { 
                  marginTop: index === 0 ? 0 : 16,
                  transform: [{ scale: 1 }] 
                }]}
              >
                <View style={styles.verticalImageContainer}>
                  <Image source={{ uri: anime.image }} style={styles.verticalImage} />
                  <View style={styles.verticalImageOverlay} />
                </View>
                <View style={styles.verticalTextContainer}>
                  <Text style={styles.verticalTitle} numberOfLines={1}>{anime.title}</Text>
                  <Text style={styles.verticalGenre}>{anime.genre}</Text>
                  <View style={styles.verticalStats}>
                    <View style={styles.popularityIndicator}>
                      <View style={styles.popularityBar} />
                      <Text style={styles.popularityText}>Trending</Text>
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
  )
}

export default Popular

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  orbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  orb: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.3,
  },
  orb1: {
    width: 200,
    height: 200,
    backgroundColor: '#FF6B6B',
    top: -100,
    right: -100,
  },
  orb2: {
    width: 150,
    height: 150,
    backgroundColor: '#4ECDC4',
    top: 200,
    left: -75,
  },
  orb3: {
    width: 120,
    height: 120,
    backgroundColor: '#45B7D1',
    bottom: 100,
    right: -60,
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
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAll: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    width: width * 0.65,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  cardStats: {
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  verticalSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  verticalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  verticalImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  verticalImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  verticalImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  verticalTextContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  verticalGenre: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    fontWeight: '500',
  },
  verticalStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityBar: {
    width: 24,
    height: 3,
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
    marginRight: 6,
  },
  popularityText: {
    fontSize: 11,
    color: '#4ECDC4',
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
})