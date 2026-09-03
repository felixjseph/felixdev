"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./ui-icons";
import styles from "./contact-actions.module.css";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; if (timer.current) clearTimeout(timer.current); };
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      if (!mounted.current) return;
      setStatus("copied");
    } catch {
      if (!mounted.current) return;
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 4500);
  };

  return (
    <span className={styles.copyWrap}>
      <button aria-label="Copy email address" className={styles.copy} type="button" onClick={copy}>
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        <span>{status === "copied" ? "Copied" : "Copy"}</span>
      </button>
      <span className={status === "error" ? styles.error : "sr-only"} role="status">
        {status === "copied" ? "Email address copied." : status === "error" ? "Copy unavailable. Select the email address to copy it manually." : ""}
      </span>
    </span>
  );
}
