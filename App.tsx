import React, { useState } from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Gereksiz uyarıları kapat
LogBox.ignoreLogs([
  'Cannot record touch move without a touch start',
  'Non-serializable values were found in the navigation state',
]);

import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider, useNotifications } from './src/context/NotificationContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import BusRoutesScreen from './src/screens/BusRoutesScreen';
import NewsScreen from './src/screens/NewsScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import EventsScreen from './src/screens/EventsScreen';
import QRScreen from './src/screens/QRScreen';
import AccountScreen from './src/screens/AccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import NotificationDetailScreen from './src/screens/NotificationDetailScreen';
import TodoScreen from './src/screens/TodoScreen';
import RestaurantsScreen from './src/screens/RestaurantsScreen';
import CafesScreen from './src/screens/CafesScreen';
import HotelsScreen from './src/screens/HotelsScreen';
import CarRentalScreen from './src/screens/CarRentalScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Stack Navigator için tip tanımları
export type RootStackParamList = {
  Home: undefined;
  BusRoutes: undefined;
  News: undefined;
  NewsDetail: { news: any };
  Places: undefined;
  Events: undefined;
  NotificationDetail: { notification: any };
  Todo: undefined;
  Restaurants: undefined;
  Cafes: undefined;
  Hotels: undefined;
  CarRental: undefined;
};

// Root Navigator için tip tanımları
export type RootNavigatorParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

// Tab Navigator için tip tanımları
export type TabParamList = {
  HomeStack: undefined;
  QR: undefined;
  AccountStack: undefined;
};

// Account Stack için tip tanımları
export type AccountStackParamList = {
  Account: undefined;
  Settings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator();
const AccountStackNav = createNativeStackNavigator<AccountStackParamList>();

// Home Stack - Ana sayfa ve alt sayfaları
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e3a5f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Trabzon' }}
      />
      <Stack.Screen
        name="BusRoutes"
        component={BusRoutesScreen}
        options={{ title: 'Otobüs Hatları' }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'Haberler' }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Places"
        component={PlacesScreen}
        options={{ title: 'Gezilecek Yerler' }}
      />
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{ title: 'Etkinlikler' }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{ title: 'Bildirim Detayı' }}
      />
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        options={{ title: 'Yapılacaklar' }}
      />
      <Stack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{ title: 'Restoranlar' }}
      />
      <Stack.Screen
        name="Cafes"
        component={CafesScreen}
        options={{ title: 'Cafeler' }}
      />
      <Stack.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{ title: 'Oteller' }}
      />
      <Stack.Screen
        name="CarRental"
        component={CarRentalScreen}
        options={{ title: 'Araç Kiralama' }}
      />
    </Stack.Navigator>
  );
}

// Account Stack - Hesap ve Ayarlar
function AccountStack() {
  return (
    <AccountStackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStackNav.Screen name="Account" component={AccountScreen} />
      <AccountStackNav.Screen name="Settings" component={SettingsScreen} />
      <AccountStackNav.Screen name="Profile" component={ProfileScreen} />
    </AccountStackNav.Navigator>
  );
}

// Tab Bar Icon Komponenti
function TabIcon({ name, focused, badge }: { name: string; focused: boolean; badge?: number }) {
  const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    home: focused ? 'home' : 'home-outline',
    qr: focused ? 'qr-code' : 'qr-code-outline',
    account: focused ? 'person' : 'person-outline',
  };

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconFocused]}>
      <Ionicons name={iconMap[name]} size={24} color={focused ? '#6366F1' : '#9CA3AF'} />
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
  );
}

// Tab Navigator
function MainTabs() {
  const { unreadCount } = useNotifications();
  const { theme, isDark } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopWidth: 0,
          height: 85,
          paddingTop: 8,
          paddingBottom: 25,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} badge={unreadCount} />,
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarLabel: 'QR Kod',
          tabBarIcon: ({ focused }) => (
            <View style={styles.qrTabButton}>
              <Ionicons name="qr-code" size={26} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: 'Hesap',
          tabBarIcon: ({ focused }) => <TabIcon name="account" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppContent />
            </NavigationContainer>
          </SafeAreaProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainTabs} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
      </RootStack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    height: 85,
    paddingTop: 8,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tabIconContainer: {
    padding: 4,
    position: 'relative',
  },
  tabIconFocused: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  qrTabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
