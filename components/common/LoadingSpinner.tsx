import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function AnimeSkeletonLoader() {
  const shimmerTranslate = useSharedValue(-1);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    // Shimmer animation
    shimmerTranslate.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(-1, { duration: 0 })
      ),
      -1,
      false
    );

    // Pulse animation
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const SkeletonBox = ({ width, height, style, borderRadius = 8 }:any) => {
    const shimmerStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        shimmerTranslate.value,
        [-1, 1],
        [-width, width]
      );
      
      return {
        transform: [{ translateX }],
        opacity: pulseOpacity.value,
      };
    });

    return (
      <View style={[{ width, height, borderRadius, overflow: 'hidden' }, style]}>
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />
        <AnimatedLinearGradient
          colors={['transparent', 'rgba(255,255,255,0.15)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFillObject,
            shimmerStyle,
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F1A" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <SkeletonBox width={24} height={24} style={styles.backButton} />
          <View style={styles.flex1} />
        </View>

        {/* Hero Background */}
        <View style={styles.heroSection}>
          <SkeletonBox width="100%" height={300} borderRadius={0} />
          
          {/* Overlay Content */}
          <View style={styles.overlay}>
            <View style={styles.posterAndInfo}>
              {/* Poster */}
              <SkeletonBox width={120} height={180} borderRadius={12} />
              
              {/* Title and Info */}
              <View style={styles.titleSection}>
                <SkeletonBox width={200} height={32} borderRadius={6} style={styles.titleSkeleton} />
                <SkeletonBox width={120} height={16} borderRadius={4} style={styles.subtitleSkeleton} />
                <View style={styles.badgeContainer}>
                  <SkeletonBox width={40} height={24} borderRadius={12} style={styles.badge} />
                  <SkeletonBox width={80} height={24} borderRadius={12} style={styles.badge} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <SkeletonBox width={120} height={28} borderRadius={6} style={styles.sectionTitle} />
          
          <View style={styles.infoGrid}>
            {/* Row 1 */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SkeletonBox width={50} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={30} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
              <View style={styles.infoItem}>
                <SkeletonBox width={45} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={80} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
            </View>
            
            {/* Row 2 */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SkeletonBox width={60} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={70} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
              <View style={styles.infoItem}>
                <SkeletonBox width={55} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={50} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
            </View>
            
            {/* Row 3 */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SkeletonBox width={65} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={90} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
              <View style={styles.infoItem}>
                <SkeletonBox width={50} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={70} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
            </View>
            
            {/* Row 4 */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SkeletonBox width={45} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={60} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
              <View style={styles.infoItem}>
                <SkeletonBox width={50} height={14} borderRadius={3} style={styles.infoLabel} />
                <SkeletonBox width={55} height={18} borderRadius={4} style={styles.infoValue} />
              </View>
            </View>
          </View>
        </View>

        {/* Genres Section */}
        <View style={styles.genresSection}>
          <SkeletonBox width={80} height={28} borderRadius={6} style={styles.sectionTitle} />
          <View style={styles.genresContainer}>
            <SkeletonBox width={70} height={36} borderRadius={18} style={styles.genrePill} />
            <SkeletonBox width={90} height={36} borderRadius={18} style={styles.genrePill} />
            <SkeletonBox width={80} height={36} borderRadius={18} style={styles.genrePill} />
            <SkeletonBox width={65} height={36} borderRadius={18} style={styles.genrePill} />
            <SkeletonBox width={85} height={36} borderRadius={18} style={styles.genrePill} />
          </View>
        </View>

        {/* Synopsis Section */}
        <View style={styles.synopsisSection}>
          <View style={styles.synopsisHeader}>
            <SkeletonBox width={90} height={28} borderRadius={6} />
            <SkeletonBox width={80} height={16} borderRadius={4} />
          </View>
          <View style={styles.synopsisContent}>
            <SkeletonBox width="100%" height={16} borderRadius={4} style={styles.textLine} />
            <SkeletonBox width="95%" height={16} borderRadius={4} style={styles.textLine} />
            <SkeletonBox width="90%" height={16} borderRadius={4} style={styles.textLine} />
            <SkeletonBox width="85%" height={16} borderRadius={4} style={styles.textLine} />
            <SkeletonBox width="92%" height={16} borderRadius={4} style={styles.textLine} />
          </View>
        </View>

        {/* Additional Content */}
        <View style={styles.additionalContent}>
          <SkeletonBox width={100} height={24} borderRadius={6} style={styles.sectionTitle} />
          <View style={styles.cardContainer}>
            <SkeletonBox width="100%" height={80} borderRadius={12} style={styles.card} />
            <SkeletonBox width="100%" height={80} borderRadius={12} style={styles.card} />
            <SkeletonBox width="100%" height={80} borderRadius={12} style={styles.card} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 16,
  },
  flex1: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    background: 'linear-gradient(transparent, rgba(15,15,26,0.8))',
  },
  posterAndInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleSection: {
    flex: 1,
    marginLeft: 16,
    marginBottom: 8,
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  subtitleSkeleton: {
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    marginRight: 8,
  },
  infoSection: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoLabel: {
    marginBottom: 4,
  },
  infoValue: {
    marginTop: 4,
  },
  genresSection: {
    padding: 16,
    paddingTop: 0,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genrePill: {
    marginBottom: 8,
  },
  synopsisSection: {
    padding: 16,
    paddingTop: 0,
  },
  synopsisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  synopsisContent: {
    gap: 8,
  },
  textLine: {
    marginBottom: 4,
  },
  additionalContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    marginBottom: 8,
  },
});