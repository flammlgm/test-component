import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, typography } from '../theme';

export type LessonTab = 'mistakes' | 'tips';

type TabsProps = {
  activeTab: LessonTab;
  onTabChange: (tab: LessonTab) => void;
  width: number;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, width }) => {
  const translateX = useRef(
    new Animated.Value(activeTab === 'mistakes' ? 0 : 1),
  ).current;

  const sliderWidth = useMemo(() => (width - 2) / 2, [width]);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeTab === 'mistakes' ? 0 : 1,
      useNativeDriver: true,
      tension: 200,
      friction: 20,
    }).start();
  }, [activeTab, translateX]);

  const sliderPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sliderWidth],
  });

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            width: sliderWidth,
            transform: [{ translateX: sliderPosition }],
          },
        ]}
      />

      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('mistakes')}
        activeOpacity={0.7}
      >
        <Text style={styles.tabText}>Mistakes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('tips')}
        activeOpacity={0.7}
      >
        <Text style={styles.tabText}>Tips</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    flexDirection: 'row',
    padding: 1,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    height: 38,
    backgroundColor: colors.white,
    borderRadius: 30,
    top: 1,
    left: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 30,
  },
  tabText: {
    fontFamily: typography.bold,
    fontSize: typography.size.medium,
    lineHeight: typography.size.medium,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default Tabs;