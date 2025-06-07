import { useGetTrendingAnimeQuery } from '@/redux/api';
import type { Anime } from '@/types/types';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Skeleton Card Component
const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.skeletonImageContainer}>
      <LinearGradient
        colors={['#2a2a3a', '#3a3a4a', '#2a2a3a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.skeletonImage}
      />
    </View>
    <View style={styles.cardContent}>
      <View style={styles.skeletonTextContainer}>
        <LinearGradient
          colors={['#2a2a3a', '#3a3a4a', '#2a2a3a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.skeletonText, { width: '80%' }]}
        />
        <LinearGradient
          colors={['#2a2a3a', '#3a3a4a', '#2a2a3a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.skeletonText, { width: '60%', marginTop: 8 }]}
        />
      </View>
    </View>
  </View>
);

// Loading Footer Component
const LoadingFooter = () => (
  <View style={styles.loadingFooter}>
    <ActivityIndicator size="large" color="#6C5CE7" />
    <Text style={styles.loadingFooterText}>Loading more anime...</Text>
  </View>
);

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  const { data, error, isLoading, isFetching, refetch } = useGetTrendingAnimeQuery({ page });

  // Update anime list when new data arrives
  React.useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllAnime(data.data);
      } else {
        setAllAnime(prev => [...prev, ...data.data]);
      }
      setHasNextPage(data.pagination?.hasNextPage || false);
    }
  }, [data, page]);

  const onRefresh = useCallback(() => {
    setPage(1);
    setAllAnime([]);
    refetch();
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  const renderAnimeCard = useCallback(({ item }: { item: Anime }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.images?.jpg?.large_image_url  }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.imageOverlay}
        />
        
        {/* Rating Badge */}
        <BlurView intensity={20} tint="dark" style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ⭐ {item.rating || item.score || 'N/A'}
          </Text>
        </BlurView>

        {/* Status Badge */}
        {item.status && (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title || item.title_english}
        </Text>
        
        <View style={styles.statsRow}>
          <Text style={styles.statLabel}>
            🎬 {item.episodes || '?'} eps
          </Text>
          {item.year && (
            <Text style={styles.statLabel}>
              📅 {item.year}
            </Text>
          )}
        </View>
        
        {item.genres && item.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {item.genres.slice(0, 2).map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  ), []);

  const renderSkeletonList = useMemo(() => (
    Array.from({ length: 6 }, (_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ))
  ), []);

  const renderFooter = useCallback(() => {
    if (!hasNextPage) return null;
    if (isFetching && allAnime.length > 0) {
      return <LoadingFooter />;
    }
    return null;
  }, [isFetching, hasNextPage, allAnime.length]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'airing':
      case 'releasing':
        return '#00D4AA';
      case 'finished':
      case 'completed':
        return '#6C5CE7';
      case 'not_yet_released':
      case 'upcoming':
        return '#FDCB6E';
      default:
        return '#74B9FF';
    }
  };

  const renderEmptyState = () => {
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorEmoji}>😵‍💫</Text>
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorText}>Failed to load anime data</Text>
          <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
            <LinearGradient
              colors={['#6C5CE7', '#A29BFE']}
              style={styles.retryButtonGradient}
            >
              <Text style={styles.retryButtonText}>🔄 Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🎭</Text>
        <Text style={styles.emptyTitle}>No anime found</Text>
        <Text style={styles.emptyText}>Pull down to refresh</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0F0F23', 'rgba(15,15,35,0.9)']}
        style={styles.headerContainer}
      >
        <Text style={styles.headerText}>🔥 Trending Anime</Text>
        <Text style={styles.headerSubtext}>Discover amazing shows</Text>
      </LinearGradient>

      {/* Content */}
      {isLoading && allAnime.length === 0 ? (
        <FlatList
          data={renderSkeletonList}
          renderItem={({ item }) => item}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : allAnime.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={allAnime}
          keyExtractor={(item) => `${item.mal_id || item.id}-${item.title || item.title_english || Math.random()}`}
          renderItem={renderAnimeCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoading && page === 1}
              onRefresh={onRefresh}
              colors={['#6C5CE7']}
              tintColor="#6C5CE7"
              progressBackgroundColor="#1e1e2f"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtext: {
    color: '#A0A0B0',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E1E2F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    color: '#A0A0B0',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: 'rgba(108, 92, 231, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  genreText: {
    color: '#6C5CE7',
    fontSize: 11,
    fontWeight: '600',
  },
  // Skeleton Styles
  skeletonImageContainer: {
    height: 200,
    backgroundColor: '#2A2A3A',
  },
  skeletonImage: {
    flex: 1,
  },
  skeletonTextContainer: {
    padding: 16,
  },
  skeletonText: {
    height: 16,
    borderRadius: 8,
  },
  // Loading Footer
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingFooterText: {
    color: '#A0A0B0',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  // Empty States
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    color: '#A0A0B0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#FF6B6B',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    color: '#A0A0B0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});