"use client";

import Select from "react-select";
import { ArtistOption } from "../types/types";
import { selectStyles, btnStyle } from "@/app/styles";

interface Props {
  options: ArtistOption[];
  start: ArtistOption | null;
  end: ArtistOption | null;
  setStart: (opt: ArtistOption | null) => void;
  setEnd: (opt: ArtistOption | null) => void;
  onSearch: () => void;
  loading: boolean;

  genres: ArtistOption[];
  selectedGenre: ArtistOption | null;
  setSelectedGenre: (opt: ArtistOption | null) => void;
  onGenreSearch: () => void;
}

export default function SearchPanel({
  options,
  start,
  end,
  setStart,
  setEnd,
  onSearch,
  loading,
  genres,
  selectedGenre,
  setSelectedGenre,
  onGenreSearch,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <h1 style={{ textAlign: "center", color: "#1DB954" }}>
        Music Graph Explorer
      </h1>

      {/* Path */}
      <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 12 }}>
        <h3 style={{ marginBottom: 10, color: "#fff" }}>
          Music Artists: Six degrees of separation
        </h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}
        >
          <Select
            instanceId="start"
            options={options}
            value={start}
            onChange={setStart}
            placeholder="Start Artist(e.g Paul McCartney)"
            styles={selectStyles}
          />
          <Select
            instanceId="end"
            options={options}
            value={end}
            onChange={setEnd}
            placeholder="End Artist(e.g Taylor Swift)"
            styles={selectStyles}
          />
        </div>
        <button onClick={onSearch} style={btnStyle} disabled={loading}>
          {loading ? "Calculating..." : "Find Connection"}
        </button>
      </div>

      {/* Genre */}
      <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 12 }}>
        <h3 style={{ marginBottom: 10, color: "#fff" }}>Explore by Genre</h3>
        <Select
          instanceId="genre"
          options={genres}
          value={selectedGenre}
          onChange={setSelectedGenre}
          placeholder="Select a Genre (e.g. Pop, Hip Hop)"
          styles={selectStyles}
        />
        <button
          onClick={onGenreSearch}
          style={{ ...btnStyle, background: "#fff", color: "#1DB954" }}
          disabled={loading}
        >
          Visualize
        </button>
      </div>
    </div>
  );
}
