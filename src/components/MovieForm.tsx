import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { GENRES, type Genre, type NewMovie } from "@/types/movie";

type Props = {
  initialValues?: NewMovie;
  submitLabel?: string;
  onSubmit: (values: NewMovie) => void | Promise<void>;
};

type FormErrors = Record<string, string>;

function parseCast(cast: string) {
  return cast
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

function isWholeNumberInRange(value: string, min: number, max: number) {
  const n = Number(value);
  return value.trim() !== "" && Number.isInteger(n) && n >= min && n <= max;
}

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const theme = useTheme();

  function validate() {
    const newErrors: FormErrors = {};
    const maxYear = new Date().getFullYear() + 1;

    if (title.trim().length < 1 || title.trim().length > 100) {
      newErrors.title = "Title must be 1–100 characters.";
    }
    if (!genre) {
      newErrors.genre = "Pick a genre.";
    }
    if (!isWholeNumberInRange(year, 1888, maxYear)) {
      newErrors.year = `Year must be a whole number from 1888 to ${maxYear}.`;
    }
    if (!isWholeNumberInRange(runtime, 1, 600)) {
      newErrors.runtime = "Runtime must be a whole number from 1 to 600.";
    }
    if (!director.trim()) {
      newErrors.director = "Director is required.";
    }
    if (parseCast(cast).length === 0) {
      newErrors.cast = "Add at least one cast member.";
    }
    if (synopsis.trim().length < 20) {
      newErrors.synopsis = "Synopsis must be at least 20 characters.";
    }
    if (posterUrl.trim() && !posterUrl.trim().startsWith("http")) {
      newErrors.posterUrl = "Poster URL must start with http.";
    }

    return newErrors;
  }

  async function handleSubmit() {
    if (submitting) return;

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0 || !genre) return;

    setSubmitting(true);
    try {
      await props.onSubmit({
        title: title.trim(),
        genre,
        year: Number(year),
        runtimeMinutes: Number(runtime),
        director: director.trim(),
        cast: parseCast(cast),
        synopsis: synopsis.trim(),
        posterUrl:
          posterUrl.trim() ||
          `https://picsum.photos/seed/${Date.now()}/400/600`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <ThemedText>Title</ThemedText>
          <TextInput
            placeholder="e.g. Spider-Man: Into the Spider-Verse"
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && (
            <ThemedText type="small" style={styles.error}>
              {errors.title}
            </ThemedText>
          )}

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
          {errors.genre && (
            <ThemedText type="small" style={styles.error}>
              {errors.genre}
            </ThemedText>
          )}

          <ThemedText>Year</ThemedText>
          <TextInput
            placeholder="e.g. 2018"
            keyboardType="number-pad"
            value={year}
            onChangeText={setYear}
          />
          {errors.year && (
            <ThemedText type="small" style={styles.error}>
              {errors.year}
            </ThemedText>
          )}

          <ThemedText>Runtime (minutes)</ThemedText>
          <TextInput
            placeholder="e.g. 117"
            keyboardType="number-pad"
            value={runtime}
            onChangeText={setRuntime}
          />
          {errors.runtime && (
            <ThemedText type="small" style={styles.error}>
              {errors.runtime}
            </ThemedText>
          )}

          <ThemedText>Director</ThemedText>
          <TextInput
            placeholder="e.g. Bob Persichetti"
            value={director}
            onChangeText={setDirector}
          />
          {errors.director && (
            <ThemedText type="small" style={styles.error}>
              {errors.director}
            </ThemedText>
          )}

          <ThemedText>Cast (comma-separated)</ThemedText>
          <TextInput
            placeholder="e.g. Shameik Moore, Jake Johnson"
            value={cast}
            onChangeText={setCast}
          />
          {errors.cast && (
            <ThemedText type="small" style={styles.error}>
              {errors.cast}
            </ThemedText>
          )}

          <ThemedText>Synopsis</ThemedText>
          <TextInput
            placeholder="e.g. short summary"
            multiline={true}
            value={synopsis}
            onChangeText={setSynopsis}
          />
          {errors.synopsis && (
            <ThemedText type="small" style={styles.error}>
              {errors.synopsis}
            </ThemedText>
          )}

          <ThemedText>Poster URL (optional)</ThemedText>
          <TextInput
            placeholder="https://.."
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            value={posterUrl}
            onChangeText={setPosterUrl}
          />
          {errors.posterUrl && (
            <ThemedText type="small" style={styles.error}>
              {errors.posterUrl}
            </ThemedText>
          )}

          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: theme.text },
              (pressed || submitting) && styles.buttonDimmed,
            ]}
          >
            <ThemedText style={[styles.buttonText, { color: theme.background }]}>
              {submitting ? "Saving…" : (props.submitLabel ?? "Save")}
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  error: {
    color: "red",
  },
  button: {
    marginTop: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDimmed: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: "600",
  },
});
