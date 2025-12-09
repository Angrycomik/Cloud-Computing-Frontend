import { StylesConfig } from "react-select";
import { ArtistOption } from "../types/types";

export const selectStyles: StylesConfig<ArtistOption, false> = {
  control: (base) => ({
    ...base,
    background: "#2a2a2a",
    borderColor: "#333",
    color: "#fff",
    padding: "5px",
    borderRadius: "8px",
  }),
  menu: (base) => ({
    ...base,
    background: "#2a2a2a",
    color: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#1DB954" : "#2a2a2a",
    color: state.isFocused ? "#000" : "#fff",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888",
  }),
};

export const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #333",
  background: "#2a2a2a",
  color: "#fff",
  width: "100%",
};

export const btnStyle = {
  padding: 12,
  width: "100%",
  background: "#1DB954",
  color: "#000",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: 10,
};

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
