import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

type BackButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Svg width={20} height={17} viewBox="0 0 20 17" fill="none">
        <Path
          d="M0.244395 7.74488L7.74415 0.245122C7.90051 0.0887612 8.11259 0.000916358 8.33372 0.000916378C8.55485 0.000916398 8.76692 0.0887613 8.92328 0.245122C9.07964 0.401484 9.16749 0.613557 9.16749 0.834687C9.16749 1.05582 9.07964 1.26789 8.92328 1.42425L2.84535 7.50114L19.1667 7.50114C19.3877 7.50114 19.5997 7.58893 19.7559 7.74521C19.9122 7.90148 20 8.11344 20 8.33444C20 8.55545 19.9122 8.76741 19.7559 8.92368C19.5997 9.07996 19.3877 9.16775 19.1667 9.16775L2.84535 9.16775L8.92328 15.2446C9.07964 15.401 9.16748 15.6131 9.16748 15.8342C9.16748 16.0553 9.07964 16.2674 8.92328 16.4238C8.76692 16.5801 8.55484 16.668 8.33371 16.668C8.11259 16.668 7.90051 16.5801 7.74415 16.4238L0.244395 8.92401C0.166917 8.84661 0.105452 8.75471 0.0635173 8.65355C0.0215823 8.55239 -1.21317e-06 8.44395 -1.20393e-06 8.33444C-1.19469e-06 8.22493 0.0215824 8.1165 0.0635173 8.01534C0.105452 7.91417 0.166917 7.82227 0.244395 7.74488Z"
          fill={colors.gray}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 35,
    elevation: 5,
  },
});

export default BackButton;