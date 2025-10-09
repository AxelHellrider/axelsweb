"use client";

import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            {/* Overlay text */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
                fontFamily: "'Courier New', Courier, monospace",
                textAlign: "center",
                pointerEvents: "none"
            }}>
                <h1 style={{ fontSize: "8rem", marginBottom: "1rem", textShadow: "0 0 20px #ccc" }}>
                    404
                </h1>
                <p style={{ fontSize: "1.5rem", marginBottom: "2rem", textShadow: "0 0 10px #ccc" }}>
                    The path has vanished into the Eternal Campfire…
                </p>
                <Link href="/"
                      style={{
                          pointerEvents: "auto",
                          color: "#111",
                          background: "#ccc",
                          padding: "0.8rem 1.5rem",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontWeight: "bold",
                          boxShadow: "0 0 10px #ccc"
                      }}>
                    Return to Safety
                </Link>
            </div>

            {/* Optional: Glitchy flicker effect */}
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(255,111,97,0.05)",
                animation: "flicker 0.25s infinite alternate"
            }} />
        </div>
    );
}
