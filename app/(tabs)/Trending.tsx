import trendingAnime from '@/data/trending';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';



const Trending = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#f43f5e', '#8b5cf6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>🔥 Trending Anime</Text>
        <Text style={styles.subText}>Last 6 Months</Text>
      </LinearGradient>

      <View style={styles.listWrapper}>
        {trendingAnime.map((anime, index) => (
          <View key={anime.id} style={styles.card}>
            <Image source={{ uri: anime.image }} style={styles.image} />
            <View style={styles.textWrapper}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.title}>{anime.title}</Text>
              <Text style={styles.genre}>{anime.genre}</Text>
              <Text style={styles.rating}>⭐ {anime.rating}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    color: '#fefefe',
    marginTop: 6,
    fontSize: 14,
  },
  listWrapper: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
  textWrapper: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2,
  },
  genre: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    marginTop: 4,
  },
});
