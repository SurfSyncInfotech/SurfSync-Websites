import { useEffect, useRef, useState } from "react";

const COLORS = ["#f97316", "#fbbf24", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];

function useWidth(fallback) {
  const ref = useRef(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setWidth(next);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

export function LineChart({ data, unit = "application" }) {
  const [ref, measured] = useWidth(640);
  const [hover, setHover] = useState(null);
  const W = Math.max(260, measured);
  const H = W < 480 ? 200 : 240;
  const L = 32;
  const R = 12;
  const T = 14;
  const B = 30;
  const innerW = W - L - R;
  const innerH = H - T - B;
  const peak = Math.max(0, ...data.map((item) => item.value));
  const max = Math.max(4, Math.ceil(peak / 4) * 4);
  const x = (index) => L + (data.length > 1 ? (index * innerW) / (data.length - 1) : innerW / 2);
  const y = (value) => T + innerH - (value / max) * innerH;
  const points = data.map((item, index) => [x(index), y(item.value)]);
  const line = points.map(([px, py], index) => `${index ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1).toFixed(1)} ${T + innerH} L${x(0).toFixed(1)} ${T + innerH} Z`;
  const ticks = [0, 1, 2, 3, 4].map((step) => (max / 4) * step);
  const maxLabels = W < 480 ? 4 : 7;
  const every = Math.max(1, Math.ceil(data.length / maxLabels));
  const active = hover === null ? null : data[hover];

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const index = Math.round(((px - L) / innerW) * (data.length - 1));
    setHover(Math.min(data.length - 1, Math.max(0, index)));
  };

  return (
    <div className="line-chart-wrap" ref={ref}>
      <svg
        className="line-chart"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label={`Daily ${unit}s for the last ${data.length} days`}
      >
        <defs>
          <linearGradient id="line-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((tick) => (
          <g key={tick}>
            <line className="grid-line" x1={L} x2={W - R} y1={y(tick)} y2={y(tick)} />
            <text className="axis-label" x={L - 8} y={y(tick) + 4} textAnchor="end">
              {tick}
            </text>
          </g>
        ))}
        {data.map((item, index) =>
          (data.length - 1 - index) % every === 0 ? (
            <text key={item.label} className="axis-label" x={x(index)} y={H - 8} textAnchor="middle">
              {item.label}
            </text>
          ) : null
        )}
        <path d={area} fill="url(#line-chart-fill)" />
        <path d={line} className="chart-line" />
        {hover !== null ? <line className="hover-line" x1={x(hover)} x2={x(hover)} y1={T} y2={T + innerH} /> : null}
        {points.map(([px, py], index) =>
          data.length <= 14 || hover === index ? (
            <circle key={index} className="chart-dot" cx={px} cy={py} r={hover === index ? 5.5 : 3.5} />
          ) : null
        )}
      </svg>
      {active ? (
        <div
          className={`chart-tip${hover > data.length / 2 ? " is-left" : ""}`}
          style={{ left: x(hover), top: y(active.value) }}
        >
          <strong>
            {active.value} {active.value === 1 ? unit : `${unit}s`}
          </strong>
          <span>{active.label}</span>
        </div>
      ) : null}
    </div>
  );
}

export function Donut({ items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="donut">
      <svg className="donut-svg" viewBox="0 0 140 140" role="img" aria-label="Applications by role">
        <circle cx="70" cy="70" r={radius} className="donut-track" />
        {items.map((item, index) => {
          const length = total ? (item.value / total) * circumference : 0;
          const segment = (
            <circle
              key={item.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={COLORS[index % COLORS.length]}
              strokeWidth="18"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
            />
          );
          offset += length;
          return segment;
        })}
        <text x="70" y="70" textAnchor="middle" className="donut-total">
          {total}
        </text>
        <text x="70" y="88" textAnchor="middle" className="donut-caption">
          total
        </text>
      </svg>
      <ul className="legend">
        {items.map((item, index) => (
          <li key={item.label}>
            <span className="swatch" style={{ background: COLORS[index % COLORS.length] }} />
            <span className="legend-label" title={item.label}>
              {item.label}
            </span>
            <strong>{total ? Math.round((item.value / total) * 100) : 0}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
