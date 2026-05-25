"use client";

import { useEffect, useState } from "react";

/** Phones and tablets — speed rails visible below 1024px */
export function useTouchTablet() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setActive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return active;
}
