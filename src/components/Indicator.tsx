import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, sizes, typography } from '../theme';

type DotProps = {
  active: boolean;
};

type IndicatorProps = {
  activeIndex?: number;
  total?: number;
};

const Dot: React.FC<DotProps> = ({ active }) => (
  <View style={[styles.dot, active ? styles.activeDot : styles.inactiveDot]} />
);

const Indicator: React.FC<IndicatorProps> = ({
  activeIndex = 0,
  total = 5,
}) => {
  const safeTotal = Math.max(total, 1);
  const safeActiveIndex = Math.min(Math.max(activeIndex, 0), safeTotal - 1);

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: safeTotal }).map((_, index) => (
          <Dot key={index} active={index === safeActiveIndex} />
        ))}
      </View>

      <Text style={styles.pageText}>
        Page {safeActiveIndex + 1} of {safeTotal}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 6,
    borderRadius: sizes.borderRadius.dot,
  },
  activeDot: {
    backgroundColor: colors.orange,
  },
  inactiveDot: {
    backgroundColor: colors.gray20,
  },
  pageText: {
    fontFamily: typography.semiBold,
    fontSize: typography.size.small,
    lineHeight: typography.size.small * 1.3,
    color: colors.gray,
    letterSpacing: -0.5,
  },
});

export default Indicator;