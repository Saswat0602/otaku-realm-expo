import homeAnimeData from "@/data/home";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
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
            <Text style={styles.headerEmoji}>🎌</Text>
            <View>
              <Text style={styles.headerText}>Otaku.Realm</Text>
              <Text style={styles.subHeaderText}>Epic anime worlds await</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Popular Anime Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Popular Anime</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={homeAnimeData}
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
                    <Text style={styles.statLabel}>🎬 {item.episodes} eps</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Top Rated Section */}
        <View style={styles.topRatedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🌟 Top Rated</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {homeAnimeData.map((anime, index) => (
            <TouchableOpacity key={anime.id} activeOpacity={0.9}>
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                style={[styles.topRatedCard, { 
                  marginTop: index === 0 ? 0 : 16,
                }]}
              >
                <View style={styles.rankContainer}>
                  <Text style={styles.rankNumber}>#{index + 1}</Text>
                </View>
                <View style={styles.topRatedImageContainer}>
                  <Image source={{ uri: anime.image }} style={styles.topRatedImage} />
                  <View style={styles.topRatedImageOverlay} />
                </View>
                <View style={styles.topRatedInfo}>
                  <Text style={styles.topRatedTitle} numberOfLines={1}>{anime.title}</Text>
                  <Text style={styles.topRatedSubtitle}>
                    {anime.episodes} episodes • {anime.rating}⭐
                  </Text>
                  <View style={styles.topRatedStats}>
                    <View style={styles.scoreIndicator}>
                      <View style={styles.scoreBar} />
                      <Text style={styles.scoreText}>Highly Rated</Text>
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

        {/* Footer Banner */}
        <View style={styles.footerBanner}>
          <Image
            source={{ uri: "https://www.wallpaperflare.com/static/966/883/723/anime-universe-wallpaper.jpg" }}
            style={styles.bannerImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.bannerOverlay}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.bannerContent}
            >
              <Text style={styles.bannerTitle}>Join the Anime Universe</Text>
              <Text style={styles.bannerSubtitle}>🌌 Discover endless adventures</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

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
    width: 180,
    height: 180,
    backgroundColor: '#7F00FF',
    top: -90,
    right: -90,
  },
  orb2: {
    width: 140,
    height: 140,
    backgroundColor: '#E100FF',
    top: 180,
    left: -70,
  },
  orb3: {
    width: 110,
    height: 110,
    backgroundColor: '#FF6B6B',
    bottom: 120,
    right: -55,
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
  subHeaderText: {
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
    color: '#E100FF',
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
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  topRatedSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  topRatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(225,0,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E100FF',
  },
  topRatedImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  topRatedImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  topRatedImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  topRatedInfo: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  topRatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topRatedSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    fontWeight: '500',
  },
  topRatedStats: {
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
    backgroundColor: '#7F00FF',
    borderRadius: 2,
    marginRight: 6,
  },
  scoreText: {
    fontSize: 11,
    color: '#7F00FF',
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
  footerBanner: {
    marginTop: 40,
    marginHorizontal: 20,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerContent: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: 'rgba(225,0,255,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});