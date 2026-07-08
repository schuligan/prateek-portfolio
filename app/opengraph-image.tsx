import { ImageResponse } from "next/og";

export const alt = "Prateek Jha — AI Product & Program Leader";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded OG/social card (dark aurora + aqua accent). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 15% 10%, #16324a 0%, #0A0E14 55%)",
          color: "#EDE6DA",
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            background: "#3DE1C4",
            borderRadius: 4,
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          I scale products, teams, and the
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          systems they run on.
        </div>
        <div style={{ fontSize: 34, color: "#9BA3AE", marginTop: 36 }}>
          Prateek Jha · AI Product &amp; Program Leader
        </div>
      </div>
    ),
    { ...size },
  );
}
