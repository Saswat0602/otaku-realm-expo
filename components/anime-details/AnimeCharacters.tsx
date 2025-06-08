import type { CharacterEdge } from '@/types/animeDetails';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface AnimeCharactersProps {
  characters: CharacterEdge[];
}

export default function AnimeCharacters({ characters }: AnimeCharactersProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {characters.map((character) => (
          <View key={character.node.id} style={styles.characterCard}>
            <Image
              source={{ uri: character.node.image.large }}
              style={styles.characterImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(15,15,35,0.9)']}
              style={styles.characterGradient}
            />
            <BlurView intensity={20} tint="dark" style={styles.characterInfo}>
              <Text style={styles.characterName}>{character.node.name.full}</Text>
              <Text style={styles.characterRole}>{character.role}</Text>
            </BlurView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 20,
  },
  characterCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A2E',
  },
  characterImage: {
    width: '100%',
    height: 200,
  },
  characterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  characterInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  characterRole: {
    fontSize: 12,
    color: '#A0A0B0',
  },
}); 