import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState(null);
  const { t } = useLanguage();

  const nodes = [
    { id: "react", label: "React.js + Vite", x: 400, y: 40, type: "frontend" },
    {
      id: "firebase-auth",
      label: "Firebase Auth",
      x: 180,
      y: 140,
      type: "service",
    },
    {
      id: "firestore",
      label: "Cloud Firestore",
      x: 400,
      y: 140,
      type: "database",
    },
    {
      id: "recaptcha",
      label: "reCAPTCHA v2",
      x: 620,
      y: 140,
      type: "security",
    },
    { id: "cloudinary", label: "Cloudinary", x: 180, y: 260, type: "storage" },
    { id: "leaflet", label: "Leaflet + OSM", x: 400, y: 260, type: "maps" },
    {
      id: "nominatim",
      label: "Nominatim API",
      x: 620,
      y: 260,
      type: "service",
    },
  ];

  const edges = [
    { from: "react", to: "firebase-auth" },
    { from: "react", to: "firestore" },
    { from: "react", to: "recaptcha" },
    { from: "react", to: "cloudinary" },
    { from: "react", to: "leaflet" },
    { from: "react", to: "nominatim" },
    { from: "leaflet", to: "nominatim" },
  ];

  const getNode = (id) => nodes.find((n) => n.id === id);

  const nodeDescriptions = {
    react: t("about.nodes.react"),
    "firebase-auth": t("about.nodes.firebaseAuth"),
    firestore: t("about.nodes.firestore"),
    recaptcha: t("about.nodes.recaptcha"),
    cloudinary: t("about.nodes.cloudinary"),
    leaflet: t("about.nodes.leaflet"),
    nominatim: t("about.nodes.nominatim"),
  };

  return (
    <div className="relative w-full aspect-[16/9] min-h-[360px] bg-surface/50">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L8,4 z" fill="#52525b" />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const isActive = activeNode === edge.from || activeNode === edge.to;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y + 22}
                x2={to.x}
                y2={to.y - 22}
                stroke={isActive ? "#a1a1aa" : "#27272a"}
                strokeWidth={isActive ? 1.5 : 1}
                markerEnd="url(#arrow)"
                className="transition-all duration-500"
              />
              <circle
                r="2.5"
                fill={isActive ? "#d4d4d8" : "#52525b"}
                opacity={isActive ? 0.9 : 0.4}
              >
                <animateMotion
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M${from.x},${from.y + 22} L${to.x},${to.y - 22}`}
                />
              </circle>
            </g>
          );
        })}

        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const width = node.id === "react" ? 150 : 130;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <rect
                x={node.x - width / 2}
                y={node.y - 18}
                width={width}
                height="36"
                rx="2"
                fill={isActive ? "#27272a" : "#18181b"}
                stroke={isActive ? "#d4d4d8" : "#3f3f46"}
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={isActive ? "#fafafa" : "#a1a1aa"}
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                letterSpacing="0.05em"
                className="transition-all duration-300 pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="font-mono text-[10px] text-secondary bg-void/90 border border-border px-3 py-1.5 rounded-sm backdrop-blur-sm">
          {activeNode ? (
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {nodes.find((n) => n.id === activeNode)?.label} —{" "}
              {nodeDescriptions[activeNode]}
            </span>
          ) : (
            <span className="text-tertiary">
              {t("about.hoverNode")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
