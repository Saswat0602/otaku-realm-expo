import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const topSearches = [
    "One Piece", "The Apothecary Diaries", "Wind Breaker Season 2",
    "Fire Force Season 3", "Attack on Titan", "Solo Leveling Season 2",
    "Frieren: Beyond Journey's End", "Death Note", "Bleach"
];

export default function IndexScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(50));
    const router = useRouter();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Navigate to search results
        }
    };

    const handleTopSearchClick = (title: string) => {
        setSearchQuery(title);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <ImageBackground
                source={require('../assets/images/heroImage.webp')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'transparent']}
                    style={styles.gradientOverlay}
                />
                
                {/* Animated particles effect */}
                <View style={styles.particlesContainer}>
                    {[...Array(20)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.particle,
                                {
                                    left: Math.random() * width,
                                    top: Math.random() * height,
                                    animationDelay: `${Math.random() * 2}s`,
                                }
                            ]}
                        />
                    ))}
                </View>

                <Animated.View 
                    style={[
                        styles.innerContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    {/* Enhanced Title with glow effect */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Otaku.<Text style={styles.titleAccent}>Realm</Text>
                        </Text>
                        <View style={styles.titleGlow} />
                    </View>
                    <Text style={styles.subtitle}>Discover your next favorite anime</Text>

                    {/* Enhanced Search Bar */}
                    <View style={styles.searchContainer}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                            style={styles.searchBar}
                        >
                            <Ionicons name="search" size={20} color="#A855F7" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search anime, manga..."
                                placeholderTextColor="#64748B"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearchSubmit}
                                returnKeyType="search"
                            />
                            <TouchableOpacity onPress={handleSearchSubmit}>
                                <LinearGradient
                                    colors={['#A855F7', '#7C3AED', '#6B21A8']}
                                    style={styles.searchButton}
                                >
                                    <Ionicons name="arrow-forward" size={16} color="white" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={styles.searchGlow} />
                    </View>

                    {/* Enhanced Trending Section */}
                    <View style={styles.trendingContainer}>
                        <View style={styles.trendingHeader}>
                            <Ionicons name="trending-up" size={18} color="#A855F7" />
                            <Text style={styles.trendingLabel}>Trending Now</Text>
                        </View>
                        <View style={styles.tagsWrap}>
                            {topSearches.slice(0, 4).map((title, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.tag}
                                    onPress={() => handleTopSearchClick(title)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['rgba(168,85,247,0.2)', 'rgba(124,58,237,0.1)']}
                                        style={styles.tagGradient}
                                    >
                                        <Text style={styles.tagText}>{title}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Enhanced CTA Buttons */}
                    <View style={styles.ctaContainer}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push('/(tabs)/Home')}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={['#A855F7', '#7C3AED', '#6B21A8']}
                                style={styles.primaryButtonGradient}
                            >
                                <Ionicons name="play" size={18} color="white" />
                                <Text style={styles.primaryButtonText}>Explore Anime</Text>
                            </LinearGradient>
                            <View style={styles.buttonGlow} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.secondaryButton}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                style={styles.secondaryButtonGradient}
                            >
                                <Ionicons name="bookmark-outline" size={18} color="#E2E8F0" />
                                <Text style={styles.secondaryButtonText}>My Watchlist</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Decorative elements */}
                    <View style={styles.decorativeElements}>
                        <View style={styles.decorativeLine1} />
                        <View style={styles.decorativeLine2} />
                    </View>
                </Animated.View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    particlesContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    particle: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#A855F7',
        borderRadius: 1,
        opacity: 0.6,
    },
    innerContainer: {
        padding: 24,
        paddingBottom: 50,
        backgroundColor: 'rgba(0,0,0,0.95)',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(168,85,247,0.2)',
        borderBottomWidth: 0,
    },
    titleContainer: {
        position: 'relative',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
        textShadowColor: 'rgba(168,85,247,0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    titleAccent: {
        color: '#A855F7',
        textShadowColor: 'rgba(168,85,247,0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    titleGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(168,85,247,0.1)',
        borderRadius: 8,
        transform: [{ scale: 1.2 }],
        zIndex: -1,
    },
    subtitle: {
        fontSize: 18,
        color: '#94A3B8',
        marginBottom: 32,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 32,
    },
    searchBar: {
        flexDirection: 'row',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(168,85,247,0.3)',
        backgroundColor: 'rgba(15,23,42,0.8)',
    },
    searchGlow: {
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        backgroundColor: 'rgba(168,85,247,0.1)',
        borderRadius: 18,
        zIndex: -1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    searchButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    trendingContainer: {
        marginBottom: 32,
    },
    trendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    trendingLabel: {
        color: '#E2E8F0',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    tagsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    tag: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tagGradient: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(168,85,247,0.3)',
    },
    tagText: {
        color: '#E2E8F0',
        fontSize: 14,
        fontWeight: '600',
    },
    ctaContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    primaryButton: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        elevation: 8,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
    },
    primaryButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 10,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    buttonGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        backgroundColor: 'rgba(168,85,247,0.2)',
        borderRadius: 24,
        zIndex: -1,
    },
    secondaryButton: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    secondaryButtonGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 10,
    },
    secondaryButtonText: {
        color: '#E2E8F0',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    decorativeElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    decorativeLine1: {
        position: 'absolute',
        top: 60,
        right: 40,
        width: 80,
        height: 2,
        backgroundColor: 'rgba(168,85,247,0.3)',
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    decorativeLine2: {
        position: 'absolute',
        bottom: 120,
        left: 30,
        width: 60,
        height: 2,
        backgroundColor: 'rgba(168,85,247,0.2)',
        borderRadius: 1,
        transform: [{ rotate: '-30deg' }],
    },
});