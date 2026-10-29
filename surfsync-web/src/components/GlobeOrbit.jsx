import { useEffect, useRef } from "react";
import globeBase from "../assets/about-globe/base.webp";
import globeWeb from "../assets/about-globe/web.webp";
import globeMobile from "../assets/about-globe/mobile.webp";
import globeDigital from "../assets/about-globe/digital.webp";
import globeUx from "../assets/about-globe/ux.webp";
import globeCloud from "../assets/about-globe/cloud.webp";
import globeIt from "../assets/about-globe/it.webp";

/* artwork is 1536 x 1024; each card is a cut-out [left, top, right, bottom] of it */
const ART_W = 1536;
const CARDS = [
  [globeWeb, [180, 39, 539, 314]],
  [globeMobile, [1073, 29, 1399, 308]],
  [globeDigital, [41, 370, 386, 634]],
  [globeUx, [1187, 355, 1516, 649]],
  [globeCloud, [163, 667, 552, 982]],
  [globeIt, [1045, 699, 1426, 987]],
];

/* globe centre and the ring the cards travel on (artwork pixels) */
const CX = 780;
const CY = 470;
const RX = 640;
const RY = 345;
const LAP = 30; // seconds for the cards to go once round
const PULSE = 6; // seconds between flares of the globe
const BASE_TILT = (-8 * Math.PI) / 180;

const bump = (u, from, to) => {
  if (u <= from || u >= to) return 0;
  return Math.sin(((u - from) / (to - from)) * Math.PI) ** 2;
};

/* Transparent, frameless animation built from the artwork, following the clip you sent. The
   globe stays where it is. The six cards keep travelling round it on one ring (behind the globe
   over the top, in front of it along the bottom), a light runs round that same ring, and the
   globe flares with a soft glow every few seconds. */
/* a light that runs round the card ring: the upper half is drawn behind the globe, the lower half in front */
function GlobeLight({ half }) {
  const id = `ring-${half}`;
  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x="0" y={half === "back" ? 0 : CY} width="1536" height="1024" transform={`rotate(-8 ${CX} ${CY})`} />
        </clipPath>
        <linearGradient id={`${id}-warm`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff9a1f" stopOpacity="0" />
          <stop offset="0.6" stopColor="#ffb347" />
          <stop offset="1" stopColor="#fff2cc" />
        </linearGradient>
        <linearGradient id={`${id}-cool`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e8bff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#5db4ff" />
          <stop offset="1" stopColor="#e6f6ff" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        <ellipse className="ring-trail is-warm" cx={CX} cy={CY} rx={RX} ry={RY} transform={`rotate(-8 ${CX} ${CY})`} stroke={`url(#${id}-warm)`} />
        <ellipse className="ring-trail is-cool" cx={CX} cy={CY} rx={RX - 26} ry={RY - 22} transform={`rotate(-8 ${CX} ${CY})`} stroke={`url(#${id}-cool)`} />
      </g>
    </>
  );
}

function GlobeOrbit() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const world = stage.firstElementChild;
    const cards = [...world.querySelectorAll(".globe-card")];
    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spot = (angle) => {
      const x = RX * Math.cos(angle);
      const y = RY * Math.sin(angle);
      return [CX + x * Math.cos(BASE_TILT) - y * Math.sin(BASE_TILT), CY + x * Math.sin(BASE_TILT) + y * Math.cos(BASE_TILT)];
    };
    // The ring is cut into equal lengths, so the cards stay the same distance apart all the way
    // round. Each card keeps its place in the artwork's order, and the whole set turns together.
    const N = 720;
    const table = [0];
    let prev = spot(0);
    for (let n = 1; n <= N; n += 1) {
      const p = spot((n / N) * Math.PI * 2);
      table.push(table[n - 1] + Math.hypot(p[0] - prev[0], p[1] - prev[1]));
      prev = p;
    }
    const perimeter = table[N];
    const angleAt = (fraction) => {
      const target = (((fraction % 1) + 1) % 1) * perimeter;
      let lo = 0;
      let hi = N;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (table[mid] <= target) lo = mid;
        else hi = mid;
      }
      const t = (target - table[lo]) / (table[hi] - table[lo] || 1);
      return ((lo + t) / N) * Math.PI * 2;
    };
    const angleOf = (x0, y0, x1, y1) => {
      const mx = (x0 + x1) / 2;
      const my = (y0 + y1) / 2;
      let best = 0;
      let gap = Infinity;
      for (let a = 0; a < Math.PI * 2; a += 0.01) {
        const [px, py] = spot(a);
        const d = (px - mx) ** 2 + (py - my) ** 2;
        if (d < gap) {
          gap = d;
          best = a;
        }
      }
      return best;
    };
    const order = CARDS.map(([, box], i) => [angleOf(...box), i]).sort((a, b) => a[0] - b[0]);
    const slot = [];
    order.forEach(([, i], rank) => {
      slot[i] = rank / CARDS.length;
    });
    const start = order[0][0] / (Math.PI * 2);
    const base = world.querySelector(".globe-base");
    const glow = world.querySelector(".globe-glow");

    let time = 0;
    let last = 0;
    let frame = 0;
    let visible = true;

    const paint = () => {
      const k = stage.clientWidth / ART_W;
      const flare = bump((time % PULSE) / PULSE, 0, 0.55);
      base.style.filter = `brightness(${1 + 0.3 * flare}) saturate(${1 + 0.45 * flare})`;
      glow.style.opacity = String(0.35 + 0.65 * flare);
      glow.style.transform = `translate(-50%, -50%) scale(${1 + 0.08 * flare})`;

      cards.forEach((card, i) => {
        const [, [x0, y0, x1, y1]] = CARDS[i];
        const [x, y] = spot(angleAt(start + slot[i] + time / LAP));
        const depth = Math.max(-1, Math.min(1, (y - CY) / RY)); // +1 nearest the viewer, -1 furthest
        const scale = 0.96 + 0.14 * depth;
        card.style.transform =
          `translate(${(x - (x1 - x0) / 2) * k}px, ${(y - (y1 - y0) / 2) * k}px) scale(${scale})`;
        card.style.zIndex = depth > 0 ? "4" : "1";
        card.style.filter = `brightness(${0.84 + 0.16 * ((depth + 1) / 2)})`;
      });
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (!visible || quiet.matches) return;
      time += dt;
      paint();
    };

    const resize = new ResizeObserver(paint);
    resize.observe(stage);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    seen.observe(stage);
    paint();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
    };
  }, []);

  return (
    <div
      className="about-blob"
      role="img"
      aria-label="Globe surrounded by web, mobile, cloud, design, and consulting services"
    >
      <div className="globe-stage" ref={stageRef}>
        <div className="globe-world">
          <span className="globe-glow" aria-hidden="true" />
          <svg className="globe-light is-back" viewBox="0 0 1536 1024" aria-hidden="true">
            <GlobeLight half="back" />
          </svg>
          <img loading="lazy" decoding="async" className="globe-base" src={globeBase} alt="" />
          <span className="globe-shine" aria-hidden="true" />
          <svg className="globe-light is-front" viewBox="0 0 1536 1024" aria-hidden="true">
            <GlobeLight half="front" />
          </svg>
          {CARDS.map(([src, [x0, , x1]]) => (
            <img loading="lazy" decoding="async"
              key={src}
              className="globe-card"
              src={src}
              alt=""
              style={{ width: `${((x1 - x0) / ART_W) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GlobeOrbit;
