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
}

export default function SearchPanel({ options, start, end, setStart, setEnd, onSearch, loading }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ textAlign: "center", color: "#1DB954" }}>Music Artists: Six degrees of separation</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
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
        {loading ? "Calculating path..." : "Show Connections"}
      </button>
    </div>
  );
}