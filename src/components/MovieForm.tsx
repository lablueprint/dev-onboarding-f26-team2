import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { NewMovie } from '@/types/movie';

type Props = {
  initialValues?: NewMovie;
  submitLabel?: string;
  onSubmit: (values: NewMovie) => void | Promise<void>;
};

// TODO(Isaiah, Sprint 1): inputs, validation, submit
export function MovieForm(props: Props) {
  return (
    <View>
      <ThemedText>Form coming soon</ThemedText>
    </View>
  );
}
