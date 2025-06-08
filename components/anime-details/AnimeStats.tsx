import type { Media } from '@/types/animeDetails';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';


interface AnimeStatsProps {
  anime: Media;
}

export default function AnimeStats({ anime }: AnimeStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Analytics</Text>
        <View style={styles.titleAccent} />
      </View>
      
      <View style={styles.statsGrid}>
        <StatCard 
          label="Rating" 
          value={anime.averageScore ? `${anime.averageScore}/100` : 'N/A'} 
          icon="⭐"
          gradient={['#FFD700', '#FF8C00']}
          percentage={anime.averageScore ? anime.averageScore : 0}
          type="score"
        />
        <StatCard 
          label="Popularity" 
          value={anime.popularity ? formatNumber(anime.popularity) : 'N/A'} 
          icon="🔥"
          gradient={['#FF6B6B', '#FF4757']}
          percentage={85}
          type="popularity"
        />
        <StatCard 
          label="Favorites" 
          value={anime.favourites ? formatNumber(anime.favourites) : 'N/A'} 
          icon="❤️"
          gradient={['#E91E63', '#C2185B']}
          percentage={75}
          type="favorites"
        />
        <StatCard 
          label="Rank" 
          value={anime.rankings?.[0]?.rank ? `#${anime.rankings[0].rank}` : 'N/A'} 
          icon="🏆"
          gradient={['#9C27B0', '#673AB7']}
          percentage={90}
          type="rank"
        />
      </View>
    </View>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  gradient: readonly [string, string];
  percentage: number;
  type: string;
}

function StatCard({ label, value, icon, gradient, percentage, type }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <LinearGradient
        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBackground}
      >
        <View style={styles.cardInner}>
          {/* Header with icon and label */}
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={gradient}
                style={styles.iconGradient}
              >
                <Text style={styles.cardIcon}>{icon}</Text>
              </LinearGradient>
            </View>
            <Text style={styles.cardLabel}>{label}</Text>
          </View>
          
          {/* Main value */}
          <Text style={styles.cardValue}>{value}</Text>
          
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{percentage}%</Text>
          </View>
          
          {/* Subtle accent line */}
          <LinearGradient
            colors={[gradient[0], 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.accentLine}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  titleAccent: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  statsGrid: {
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardBackground: {
    flex: 1,
  },
  cardInner: {
    padding: 20,
    height: 140,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 14,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: -0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    minWidth: 30,
    textAlign: 'right',
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});