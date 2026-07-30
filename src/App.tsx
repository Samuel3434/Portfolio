import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./section/About";
import Hero from "./section/Hero";
import MobileAbout from "./section/MobileAbout";
import MobileHero from "./section/MobileHero";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const hashUpdateTimeout = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const snap = new Snap(lenis, {
      type: "proximity",
      lerp: 0.08,
      duration: 0.7,
    });

    const heroEl = document.getElementById("hero");
    const aboutEl = document.getElementById("about");
    const experiencesEl = document.getElementById("experiences");
    if (heroEl) snap.addElement(heroEl);
    if (aboutEl) snap.addElement(aboutEl);
    if (experiencesEl) snap.addElement(experiencesEl);

    const scrollToHash = (immediate = false) => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          lenis.scrollTo(
            el,
            immediate ? { immediate: true } : { duration: 1.2 },
          );
        }
      }
    };

    scrollToHash(true);

    const handleHashChange = () => scrollToHash();
    window.addEventListener("hashchange", handleHashChange);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hashUpdateTimeout.current) {
              clearTimeout(hashUpdateTimeout.current);
            }
            hashUpdateTimeout.current = window.setTimeout(() => {
              const id = entry.target.id;
              if (id && window.location.hash !== `#${id}`) {
                history.replaceState(null, "", `#${id}`);
              }
              hashUpdateTimeout.current = null;
            }, 300);
          }
        }
      },
      { threshold: 0.4 },
    );

    if (heroEl) observer.observe(heroEl);
    if (aboutEl) observer.observe(aboutEl);
    if (experiencesEl) observer.observe(experiencesEl);

    return () => {
      if (hashUpdateTimeout.current) {
        clearTimeout(hashUpdateTimeout.current);
      }
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
      snap.destroy();
      lenis.destroy();
      gsap.ticker.lagSmoothing(1.33);
    };
  }, []);

  return (
    <>
      {isMobile ? <MobileHero /> : <Hero />}
      {isMobile ? <MobileAbout /> : <About />}
    </>
  );
}

export default App;
