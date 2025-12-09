export interface ConnectionResult {
  found: boolean;
  path: string[];
  songs: string[];
  message?: string;
}

export interface GraphNode {
  id: string;
  group: number;
}

export interface GraphLink {
  source: string;
  target: string;
  name: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ArtistOption {
  value: string;
  label: string;
}
