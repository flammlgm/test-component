import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';

import Tabs from './src/components/Tabs';
import Button from './src/components/Button';
import Indicator from './src/components/Indicator';
import BackButton from './src/components/BackButton';
import ExpandableCard from './src/components/ExpandableCard';
import { colors } from './src/theme';
import { mistakesData, tipsData } from './src/data/lessons';

type LessonTab = 'mistakes' | 'tips';

export default function App() {
  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState<LessonTab>('mistakes');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const containerWidth = width - 32;

  useEffect(() => {
    let isMounted = true;

    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
          'Gilroy-SemiBold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
          'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
        });
      } finally {
        if (isMounted) {
          setFontsLoaded(true);
        }
      }
    };

    loadFonts();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCard = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const currentData = activeTab === 'mistakes' ? mistakesData : tipsData;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { width: containerWidth }]}>
          <BackButton onPress={() => alert('Back pressed')} />

          <View style={styles.indicatorWrapper} pointerEvents="none">
            <Indicator activeIndex={0} total={5} />
          </View>
        </View>

        <View style={[styles.tabContainer, { width: containerWidth }]}>
          <Tabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            width={containerWidth}
          />
        </View>

        <View style={[styles.content, { width: containerWidth }]}>
          {currentData.map((item) => (
            <ExpandableCard
              key={item.id}
              number={item.number}
              title={item.title}
              description={item.description}
              image={item.imageUrl}
              isExpanded={expandedCardId === item.id}
              onToggle={() => toggleCard(item.id)}
            />
          ))}
        </View>

        <Button
          title="End Lesson"
          onPress={() => alert('Lesson ended')}
          width={containerWidth}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    marginBottom: 32,
  },
  content: {
    marginBottom: 32,
    gap: 8,
  },
});