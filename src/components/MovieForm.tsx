import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { GENRES, type Genre, type NewMovie } from "@/types/movie";

type Props = {
  initialValues?: NewMovie;
  submitLabel?: string;
  onSubmit: (values: NewMovie) => void | Promise<void>;
};

// TODO(Isaiah, Sprint 1): inputs, validation, submit
export function MovieForm(props: Props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [genre, setGenre] = useState<Genre | null>(null);

  const theme = useTheme();

  return (
    <View>
      <ThemedText>Title</ThemedText>
      <TextInput
        placeholder="e.g. Spider-Man: Into the Spider-Verse"
        value={title}
        onChangeText={setTitle}
      />
      <ThemedText>Genre</ThemedText>
      <View style={styles.chipRow}>
        {GENRES.map((g) => {
          const selected = genre === g;
          return (
            <Pressable
              key={g}
              onPress={() => setGenre(g)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected
                    ? theme.backgroundSelected
                    : theme.backgroundElement,
                  borderColor: selected ? theme.text : "transparent",
                },
              ]}
            >
              <ThemedText type="small">{g}</ThemedText>
            </Pressable>
          );
        })}
      </View>

      <ThemedText>Year</ThemedText>
      <TextInput
        placeholder="e.g. 2018"
        keyboardType="number-pad"
        value={year}
        onChangeText={setYear}
      />
      <ThemedText>Runtime (mins)</ThemedText>
      <TextInput
        placeholder="e.g. 117"
        keyboardType="number-pad"
        value={runtime}
        onChangeText={setRuntime}
      />
      <ThemedText>Director</ThemedText>
      <TextInput
        placeholder="e.g. Bob Persichetti"
        value={director}
        onChangeText={setDirector}
      />
      <ThemedText>Cast (comma-separated)</ThemedText>
      <TextInput
        placeholder="e.g. Shameik Moore, Jake Johnson"
        value={cast}
        onChangeText={setCast}
      />
      <ThemedText>Synopsis</ThemedText>
      <TextInput
        placeholder="e.g. short summary"
        multiline={true}
        value={synopsis}
        onChangeText={setSynopsis}
      />
      <ThemedText>Poster URL (optional)</ThemedText>
      <TextInput
        placeholder="https://.."
        keyboardType="url"
        value={posterUrl}
        onChangeText={setPosterUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: 1,
  },
});
