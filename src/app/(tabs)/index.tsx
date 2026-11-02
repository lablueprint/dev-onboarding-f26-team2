import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MovieList } from '@/components/MovieList';
import { SearchFilters } from '@/components/SearchFilters';
import { SortControls } from '@/components/SortControls';
import { useWatched } from '@/context/WatchedContext';
import { useMovies } from '@/hooks/useMovies';
import type { Genre, SortBy, SortDirection, WatchedFilter } from '@/types/movie';
import { filterMovies } from '@/utils/filter';
import { sortMovies } from '@/utils/sort';
import { filterByWatched } from '@/utils/watched';

// This screen owns the search/filter/sort state and passes it down.
// Please check with the lead before editing this file.
export default function DiscoverScreen() {
  const { movies, loading, refetch } = useMovies();
  const { watchedIds } = useWatched();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState<Genre | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('title');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [watchedFilter, setWatchedFilter] = useState<WatchedFilter>('all');

  const filtered = filterByWatched(filterMovies(movies, { search, genre }), watchedFilter, watchedIds);
  const visible = sortMovies(filtered, sortBy, direction);

  return (
    <View style={styles.container}>
      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        resultCount={visible.length}
      />
      <SortControls
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        watchedFilter={watchedFilter}
        onWatchedFilterChange={setWatchedFilter}
        totalCount={movies.length}
      />
      <MovieList movies={visible} refreshing={loading} onRefresh={refetch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
