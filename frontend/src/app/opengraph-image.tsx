import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HomeOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FFF6EA, #EDD3BE)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "#A65B2E", display: "flex" }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: "#2E5D3A" }}>Mums &amp; Cubs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.1, color: "#211E19" }}>
            Rooted Learning, Brighter Tomorrows
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "#665F54", maxWidth: 900 }}>
            A nurturing space where Montessori meets Vedic wisdom.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
