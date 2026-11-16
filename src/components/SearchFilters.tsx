import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Genre } from "@/types/movie";

import { useState } from "react";

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
  genre: Genre | null;
  onGenreChange: (genre: Genre | null) => void;
  resultCount: number;
};

// TODO(Taarini, Sprint 1): search bar. Sprint 2: genre chips
export function SearchFilters(props: Props) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View
        style={[styles.container, isFocused && { borderColor: colors.text }]}
      >
        <ThemedText type="small" themeColor="text">
          🔍
        </ThemedText>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.text}
          value={props.search}
          onChangeText={props.onSearchChange}
          placeholder="Search movies"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {props.search.length > 0 && (
          <Pressable
            onPress={() => props.onSearchChange("")}
            style={styles.clearButton}
          >
            <ThemedText type="small" themeColor="text">
              ✕
            </ThemedText>
          </Pressable>
        )}
      </View>
      {props.search.trim().length > 0 && (
        <ThemedText type="small" themeColor="text" style={styles.resultCount}>
          {props.resultCount} {props.resultCount === 1 ? "movie" : "movies"}
        </ThemedText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#808080",
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: Spacing.three,
    fontSize: 14,
  },
  clearButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  resultCount: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginEnd: 8,
  },
});
