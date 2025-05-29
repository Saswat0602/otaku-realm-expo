import { animeList, fanFavorites } from '@/data/popular'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

const Popular = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff4e50', '#f9d423']}
        style={styles.header}
      >
        <Text style={styles.headerText}>🔥 Popular Anime</Text>
        <Text style={styles.subText}>The most legendary series of all time</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {/* Horizontal list */}
        <View style={styles.section}>
          <FlatList
            data={animeList}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  🎬 {item.episodes} eps | ⭐ {item.rating}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Vertical list: Fan Favorites */}
        <View style={styles.verticalSection}>
          <Text style={styles.fanTitle}>💖 Fan Favorites</Text>
          {fanFavorites.map((anime) => (
            <View key={anime.id} style={styles.verticalCard}>
              <Image source={{ uri: anime.image }} style={styles.verticalImage} />
              <View style={styles.verticalTextContainer}>
                <Text style={styles.verticalTitle}>{anime.title}</Text>
                <Text style={styles.verticalGenre}>{anime.genre}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )
}

export default Popular

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    color: '#fff',
    marginTop: 6,
    fontSize: 14,
  },
  section: {
    marginTop: 24,
    paddingLeft: 16,
  },
  listContainer: {
    paddingRight: 16,
  },
  card: {
    width: width * 0.6,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 8,
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 4,
  },
  verticalSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  fanTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  verticalCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  verticalImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  verticalTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  verticalGenre: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
})
