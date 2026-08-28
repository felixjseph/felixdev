import { ImageResponse } from "next/og";

export const alt = "Felix Castañeda — Full-Stack & AI Automation Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#F7F7F2",
          color: "#111316",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          overflow: "hidden",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "18px solid #2457FF",
            borderRadius: "50%",
            height: "470px",
            opacity: 0.95,
            position: "absolute",
            right: "-80px",
            top: "-130px",
            transform: "rotate(-18deg)",
            width: "780px",
          }}
        />
        <div
          style={{
            background: "#BCE7D0",
            border: "8px solid #111316",
            borderRadius: "50%",
            bottom: "88px",
            display: "flex",
            height: "62px",
            position: "absolute",
            right: "208px",
            width: "62px",
          }}
        />
        <div
          style={{
            background: "#2457FF",
            borderRadius: "50%",
            display: "flex",
            height: "34px",
            left: "148px",
            position: "absolute",
            top: "116px",
            width: "34px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "860px" }}>
          <div style={{ color: "#2457FF", display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
            SYSTEMS IN MOTION
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02, marginTop: 28 }}>
            Felix Castañeda
          </div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.2, marginTop: 24 }}>
            Full-Stack &amp; AI Automation Developer
          </div>
          <div style={{ color: "#2457FF", display: "flex", fontSize: 30, fontWeight: 600, marginTop: 54 }}>
            Software that works. Automation that keeps working.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
