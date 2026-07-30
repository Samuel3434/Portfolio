import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  style?: React.CSSProperties;
  as?: "p" | "blockquote" | "span" | "div";
}

export function TextReveal({ text, style, as: Tag = "p" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    (async () => {
      const Splitting = (await import("splitting")).default;
      Splitting({ target: el });
      if (cancelled) return;

      const chars = el.querySelectorAll<HTMLElement>(".char");
      if (!chars.length) return;

      gsap.set(chars, { display: "inline-block" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
        .fromTo(
          chars,
          {
            willChange: "transform",
            transformOrigin: "50% 100%",
            scaleY: 0,
          },
          {
            ease: "power3.in",
            scaleY: 1,
            stagger: 0.02,
          },
        );
    })();

    return () => {
      cancelled = true;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [text]);

  return (
    <Tag ref={ref as never} data-splitting style={style}>
      {text}
    </Tag>
  );
}
