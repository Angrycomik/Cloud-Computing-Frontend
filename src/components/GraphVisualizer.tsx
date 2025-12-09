"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { GraphData } from "../types/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div style={{ color: "#fff", padding: 20 }}>Loading graph...</div>
  ),
});

interface Props {
  data: GraphData;
}

export default function GraphVisualizer({ data }: Props) {
  const graphRef = useRef<any>(null);

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 12,
        overflow: "hidden",
        height: 500,
        background: "#000",
        position: "relative",
      }}
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        width={860}
        height={500}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;

          const color =
            node.group === 2
              ? "#1DB954"
              : node.group === 3
              ? "#ff4444"
              : "#ffffff";

          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = color;
          ctx.fill();

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x, node.y + 8);
        }}

        nodeLabel="id"
        nodeRelSize={8}
        linkColor={() => "#555"}
        linkWidth={2}
        linkLabel="name"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        cooldownTicks={100}
        onEngineStop={() => graphRef.current?.zoomToFit(400)}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(0,0,0,0.7)",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <div style={{ color: "#1DB954" }}>Start</div>
        <div style={{ color: "#fff" }}>Path Node</div>
        <div style={{ color: "#ff4444" }}>End</div>
        <small style={{ color: "#aaa" }}>Hover link to see song name</small>
      </div>
    </div>
  );
}
