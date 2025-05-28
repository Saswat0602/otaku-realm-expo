import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const topSearches = [
    "One Piece", "The Apothecary Diaries", "Wind Breaker Season 2",
    "Fire Force Season 3", "Attack on Titan", "Solo Leveling Season 2",
    "Frieren: Beyond Journey's End", "Death Note", "Bleach"
];

export default function IndexScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Navigate to search results
        }
    };

    const handleTopSearchClick = (title: string) => {
        setSearchQuery(title);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                // source={{ uri: '../assets/heroImage.webp' }}
                source={require('../assets/images/heroImage.webp')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.3)', 'transparent']}
                    style={styles.gradientOverlay}
                />
                <View style={styles.innerContainer}>
                    {/* Title */}
                    <Text style={styles.title}>
                        Otaku.<Text style={styles.titleAccent}>Realm</Text>
                    </Text>
                    <Text style={styles.subtitle}>Discover your next favorite anime</Text>

                    {/* Search */}
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={18} color="#9CA3AF" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search anime, manga..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearchSubmit}
                            returnKeyType="search"
                        />
                        <TouchableOpacity onPress={handleSearchSubmit}>
                            <LinearGradient
                                colors={['#8B5CF6', '#581C87']}
                                style={styles.searchButton}
                            >
                                <Text style={styles.searchButtonText}>Go</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Trending */}
                    <View style={styles.trendingContainer}>
                        <Text style={styles.trendingLabel}>Trending:</Text>
                        <View style={styles.tagsWrap}>
                            {topSearches.slice(0, 4).map((title, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.tag}
                                    onPress={() => handleTopSearchClick(title)}
                                >
                                    <Text style={styles.tagText}>{title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* CTA Buttons */}
                    <View style={styles.ctaContainer}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push('/(tabs)/Home')}
                        >
                            <LinearGradient
                                colors={['#8B5CF6', '#7C3AED']}
                                style={styles.primaryButtonGradient}
                            >
                                <Ionicons name="play" size={16} color="white" />
                                <Text style={styles.primaryButtonText}>Explore</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Ionicons name="star-outline" size={16} color="#374151" />
                            <Text style={styles.secondaryButtonText}>Watchlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    innerContainer: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
    },
    titleAccent: {
        color: '#6366F1',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
        marginBottom: 24,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#111827',
    },
    searchButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    trendingContainer: {
        marginBottom: 24,
    },
    trendingLabel: {
        color: '#374151',
        fontWeight: '600',
        marginBottom: 8,
    },
    tagsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: '#374151',
        fontSize: 13,
    },
    ctaContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    primaryButton: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    primaryButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    secondaryButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        borderRadius: 16,
        paddingVertical: 12,
        gap: 6,
    },
    secondaryButtonText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
    },
});
