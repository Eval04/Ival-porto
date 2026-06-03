import { useState } from 'react'

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState(null)

  const nodes = [
    { id: 'gateway', label: 'API Gateway', x: 400, y: 40, type: 'core' },
    { id: 'auth', label: 'Auth Service', x: 180, y: 140, type: 'service' },
    { id: 'ai', label: 'AI Integration', x: 400, y: 140, type: 'service' },
    { id: 'core', label: 'EcoTrace Core', x: 620, y: 140, type: 'service' },
    { id: 'postgres', label: 'PostgreSQL', x: 180, y: 260, type: 'database' },
    { id: 'redis', label: 'Redis Cache', x: 400, y: 260, type: 'database' },
    { id: 'docker', label: 'Docker Swarm', x: 620, y: 260, type: 'infra' },
  ]

  const edges = [
    { from: 'gateway', to: 'auth' },
    { from: 'gateway', to: 'ai' },
    { from: 'gateway', to: 'core' },
    { from: 'auth', to: 'postgres' },
    { from: 'core', to: 'postgres' },
    { from: 'ai', to: 'redis' },
    { from: 'core', to: 'redis' },
    { from: 'core', to: 'docker' },
  ]

  const getNode = (id) => nodes.find(n => n.id === id)

  return (
    <div className="relative w-full aspect-[16/9] min-h-[360px] bg-surface/50">
      <svg className="w-full h-full" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="#52525b" />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const from = getNode(edge.from)
          const to = getNode(edge.to)
          const isActive = activeNode === edge.from || activeNode === edge.to

          return (
            <g key={i}>
              <line
                x1={from.x} y1={from.y + 22}
                x2={to.x} y2={to.y - 22}
                stroke={isActive ? '#a1a1aa' : '#27272a'}
                strokeWidth={isActive ? 1.5 : 1}
                markerEnd="url(#arrow)"
                className="transition-all duration-500"
              />
              <circle r="2.5" fill={isActive ? '#d4d4d8' : '#52525b'} opacity={isActive ? 0.9 : 0.4}>
                <animateMotion
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M${from.x},${from.y + 22} L${to.x},${to.y - 22}`}
                />
              </circle>
            </g>
          )
        })}

        {nodes.map((node) => {
          const isActive = activeNode === node.id
          return (
            <g 
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <rect
                x={node.x - 65}
                y={node.y - 18}
                width="130"
                height="36"
                rx="2"
                fill={isActive ? '#27272a' : '#18181b'}
                stroke={isActive ? '#d4d4d8' : '#3f3f46'}
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={isActive ? '#fafafa' : '#a1a1aa'}
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                letterSpacing="0.05em"
                className="transition-all duration-300 pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="font-mono text-[10px] text-secondary bg-void/90 border border-border px-3 py-1.5 rounded-sm backdrop-blur-sm">
          {activeNode ? (
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {nodes.find(n => n.id === activeNode)?.label} — {
                activeNode === 'postgres' ? 'Primary + Read Replicas' :
                activeNode === 'redis' ? 'Session & Cache Layer' :
                activeNode === 'docker' ? 'Container Orchestration' :
                activeNode === 'gateway' ? 'Rate Limiting & Routing' :
                'Service Node Active'
              }
            </span>
          ) : (
            <span className="text-tertiary">Hover nodes to inspect architecture</span>
          )}
        </div>
      </div>
    </div>
  )
}