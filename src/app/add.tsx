import { StyleSheet, View } from "react-native";
import { ThemedText } from '@/components/themed-text';

import { MovieForm } from "@/components/MovieForm";
import { Spacing } from "@/constants/theme";
import { addMovie } from "@/services/movies";
// TODO(Isaiah, Sprint 1): render <MovieForm />, call addMovie() on submit, then router.back()
export default function AddMovieScreen() {
  return (
    <View style={styles.container}>
      <MovieForm
        onSubmit={async (values) => {
          await addMovie(values);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.three,
  },
});
