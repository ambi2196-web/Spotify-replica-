"use client";

import { useState, useEffect } from "react";

export default function TimeGreeting() {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  if (!greeting) return null;
  return (
    <p className="mb-2 text-sm font-medium text-text-secondary">{greeting}</p>
  );
}
