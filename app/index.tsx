import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function IndexScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the App</Text>
            <Button title="Go to Tabs" onPress={() => router.push('/(tabs)/Home')} />
        </View>
    );
}
