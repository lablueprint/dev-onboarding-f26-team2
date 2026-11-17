import { StyleSheet, View } from "react-native";
import { router } from 'expo-router';

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
          router.back()
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
