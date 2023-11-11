import supabase from './src/config/supabaseClient';
import { View, Text } from 'react-native';

export default function App() {
  console.log(supabase);
  return (
    <View>
      <Text>
        Hello World!
      </Text>
    </View>
  );
}

