import { ImageResponse } from "next/og";
import { SITE_PROFILE } from "@/lib/projects.config";

export const runtime = "edge";
export const alt = `${SITE_PROFILE.name} — ${SITE_PROFILE.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#080405",
          backgroundImage:
            "radial-gradient(ellipse at 70% 30%, rgba(224, 60, 60, 0.22), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(180, 20, 30, 0.15), transparent 45%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#f4f0e8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 700,
              color: "#ff5252",
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "rgba(244, 240, 232, 0.6)",
              textTransform: "uppercase",
            }}
          >
            {SITE_PROFILE.brandName.toUpperCase()} / {SITE_PROFILE.name.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Product Engineer &amp; Systems Builder
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "rgba(244, 240, 232, 0.65)",
              margin: 0,
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Full-Stack Products • AI Automation • DeepOS Systems
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <span style={{ fontSize: "18px", color: "rgba(244, 240, 232, 0.45)" }}>
            nexorithm.dev • aurix-sepia.vercel.app • legitclub.xyz
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#ff5252",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            AVAILABLE FOR BUILDS ↗
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
