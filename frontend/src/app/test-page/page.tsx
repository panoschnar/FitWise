"use client"
import { useState, useEffect } from "react";
import ModelScene from "./3dModelScene";

export default function HomePage() {
    const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    const timers = visible.map((v, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * 300) // stagger fade-in by 300ms
    );

    return () => timers.forEach(clearTimeout);
  }, []);
     const cards = [
    { title: "Card 1", content: "This is the first card." },
    { title: "Card 2", content: "This is the second card." },
    { title: "Card 3", content: "This is the third card." },
    { title: "Card 4", content: "This is the fourth card." },
  ];
  return (
    <main style={{ color: "#000", overflowX: "hidden", margin: 0 }}>
      {/* 3D Canvas always full screen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0, // behind content
          pointerEvents: "none", // allow scrolling and interaction on top
        }}
      >
         <ModelScene />
        
      </div>

      {/* Page content over canvas */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 600, margin: 0 }}>
          Innovative Design
        </h1>
        <p style={{ fontSize: "1.125rem", opacity: 0.7, marginTop: "1rem" }}>
          Scroll down to explore
        </p>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: 300, margin: 0 }}>
          Precision. Clarity. Glass.
        </h2>
      </section>

      <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        position: "relative",
        zIndex: 10,
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "1.25rem", opacity: 0.7 }}>
        Scroll to see more 3D effects.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              padding: "2rem",
              borderRadius: "1rem",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
              color: "#fff",
              textAlign: "center",
              opacity: visible[index] ? 1 : 0,
              transform: visible[index] ? "translateY(0px)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </section>
       <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p style={{ fontSize: "1.25rem", opacity: 0.7 }}>Scroll even more to see more 3D effects.</p>
      </section>
    </main>
  );
}
