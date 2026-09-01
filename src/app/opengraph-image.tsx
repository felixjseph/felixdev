import { ImageResponse } from "next/og";

export const alt = "Felix Joseph Castañeda — Full-Stack Web & AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#070707",
          color: "#F7F7F2",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "56px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            background: "linear-gradient(135deg, #69E7F4 0%, #A9A5FF 48%, #FFBD87 100%)",
            borderRadius: "50%",
            display: "flex",
            filter: "blur(36px)",
            height: 420,
            opacity: 0.33,
            position: "absolute",
            right: -80,
            top: 105,
            width: 420,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", width: "100%" }}>
          <div style={{ alignItems: "center", display: "flex", fontSize: 20, justifyContent: "space-between", letterSpacing: 3 }}>
            <div style={{ display: "flex" }}>F/J · PORTFOLIO</div>
            <div style={{ display: "flex" }}>AGENTIC AI / FULL-STACK / AUTOMATION</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -5, lineHeight: 0.9 }}>
              Felix Joseph Castañeda
            </div>
            <div style={{ color: "#A8A8A2", display: "flex", fontSize: 34, marginTop: 30 }}>
              Systems that turn busywork into forward motion.
            </div>
          </div>
          <div style={{ alignItems: "center", borderTop: "1px solid #454545", display: "flex", fontSize: 20, justifyContent: "space-between", letterSpacing: 2, paddingTop: 22 }}>
            <div style={{ display: "flex" }}>FULL-STACK WEB &amp; AI DEVELOPER</div>
            <div style={{ display: "flex" }}>PHILIPPINES</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
