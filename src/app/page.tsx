"use client";

import SearchPanel from "../components/SearchPanel";
import AdminPanel from "../components/AdminPanel";
import GraphVisualizer from "../components/GraphVisualizer";
import { useHomeLogic } from "../hooks/client";

export default function Home() {
  const {
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
    handleGenreSearch
  } = useHomeLogic();

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#e0e0e0",
    fontFamily: "sans-serif",
  };
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    padding: 20,
    borderBottom: "1px solid #333",
  };
  const tabBtnStyle = (active: boolean) => ({
    padding: "10px 20px",
    background: active ? "#1DB954" : "transparent",
    color: active ? "#000" : "#fff",
    border: "1px solid #1DB954",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: "bold",
  });

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <button
          onClick={() => setActiveTab("search")}
          style={tabBtnStyle(activeTab === "search")}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          style={tabBtnStyle(activeTab === "admin")}
        >
          Admin Panel
        </button>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        {activeTab === "search" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <SearchPanel
                options={artistOptions}
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
                onSearch={handleSearch}
                loading={loading}
                
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                onGenreSearch={handleGenreSearch}
              />
            {result && result.found ? (
              <GraphVisualizer data={graphData} viewType={result.path.length === 0 ? "cluster" : "path"} />
            ) : result && !result.found ? (
              <div
                style={{
                  padding: 20,
                  background: "#300",
                  color: "#f88",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                No connection found.
              </div>
            ) : null}
          </div>
        ) : (
          <AdminPanel
            artistOptions={artistOptions}
            onAddArtist={handleAddArtist}
            onAddSong={handleAddSong}
            onDeleteArtist={handleDeleteArtist}
            adminMsg={adminMsg}
          />
        )}
      </div>
    </div>
  );
}
