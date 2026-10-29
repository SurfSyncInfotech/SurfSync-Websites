import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "./api";

export function useResource(path, onUnauthorized) {
  const [state, setState] = useState({ rows: [], loading: Boolean(path), error: "" });
  const authRef = useRef(onUnauthorized);

  useEffect(() => {
    authRef.current = onUnauthorized;
  });

  const load = useCallback(async () => {
    if (!path) return;
    try {
      const rows = await api(path);
      setState({ rows: Array.isArray(rows) ? rows : [], loading: false, error: "" });
    } catch (error) {
      if (error.status === 401) authRef.current();
      else setState((current) => ({ ...current, loading: false, error: error.message }));
    }
  }, [path]);

  useEffect(() => {
    if (!path) {
      setState({ rows: [], loading: false, error: "" });
      return undefined;
    }
    load();
    const onFocus = () => {
      if (document.visibilityState === "visible") load();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load, path]);

  const retry = useCallback(() => {
    if (!path) return;
    setState((current) => ({ ...current, loading: true, error: "" }));
    load();
  }, [load, path]);

  return { ...state, load, retry };
}
