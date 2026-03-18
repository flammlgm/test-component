import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, typography } from '../theme';

type ExpandableCardProps = {
  number: number;
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  isExpanded: boolean;
  onToggle: () => void;
};

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  number,
  title,
  description,
  image,
  isExpanded,
  onToggle,
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const onContentLayout = (event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;

    if (nextHeight > 0 && nextHeight !== contentHeight) {
      setContentHeight(nextHeight);
    }
  };

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedHeight, {
      toValue: isExpanded ? contentHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight, contentHeight, isExpanded, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const chevronAnimatedStyle = {
    transform: [{ rotate }],
  };

  return (
    <TouchableOpacity
      style={[styles.card, isExpanded && styles.cardExpanded]}
      onPress={onToggle}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.numberContainer}>
          <Text style={[styles.number, isExpanded && styles.numberExpanded]}>
            {number}
          </Text>
        </View>

        <Text style={[styles.title, isExpanded && styles.titleExpanded]}>
          {title}
        </Text>

        <Animated.View style={chevronAnimatedStyle}>
          <Svg width={10} height={5} viewBox="0 0 10 5" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.195251 0.181115C0.455585 -0.0603716 0.877718 -0.0603716 1.13805 0.181115L4.99999 3.76329L8.86192 0.181115C9.12228 -0.0603716 9.54439 -0.0603716 9.80474 0.181115C10.0651 0.422608 10.0651 0.814136 9.80474 1.05563L5.94279 4.63779C5.42213 5.12074 4.57786 5.12074 4.05719 4.63779L0.195251 1.05563C-0.0650835 0.814136 -0.0650835 0.422608 0.195251 0.181115Z"
              fill={isExpanded ? colors.white : colors.gray}
            />
          </Svg>
        </Animated.View>
      </View>

      <Animated.View style={[styles.expandableContent, { height: animatedHeight }]}>
        <View style={styles.contentWrapper} onLayout={onContentLayout}>
          {image ? (
            <Image source={image} style={styles.image} resizeMode="cover" />
          ) : null}

          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 12,
    backgroundColor: colors.gray20,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardExpanded: {
    backgroundColor: colors.gray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  numberContainer: {
    width: 36,
    height: 36,
    backgroundColor: colors.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  number: {
    fontFamily: typography.bold,
    fontSize: typography.size.medium,
    lineHeight: typography.size.medium + 4,
    color: colors.gray,
    textAlign: 'center',
    includeFontPadding: false,
  },
  numberExpanded: {
    color: colors.gray,
  },
  title: {
    flex: 1,
    fontFamily: typography.semiBold,
    fontSize: typography.size.large,
    lineHeight: typography.size.large + 4,
    color: colors.gray,
    includeFontPadding: false,
  },
  titleExpanded: {
    color: colors.white,
  },
  expandableContent: {
    overflow: 'hidden',
  },
  contentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    gap: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  description: {
    fontFamily: typography.regular,
    fontSize: typography.size.medium,
    lineHeight: typography.size.medium * 1.2,
    color: colors.white,
  },
});

export default ExpandableCard;