import { useState, useEffect } from "react";
import {
  ConnectionResult,
  GraphData,
  GraphNode,
  GraphLink,
  ArtistOption,
} from "../types/types";

export function useHomeLogic() {
  const [activeTab, setActiveTab] = useState<"search" | "admin">("search");
  const [loading, setLoading] = useState(false);
  const [adminMsg, setAdminMsg] = useState("");

  const [start, setStart] = useState<ArtistOption | null>(null);
  const [end, setEnd] = useState<ArtistOption | null>(null);
  const [result, setResult] = useState<ConnectionResult | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [genres, setGenres] = useState<ArtistOption[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<ArtistOption | null>(null);
  const [artistOptions, setArtistOptions] = useState<ArtistOption[]>([]);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArtists = await fetch(`${API_URL}/artists`);
        if (resArtists.ok) {
          const names: string[] = await resArtists.json();
          setArtistOptions(names.map((name) => ({ value: name, label: name })));
        }

        const resGenres = await fetch(`${API_URL}/genres`);
        if (resGenres.ok) {
          const names: string[] = await resGenres.json();
          setGenres(names.map((name) => ({ value: name, label: name })));
        }
      } catch (e) {
        console.error("Failed to fetch data", e);
      }
    };
    fetchData();
  }, []);

  const handleGenreSearch = async () => {
    if (!selectedGenre) return;
    setLoading(true);
    setResult(null);

    try {
      const encodedGenre = encodeURIComponent(selectedGenre.value);
      const res = await fetch(`${API_URL}/genres/${encodedGenre}`);

      if (res.ok) {
        const artists: string[] = await res.json();
        const centerNode: GraphNode = { id: selectedGenre.value, group: 2 };
        const artistNodes: GraphNode[] = artists.map((name) => ({
          id: name,
          group: 1,
        }));
        const nodes = [centerNode, ...artistNodes];

        const links: GraphLink[] = artists.map((artist) => ({
          source: selectedGenre.value,
          target: artist,
          name: "PLAYS_GENRE",
        }));
        setGraphData({ nodes, links });
        setResult({ found: true, path: [], songs: [] });
      }
    } catch (e) {
      alert("Error fetching genre data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!start || !end) return alert("Please select both artists.");
    if (start.value === end.value)
      return alert("Please select two different artists.");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_artist: start.value,
          end_artist: end.value,
        }),
      });
      const data: ConnectionResult = await res.json();
      setResult(data);

      if (data.found && data.path.length > 0) {
        const nodes: GraphNode[] = data.path.map((id) => ({ id, group: 1 }));
        nodes[0].group = 2;
        nodes[nodes.length - 1].group = 3;

        const links: GraphLink[] = [];
        for (let i = 0; i < data.path.length - 1; i++) {
          links.push({
            source: data.path[i],
            target: data.path[i + 1],
            name: data.songs[i],
          });
        }
        setGraphData({ nodes, links });
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddArtist = async (name: string) => {
    const res = await fetch(`${API_URL}/artists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setAdminMsg(`Added: ${name}`);
      const newOption = { value: name, label: name };

      setArtistOptions((prevOptions) => {
        const newList = [...prevOptions, newOption];
        return newList;
      });
    } else if (res.status === 409) {
      return alert("Artist already exists.");
    } else {
      alert("Error adding artist.");
    }
  };

  const handleAddSong = async (a1: string, a2: string, song: string) => {
    if (a1 === a2) return alert("Please select two different artists.");
    const res = await fetch(`${API_URL}/songs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist1: a1, artist2: a2, song_name: song }),
    });
    if (res.ok) setAdminMsg(`Connected!`);
    else alert("Error connecting artists.");
  };

  const handleDeleteArtist = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const res = await fetch(`${API_URL}/artists/${encodeURIComponent(name)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAdminMsg(`Deleted: ${name}`);
      setArtistOptions((prev) => prev.filter((opt) => opt.value !== name));
    }
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    adminMsg,
    start,
    setStart,
    end,
    setEnd,
    result,
    graphData,
    artistOptions,
    handleSearch,
    handleAddArtist,
    handleAddSong,
    handleDeleteArtist,
    genres,
    selectedGenre,
    setSelectedGenre,
    handleGenreSearch,
  };
}
