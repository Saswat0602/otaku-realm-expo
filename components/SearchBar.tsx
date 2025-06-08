import { setSearchQuery } from '@/redux/features/filterSlice';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: () => void;
}

export default function SearchBar({ placeholder = "Search anime...", onSearch }: SearchBarProps) {
  const dispatch = useDispatch();

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.searchBar}
        >
          <Ionicons name="search" size={20} color="#A855F7" />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="#64748B"
            onChangeText={handleSearch}
            returnKeyType="search"
            onSubmitEditing={() => onSearch && onSearch()}
          />
          <TouchableOpacity onPress={() => onSearch && onSearch()}>
            <LinearGradient
              colors={['#A855F7', '#7C3AED', '#6B21A8']}
              style={styles.searchButton}
            >
              <Ionicons name="arrow-forward" size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 