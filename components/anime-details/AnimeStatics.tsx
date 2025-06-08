import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface StatsData {
  scoreDistribution: Array<{ score: number; amount: number }>;
  statusDistribution: Array<{ status: string; amount: number }>;
}

interface AnimeStatisticsProps {
  stats: StatsData;
}

const STATUS_COLORS: Record<string, string[]> = {
  CURRENT: ['#84cc16', '#65a30d'],
  PLANNING: ['#3b82f6', '#2563eb'],
  PAUSED: ['#a78bfa', '#8b5cf6'],
  DROPPED: ['#f472b6', '#ec4899'],
  COMPLETED: ['#fb7185', '#f43f5e'],
  REPEATING: ['#22d3ee', '#06b6d4'],
};

const STATUS_LABELS: Record<string, string> = {
  CURRENT: 'Current',
  PLANNING: 'Planning',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'Paused',
  REPEATING: 'Repeating',
};

const AnimeStatistics: React.FC<AnimeStatisticsProps> = ({ stats }) => {
  const [showAlt, setShowAlt] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

  useEffect(() => {
    if (stats?.statusDistribution) {
      const values = stats.statusDistribution.map(() => new Animated.Value(0));
      setAnimatedValues(values);
      
      // Animate bars
      Animated.stagger(100, 
        values.map(value => 
          Animated.timing(value, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          })
        )
      ).start();
    }
  }, [stats]);

  if (!stats || (!stats.scoreDistribution?.length && !stats.statusDistribution?.length)) {
    return null;
  }

  const totalStatus = stats.statusDistribution.reduce((sum, s) => sum + s.amount, 0);
  const statusOrder = ['CURRENT', 'PLANNING', 'PAUSED', 'DROPPED', 'COMPLETED', 'REPEATING'];
  const statusDataSorted = statusOrder
    .map(key => stats.statusDistribution.find(s => s.status === key))
    .filter(Boolean) as { status: string; amount: number }[];

  const maxScore = Math.max(...stats.scoreDistribution.map(s => s.amount));
  const sortedScoreData = [...stats.scoreDistribution].sort((a, b) => a.score - b.score);

  const renderStatusDistribution = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Status Distribution</Text>
      
      {/* Status Cards */}
      <View style={styles.statusGrid}>
        {statusDataSorted.map((item, index) => (
          <View key={item.status} style={styles.statusCard}>
            <LinearGradient
              colors={STATUS_COLORS[item.status]}
              style={styles.statusGradient}
            >
              <Text style={styles.statusLabel}>{STATUS_LABELS[item.status]}</Text>
            </LinearGradient>
            <Text style={styles.statusAmount}>{item.amount.toLocaleString()}</Text>
            <Text style={styles.statusSubtext}>Users</Text>
          </View>
        ))}
      </View>

      {/* Animated Status Bar */}
      <View style={styles.statusBarContainer}>
        <Text style={styles.barTitle}>Distribution Overview</Text>
        <View style={styles.statusBar}>
          {statusDataSorted.map((item, index) => {
            const percentage = (item.amount / totalStatus) * 100;
            const animatedWidth = animatedValues[index]?.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', `${percentage}%`],
            });

            return (
              <Animated.View key={item.status} style={{ width: animatedWidth }}>
                <LinearGradient
                  colors={STATUS_COLORS[item.status]}
                  style={styles.statusBarSegment}
                >
                  {percentage > 10 && (
                    <Text style={styles.statusBarText}>
                      {Math.round(percentage)}%
                    </Text>
                  )}
                </LinearGradient>
              </Animated.View>
            );
          })}
        </View>
        
        {/* Legend */}
        <View style={styles.legend}>
          {statusDataSorted.map((item) => (
            <View key={item.status} style={styles.legendItem}>
              <LinearGradient
                colors={STATUS_COLORS[item.status]}
                style={styles.legendDot}
              />
              <Text style={styles.legendText}>{STATUS_LABELS[item.status]}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderScoreDistribution = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Score Distribution</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
        <View style={styles.barChart}>
          {sortedScoreData.map((item, index) => {
            const height = (item.amount / maxScore) * 150;
            return (
              <View key={item.score} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <LinearGradient
                    colors={['#3b82f6', '#1d4ed8']}
                    style={[styles.bar, { height }]}
                  >
                    <Text style={styles.barValue}>{item.amount}</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.barLabel}>{item.score}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowAlt(!showAlt)}
        >
          <LinearGradient
            colors={['#6366f1', '#4f46e5']}
            style={styles.toggleGradient}
          >
            <Text style={styles.toggleText}>
              {showAlt ? 'Status View' : 'Score View'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!showAlt ? renderStatusDistribution() : renderScoreDistribution()}
      </ScrollView>
    </View>
  );
};

export default AnimeStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  toggleButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  toggleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statusCard: {
    width: (width - 76) / 3,
    alignItems: 'center',
  },
  statusGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  statusBarContainer: {
    marginTop: 8,
  },
  barTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  statusBar: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statusBarSegment: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBarText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    marginTop: 8,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
    minWidth: 40,
  },
  barWrapper: {
    justifyContent: 'flex-end',
    height: 150,
    marginBottom: 8,
  },
  bar: {
    width: 32,
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
    minHeight: 20,
  },
  barValue: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  barLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});