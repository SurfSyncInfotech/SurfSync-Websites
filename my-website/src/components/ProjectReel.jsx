import { useEffect, useRef, useState } from "react";

const POSTER_RATIO = 600 / 380;

/* Looping wheel of project posters. The resting picture is seven posters edge to
   edge, the middle one facing straight on and the outer ones taller and turned
   towards the viewer. The wheel drifts left on its own, pauses while the pointer
   is over it, can be dragged (with a little momentum, then snaps to a poster)
   and brings a clicked poster to the middle. Sizes come from the wheel's own
   width, so zooming and resizing keep the same picture. */
const DRIFT = 0.16; // posters per second
const MOMENTUM = 0.6; // share of the release speed that keeps carrying
const PARALLAX = 0.3; // how far the picture slides inside its card
const DEPTH_FADE = 0.55; // how much the outer posters dim

const wrap = (value, count) => {
  const half = count / 2;
  return ((((value + half) % count) + count) % count) - half;
};

function ProjectReel({ shots }) {
  const reelRef = useRef(null);
  // the wheel stays hidden until its pictures are in, then fades in all at once
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    const done = () => live && setReady(true);
    const timer = window.setTimeout(done, 4000);
    Promise.all(
      shots.map(
        ([src]) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            (img.decode ? img.decode() : Promise.resolve()).then(resolve, resolve);
          })
      )
    ).then(() => {
      window.clearTimeout(timer);
      done();
    });
    return () => {
      live = false;
      window.clearTimeout(timer);
    };
  }, [shots]);
  // two laps of the posters, so the one that wraps round does so far outside the
  // frame and slides in and out instead of fading
  const laps = [...shots, ...shots];
  const count = laps.length;

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return undefined;
    const tiles = [...reel.children];
    const images = tiles.map((tile) => tile.firstElementChild);
    const grow = (slot) => 1 + 0.027 * slot * slot;
    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)");

    const state = {
      pos: 0, // which poster sits in the middle, in posters (fractional while moving)
      target: null, // poster to ease to after a click or a release
      velocity: 0, // posters per second while coasting
      hover: false,
      dragging: false,
      visible: true,
      base: 0,
      step: 0,
      reach: 3,
    };

    const paint = () => {
      const { base, step, reach } = state;
      if (!base) return;
      tiles.forEach((tile, index) => {
        const slot = wrap(index - state.pos, count);
        const edge = Math.abs(slot);
        // posters fully outside the frame are skipped
        tile.style.visibility = edge > reach + 1.1 ? "hidden" : "visible";
        tile.style.width = `${base}px`;
        const turn = slot * -6.5;
        tile.style.transform =
          `translate(-50%, -50%) translateX(${step * slot}px) ` +
          `perspective(${base * 3.2}px) rotateY(${turn}deg) ` +
          `scale(${1 / Math.cos((turn * Math.PI) / 180)}, ${grow(slot)})`;
        tile.style.zIndex = String(Math.round(100 - edge * 10));
        // outer posters dim a little, like the inside of a drum
        tile.style.filter = `brightness(${1 - DEPTH_FADE * 0.22 * Math.min(edge / reach, 1.3) ** 2})`;
        // the picture slides the opposite way inside its card
        images[index].style.transform = `scale(1.1) translateX(${-slot * PARALLAX * 2.2}%)`;
      });
    };

    const measure = () => {
      const width = reel.clientWidth;
      // seven posters across (three on phones); the rest sit round the back
      const across = width < 700 ? 3 : 7;
      state.reach = (across - 1) / 2;
      const gap = width * 0.004;
      state.base = (width - gap * (across - 1)) / across;
      state.step = state.base * 0.99 + gap;
      reel.style.height = `${state.base * POSTER_RATIO * grow(state.reach) * 1.06 + 12}px`;
      paint();
    };

    let last = 0;
    let frame = 0;
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (!state.visible || state.dragging) return;
      if (state.target !== null) {
        const diff = state.target - state.pos;
        if (Math.abs(diff) < 0.001) {
          state.pos = state.target;
          state.target = null;
        } else {
          state.pos += diff * Math.min(1, dt * 7);
        }
      } else if (Math.abs(state.velocity) > 0.02) {
        state.pos += state.velocity * dt;
        state.velocity *= Math.exp(-dt * 3.2);
        if (Math.abs(state.velocity) <= 0.02) {
          state.velocity = 0;
          state.target = Math.round(state.pos);
        }
      } else if (!state.hover && !quiet.matches) {
        state.pos += DRIFT * dt;
      }
      paint();
    };

    // drag to spin, tap to focus
    let startX = 0;
    let startPos = 0;
    let moved = 0;
    let lastX = 0;
    let lastT = 0;
    let speed = 0;
    let pressed = -1;
    const onDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      state.dragging = true;
      state.target = null;
      state.velocity = 0;
      startX = lastX = event.clientX;
      startPos = state.pos;
      lastT = performance.now();
      moved = 0;
      speed = 0;
      pressed = tiles.indexOf(event.target.closest?.(".proj-reel-tile"));
      reel.setPointerCapture?.(event.pointerId);
      reel.classList.add("is-dragging");
    };
    const onMove = (event) => {
      if (!state.dragging) return;
      const dx = event.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      state.pos = startPos - dx / state.step;
      const now = performance.now();
      const dt = (now - lastT) / 1000;
      if (dt > 0) speed = (-(event.clientX - lastX) / state.step) / dt;
      lastX = event.clientX;
      lastT = now;
      paint();
    };
    const onUp = (event) => {
      if (!state.dragging) return;
      state.dragging = false;
      reel.classList.remove("is-dragging");
      reel.releasePointerCapture?.(event.pointerId);
      if (moved < 6) {
        if (pressed >= 0) {
          // shortest way round to bring that poster to the middle
          state.target = state.pos + wrap(pressed - state.pos, count);
        }
      } else if (Math.abs(speed) > 1) {
        state.velocity = Math.max(-6, Math.min(6, speed)) * MOMENTUM;
      } else {
        state.target = Math.round(state.pos);
      }
    };
    const onEnter = () => {
      state.hover = true;
    };
    const onLeave = () => {
      state.hover = false;
    };

    const resize = new ResizeObserver(measure);
    resize.observe(reel);
    const seen = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
    });
    seen.observe(reel);
    reel.addEventListener("pointerdown", onDown);
    reel.addEventListener("pointermove", onMove);
    reel.addEventListener("pointerup", onUp);
    reel.addEventListener("pointercancel", onUp);
    reel.addEventListener("pointerenter", onEnter);
    reel.addEventListener("pointerleave", onLeave);
    measure();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      reel.removeEventListener("pointerdown", onDown);
      reel.removeEventListener("pointermove", onMove);
      reel.removeEventListener("pointerup", onUp);
      reel.removeEventListener("pointercancel", onUp);
      reel.removeEventListener("pointerenter", onEnter);
      reel.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return (
    <div className={`proj-reel${ready ? " is-ready" : ""}`} ref={reelRef}>
      {laps.map(([src, alt], index) => {
        const copy = index >= shots.length;
        return (
          <div className="proj-reel-tile" key={`${alt}-${copy ? "b" : "a"}`} aria-hidden={copy || undefined}>
            <img loading="lazy" decoding="async" src={src} alt={copy ? "" : alt} draggable="false" />
          </div>
        );
      })}
    </div>
  );
}

export default ProjectReel;
