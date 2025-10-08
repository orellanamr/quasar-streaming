import { useRouter } from 'expo-router';
import React from 'react';
import { HomeScreen } from '../../screens/HomeScreen';

export default function HomeTab() {
  const router = useRouter();
  
  const navigation = {
    navigate: (screenName: string, params?: any) => {
      if (screenName === 'MovieDetails') {
        router.push({ 
          pathname: '/modal', 
          params: { movie: JSON.stringify(params.movie) } 
        });
      }
    },
  };

  return <HomeScreen navigation={navigation} />;
}
