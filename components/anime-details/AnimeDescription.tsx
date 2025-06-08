import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AnimeDescriptionProps {
  description: string;
}

export default function AnimeDescription({ description }: AnimeDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Remove HTML tags from description
  const cleanDescription = description.replace(/<[^>]*>/g, '');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Synopsis</Text>
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <BlurView intensity={20} tint="dark" style={styles.expandButtonContent}>
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </BlurView>
        </TouchableOpacity>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text 
          style={styles.description} 
          numberOfLines={isExpanded ? undefined : 4}
        >
          {cleanDescription}
        </Text>
        {!isExpanded && (
          <LinearGradient
            colors={['transparent', 'rgba(15,15,35,0.9)']}
            style={styles.fadeOut}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  expandButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  expandButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  expandButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionContainer: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A0A0B0',
  },
  fadeOut: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
}); 