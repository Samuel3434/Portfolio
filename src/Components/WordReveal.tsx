import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface WordRevealProps {
  text: string;
  style?: React.CSSProperties;
  as?: "p" | "blockquote" | "span" | "div";
}

export function WordReveal({ text, style, as: Tag = "p" }: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tl: gsap.core.Timeline | null = null;

    const words: HTMLElement[] = [];
    el.textContent = "";
    const segments = text.split(/(\n)/);
    for (const seg of segments) {
      if (seg === "\n") {
        el.appendChild(document.createElement("br"));
      } else {
        const tokens = seg.split(/(\s+)/);
        for (const t of tokens) {
          if (t.length === 0) continue;
          if (t.trim() === "") {
            el.appendChild(document.createTextNode(t));
          } else {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = t;
            el.appendChild(span);
            words.push(span);
          }
        }
      }
    }

    if (!words.length) return;

    gsap.set(words, { display: "inline-block", overflow: "hidden" });

    tl = gsap
      .timeline()
      .set(el, { autoAlpha: 1 })
      .fromTo(
        words,
        { transformOrigin: "50% 0%", scaleY: 0, willChange: "transform" },
        { ease: "back.out(1.7)", scaleY: 1, stagger: 0.015, duration: 0.3 },
      );

    return () => {
      if (tl) tl.kill();
    };
  }, [text]);

  return <Tag ref={ref as never} style={style} />;
}
