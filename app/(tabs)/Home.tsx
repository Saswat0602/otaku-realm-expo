import homeAnimeData from "@/data/home";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#7F00FF", "#E100FF"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>🎌 Welcome to Otaku.Realm</Text>
        <Text style={styles.subHeaderText}>
          Discover epic anime worlds and legends
        </Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Popular Anime</Text>
          <FlatList
            data={homeAnimeData}
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

        {/* Top Rated Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Top Rated</Text>
          {homeAnimeData.map((anime) => (
            <View key={anime.id} style={styles.topRatedCard}>
              <Image source={{ uri: anime.image }} style={styles.topRatedImage} />
              <View style={styles.topRatedInfo}>
                <Text style={styles.cardTitle}>{anime.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {anime.episodes} episodes • {anime.rating}⭐
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Banner */}
        <View style={styles.footerBanner}>
          <Image
            source={{ uri: "https://www.wallpaperflare.com/static/966/883/723/anime-universe-wallpaper.jpg" }}
            style={styles.bannerImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.bannerOverlay}
          >
            <Text style={styles.bannerText}>Join the Anime Universe 🌌</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // position: 'relative', // Remove absolute
    // Remove top, left, right, zIndex
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#FDF4FF",
    marginTop: 6,
    fontSize: 15,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  listContainer: {
    paddingRight: 16,
  },
  card: {
    width: width * 0.6,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingTop: 8,
    color: "#1F2937",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 4,
  },
  topRatedCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    overflow: "hidden",
  },
  topRatedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  topRatedInfo: {
    padding: 12,
    flex: 1,
    justifyContent: "center",
  },
  footerBanner: {
    marginTop: 24,
    position: "relative",
    height: 160,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: 16,
    marginBottom: 40,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    padding: 16,
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
