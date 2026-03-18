import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography } from '../theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  width?: number;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, style, width }) => {
  return (
    <TouchableOpacity
      style={[styles.button, width != null && { width }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: colors.orange,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 35,
    elevation: 5,
    alignSelf: 'center',
  },
  text: {
    fontFamily: typography.bold,
    fontSize: typography.size.medium,
    lineHeight: typography.size.medium,
    color: colors.white,
    textAlign: 'center',
  },
});

export default Button;