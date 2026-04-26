import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { FavoriteProvider } from './src/context/FavoriteContext';

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </FavoriteProvider>
  );
}