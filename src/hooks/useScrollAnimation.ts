import { useEffect, useRef } from "react";

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const sections = document.querySelectorAll(".section");
    const cards = document.querySelectorAll(".metric-card, .card, .workflow-card");

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    cards.forEach((card, index) => {
      card.classList.add(`stagger-${Math.min(index % 6 + 1, 6)}`);
      observerRef.current?.observe(card);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
};
