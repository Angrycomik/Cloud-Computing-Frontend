"use client";

import { useState } from "react";
import Select from "react-select";
import { ArtistOption } from "../types/types";
import { selectStyles, inputStyle, btnStyle } from "../app/styles";

interface Props {
  artistOptions: ArtistOption[];
  onAddArtist: (name: string) => void;
  onAddSong: (a1: string, a2: string, song: string) => void;
  onDeleteArtist: (name: string) => void;
  adminMsg: string;
}

export default function AdminPanel({
  artistOptions,
  onAddArtist,
  onAddSong,
  onDeleteArtist,
  adminMsg,
}: Props) {
  const [newArtist, setNewArtist] = useState("");
  const [artist1, setArtist1] = useState<ArtistOption | null>(null);
  const [artist2, setArtist2] = useState<ArtistOption | null>(null);
  const [song, setSong] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ArtistOption | null>(null);

  const handleAddSong = () => {
    if (artist1 && artist2 && song) {
      onAddSong(artist1.value, artist2.value, song);
      setSong("");
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      onDeleteArtist(deleteTarget.value);
      setDeleteTarget(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {adminMsg && (
        <div
          style={{
            padding: 10,
            background: "#1DB954",
            color: "#000",
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          {adminMsg}
        </div>
      )}

      {/* ADD */}
      <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 12 }}>
        <h3>Add Artist</h3>
        <input
          style={inputStyle}
          placeholder="Artist Name"
          value={newArtist}
          onChange={(e) => setNewArtist(e.target.value)}
        />
        <button
          onClick={() => {
            onAddArtist(newArtist);
            setNewArtist("");
          }}
          style={{ ...btnStyle, marginTop: 10 }}
        >
          Save to DB
        </button>
      </div>

      {/* LINK */}
      <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 12 }}>
        <h3>Link Artists (Add Song)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Select
            instanceId="artist-1"
            options={artistOptions}
            value={artist1}
            onChange={setArtist1}
            placeholder="Artist 1"
            styles={selectStyles}
          />
          <Select
            instanceId="artist-2"
            options={artistOptions}
            value={artist2}
            onChange={setArtist2}
            placeholder="Artist 2"
            styles={selectStyles}
          />
          <input
            style={inputStyle}
            placeholder="Song Title"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />
          <button onClick={handleAddSong} style={btnStyle}>
            Create Relationship
          </button>
        </div>
      </div>

      {/* DELETE */}
      <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 12 }}>
        <h3>Delete Artist</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Select
            instanceId="delete"
            options={artistOptions}
            value={deleteTarget}
            onChange={setDeleteTarget}
            placeholder="Select Artist to Delete..."
            styles={{
              ...selectStyles,
              control: (base) => ({
                ...base,
                background: "#300",
                borderColor: "red",
              }),
            }}
          />
          <button
            onClick={handleDelete}
            style={{ ...btnStyle, background: "#ff4444", color: "#fff" }}
          >
            Delete Selected Artist
          </button>
        </div>
      </div>
    </div>
  );
}
