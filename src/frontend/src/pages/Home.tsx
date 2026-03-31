import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowUp,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Play,
  Share2,
  Star,
  Sun,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

// ─── Theme Hook ───────────────────────────────────────────────
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("aurex-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light-mode");
    } else {
      html.classList.add("light-mode");
    }
    localStorage.setItem("aurex-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}

// ─── Section IDs ──────────────────────────────────────────────
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ─── Portfolio Data ───────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Influencer Reel",
  "Celebrity Content",
  "Brand Advertisement",
  "YouTube Video Edit",
  "Social Media Reel",
  "Cinematic Visuals",
] as const;

const PORTFOLIO_ITEMS = [
  {
    title: "Fitness Influencer Highlights",
    category: "Influencer Reel",
    image: "/assets/portfolio-reel.dim_800x450.jpg",
    gradient: "from-purple-900/80 to-violet-950/80",
  },
  {
    title: "Celebrity Brand Shoot",
    category: "Celebrity Content",
    image: "/assets/portfolio-music.dim_800x450.jpg",
    gradient: "from-amber-900/80 to-yellow-950/80",
  },
  {
    title: "Product Launch Campaign",
    category: "Brand Advertisement",
    image: "/assets/portfolio-corporate.dim_800x450.jpg",
    gradient: "from-blue-900/80 to-indigo-950/80",
  },
  {
    title: "Tech Review Deep Dive",
    category: "YouTube Video Edit",
    image: "/assets/portfolio-vlog.dim_800x450.jpg",
    gradient: "from-green-900/80 to-emerald-950/80",
  },
  {
    title: "Fashion Reel Series",
    category: "Social Media Reel",
    image: "/assets/portfolio-reel.dim_800x450.jpg",
    gradient: "from-rose-900/80 to-pink-950/80",
  },
  {
    title: "Cinematic Mountain Film",
    category: "Cinematic Visuals",
    image: "/assets/portfolio-colorgrade.dim_800x450.jpg",
    gradient: "from-slate-900/80 to-zinc-950/80",
  },
];

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    text: "Aurex Studio delivers amazing video edits with great creativity and attention to detail. Highly recommended!!!",
    author: "Samad Khan",
    stars: 5,
  },
  {
    text: "Go and edit your videos only at Aurex Studio Bahraich and enhance your quality 🔥",
    author: "Tazeem Malik",
    stars: 5,
  },
  {
    text: "Amazing aesthetic studio 😍🔥",
    author: "Cutting Room",
    stars: 5,
  },
  {
    text: "Absolutely top-notch editing studio! Professional work, amazing quality, and super smooth experience",
    author: "Krish Miglani",
    stars: 5,
  },
];

// ─── Services ─────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🎬",
    title: "YouTube Video Editing",
    desc: "Long-form content that hooks viewers from intro to end card.",
  },
  {
    icon: "📱",
    title: "Social Media Reels",
    desc: "Short, punchy reels engineered for maximum reach and shares.",
  },
  {
    icon: "⭐",
    title: "Influencer Content",
    desc: "Personal brand videos that build authentic audience connection.",
  },
  {
    icon: "👑",
    title: "Celebrity Content",
    desc: "Premium edits for high-profile talent and public figures.",
  },
  {
    icon: "📣",
    title: "Brand Advertisements",
    desc: "High-converting ad creatives for digital and broadcast media.",
  },
  {
    icon: "🎞️",
    title: "Cinematic Visuals",
    desc: "Breathtaking cinematic sequences with expert color grading.",
  },
  {
    icon: "🎨",
    title: "Color Grading",
    desc: "Hollywood-grade color science to set your visual tone.",
  },
  {
    icon: "🖼️",
    title: "Thumbnail Design",
    desc: "Click-worthy thumbnails designed with data-backed psychology.",
  },
];

// ─── STATS ────────────────────────────────────────────────────
const STATS = [
  { number: "8+", label: "Years of Experience", target: 8, suffix: "+" },
  {
    number: "10,000+",
    label: "Projects Completed",
    target: 10000,
    suffix: "+",
  },
  { number: "500+", label: "Regular Clients", target: 500, suffix: "+" },
  { number: "24hrs", label: "Delivery Time", target: 24, suffix: "hrs" },
];

// ─── Typing phrases ───────────────────────────────────────────
const TYPING_PHRASES = [
  "Precision. Creativity. Impact.",
  "Your Vision. Our Craft.",
  "Cinematic Edits. Real Results.",
];

// ─── Main Component ───────────────────────────────────────────
export default function Home() {
  const { isDark, toggle } = useTheme();
  const { actor } = useActor();
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : false;

  // Page loading animation
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Loading Overlay ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: "oklch(0.06 0.03 290)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display font-bold text-4xl tracking-widest mb-2">
                <span style={{ color: "oklch(0.58 0.22 292)" }}>AUREX</span>{" "}
                <span className="text-white">STUDIO</span>
              </h1>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-8">
                Elite Video Editing
              </p>
              {/* Progress bar */}
              <div
                className="w-48 h-0.5 rounded-full overflow-hidden mx-auto"
                style={{ background: "oklch(0.25 0.05 292)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.58 0.22 292), oklch(0.72 0.17 72))",
                    boxShadow: "0 0 12px oklch(0.58 0.22 292 / 0.8)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Glowing Cursor (desktop only) ── */}
      {isDesktop && <GlowCursor />}

      {/* ── Main App ── */}
      <div
        className={`min-h-screen cinematic-bg transition-all duration-300 ${
          isDark ? "" : "light-mode"
        }`}
      >
        <Navbar isDark={isDark} onToggleTheme={toggle} />
        <main>
          <HeroSection />
          <ShowreelSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <QuoteSection actor={actor} />
          <MapSection />
        </main>
        <Footer />
        <FloatingButtons />
        <BackToTop />
        <CookieConsent />
      </div>
    </>
  );
}

// ─── Glow Cursor ──────────────────────────────────────────────
function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, oklch(0.58 0.22 292 / 0.6), transparent)",
        border: "1px solid oklch(0.58 0.22 292 / 0.8)",
        pointerEvents: "none",
        zIndex: 9998,
        transition: "transform 0.1s ease",
        willChange: "transform",
      }}
    />
  );
}

// ─── Cookie Consent ───────────────────────────────────────────
function CookieConsent() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem("aurex-cookie-consent"),
  );

  const dismiss = () => {
    localStorage.setItem("aurex-cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-4 no-print"
          style={{
            background: "oklch(0.1 0.04 290 / 0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid oklch(0.58 0.22 292 / 0.25)",
          }}
        >
          <p className="text-sm text-white/70">
            We use essential cookies to make this site work.
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
            style={{
              background: "oklch(0.58 0.22 292)",
              boxShadow: "0 0 10px oklch(0.58 0.22 292 / 0.5)",
            }}
            data-ocid="cookie.confirm_button"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Back to Top ──────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          type="button"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center no-print"
          style={{
            background: "oklch(0.1 0.04 290 / 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid oklch(0.58 0.22 292 / 0.4)",
            boxShadow: "0 0 14px oklch(0.58 0.22 292 / 0.25)",
          }}
          data-ocid="nav.button"
        >
          <ArrowUp size={16} style={{ color: "oklch(0.58 0.22 292)" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({
  isDark,
  onToggleTheme,
}: { isDark: boolean; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", id: "hero" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "quote" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-glass py-3" : "py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="font-display font-bold text-xl tracking-widest neon-purple"
          data-ocid="nav.link"
        >
          AUREX <span className="neon-gold">STUDIO</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => scrollTo(l.id)}
                className="text-foreground/70 hover:text-foreground transition-colors hover:neon-purple"
                data-ocid="nav.link"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/official.aurexstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full glass hover:scale-110 transition-transform"
            aria-label="Toggle theme"
            data-ocid="nav.toggle"
          >
            {isDark ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="neon-purple" />
            )}
          </button>
          <Button
            size="sm"
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => scrollTo("quote")}
            data-ocid="nav.primary_button"
          >
            Get a Quote
          </Button>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/30"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo(l.id);
                      setOpen(false);
                    }}
                    className="text-foreground/80 hover:text-foreground w-full text-left text-sm font-medium"
                    data-ocid="nav.link"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Typing Animation ─────────────────────────────────────────
function TypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      }, 50);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <div className="h-8 flex items-center justify-center mb-8">
      <span
        className="font-display font-semibold text-lg sm:text-xl tracking-wide"
        style={{ color: "oklch(0.58 0.22 292)" }}
      >
        {displayed}
        <span
          className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
          style={{ background: "oklch(0.72 0.17 72)" }}
        />
      </span>
    </div>
  );
}

// ─── Animated Stat Number ─────────────────────────────────────
function AnimatedStat({
  target,
  suffix,
  triggered,
}: {
  target: number;
  suffix: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [triggered, target]);

  const formatted = count >= 1000 ? count.toLocaleString() : String(count);

  return (
    <span className="text-foreground">
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass neon-border-purple rounded-full px-4 py-1.5 mb-6 text-xs font-medium tracking-wider text-foreground/70 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Professional Video Editing Studio
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-4 leading-none">
          <span className="neon-purple">AUREX</span>{" "}
          <span className="text-foreground">STUDIO</span>
        </h1>
        <div
          className="h-0.5 w-32 mx-auto mb-6"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.58 0.22 292), oklch(0.72 0.17 72))",
          }}
        />

        {/* Tagline */}
        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-4 whitespace-pre-line">
          {`We deliver elite video editing for influencers, celebrities & modern brands — transforming raw footage into powerful visual experiences. From high-converting advertisements to cinematic reels and YouTube content, every frame is crafted to captivate, engage and elevate your presence.

Precision. Creativity. Impact. That's what defines us.

Based in Bahraich, Uttar Pradesh.

Wedding cinematic edits available upon request.`}
        </p>

        {/* Typing animation */}
        <TypingText />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon-sm px-8 font-semibold"
            onClick={() => scrollTo("quote")}
            data-ocid="hero.primary_button"
            style={{ transition: "all 0.2s" }}
          >
            Get a Quote
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/60 px-8 font-semibold"
            onClick={() => scrollTo("portfolio")}
            data-ocid="hero.secondary_button"
            style={{ transition: "all 0.2s" }}
          >
            View Portfolio
          </Button>
        </div>

        {/* Stats with counter animation */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center px-4 py-5"
              style={{
                background: "oklch(var(--card) / 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.58 0.22 292 / 0.2)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)",
              }}
            >
              <div className="text-2xl sm:text-3xl font-display font-bold">
                <AnimatedStat
                  target={s.target}
                  suffix={s.suffix}
                  triggered={statsVisible}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Showreel ─────────────────────────────────────────────────
function ShowreelSection() {
  return (
    <section id="showreel" className="section-alt py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="OUR SHOWREEL" />
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden mt-10"
          style={{
            aspectRatio: "16/9",
            background: "oklch(var(--card) / 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid oklch(0.58 0.22 292 / 0.2)",
            borderRadius: "0.75rem",
            boxShadow: "0 0 30px oklch(0.58 0.22 292 / 0.1)",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.07 0.03 290), oklch(0.12 0.04 292))",
            }}
          >
            {/* Animated rings */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full border border-primary/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full border border-primary/30" />
              <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Play size={24} className="neon-purple ml-1" />
              </div>
            </div>
            <p className="text-foreground/60 italic text-sm sm:text-base tracking-widest uppercase mt-2">
              Showreel Coming Soon
            </p>
            <p className="text-foreground/30 text-xs">
              Our cinematic portfolio is being compiled
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="OUR SERVICES" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-6 cursor-default group"
              style={{
                background: "oklch(var(--card) / 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.58 0.22 292 / 0.2)",
                borderRadius: "0.75rem",
                transition: "all 0.2s",
              }}
              whileHover={{
                boxShadow: "0 0 20px oklch(0.58 0.22 292 / 0.3)",
                scale: 1.02,
              }}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display font-semibold text-base text-foreground mb-2 group-hover:neon-purple transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────
function PortfolioSection() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="section-alt py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="OUR WORK" />

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mt-8 mb-10"
          role="tablist"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-neon-sm"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
              data-ocid="portfolio.tab"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="overflow-hidden group cursor-pointer"
                style={{
                  background: "oklch(var(--card) / 0.8)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(0.58 0.22 292 / 0.2)",
                  borderRadius: "0.75rem",
                  transition: "box-shadow 0.2s",
                }}
                whileHover={{
                  boxShadow: "0 0 20px oklch(0.58 0.22 292 / 0.25)",
                }}
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}
                  >
                    <div>
                      <span className="text-xs font-medium neon-purple uppercase tracking-wider">
                        {item.category}
                      </span>
                      <p className="text-white font-semibold text-sm mt-1">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary font-medium">
                    {item.category}
                  </span>
                  <p className="text-foreground font-medium text-sm mt-1">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  // Auto-advance
  const nextRef = useRef(next);
  nextRef.current = next;
  useEffect(() => {
    const t = setInterval(() => nextRef.current(), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="WHAT CLIENTS SAY" />
        <div className="mt-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="p-8 text-center"
              style={{
                background: "oklch(var(--card) / 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.58 0.22 292 / 0.2)",
                borderRadius: "0.75rem",
              }}
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: TESTIMONIALS[current].stars }).map(
                  (_, starIdx) => (
                    <Star
                      key={`star-${String(starIdx)}`}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ),
                )}
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6 italic">
                &ldquo;{TESTIMONIALS[current].text}&rdquo;
              </p>
              <p className="font-display font-semibold neon-purple">
                — {TESTIMONIALS[current].author}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="p-2 glass rounded-full hover:border-primary/50 transition-colors"
              aria-label="Previous"
              data-ocid="testimonials.pagination_prev"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  type="button"
                  key={t.author}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="p-2 glass rounded-full hover:border-primary/50 transition-colors"
              aria-label="Next"
              data-ocid="testimonials.pagination_next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Grid view (desktop) – all 4 shown simultaneously on lg */}
          <div className="hidden lg:grid grid-cols-4 gap-4 mt-10">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                className="p-5 text-center transition-all"
                style={{
                  background: "oklch(var(--card) / 0.8)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid oklch(0.58 0.22 292 / ${i === current ? "0.5" : "0.2"})`,
                  borderRadius: "0.75rem",
                  boxShadow:
                    i === current
                      ? "0 0 16px oklch(0.58 0.22 292 / 0.2)"
                      : "none",
                }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex justify-center gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={`gs-${String(j)}`}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed mb-3 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-xs font-semibold neon-purple">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Quote Form ───────────────────────────────────────────────
type FormStatus = "idle" | "loading" | "success" | "error";

function QuoteSection({
  actor,
}: { actor: ReturnType<typeof useActor>["actor"] | null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!videoLength) e.videoLength = "Please select video length";
    if (!description.trim()) e.description = "Project description is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!actor) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await actor.submitQuote(
        name.trim(),
        email.trim(),
        videoLength,
        description.trim(),
      );
      setStatus("success");
      setName("");
      setEmail("");
      setVideoLength("");
      setDescription("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="quote" className="section-alt py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionTitle title="GET A QUOTE" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 mt-10"
          style={{
            background: "oklch(var(--card) / 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid oklch(0.58 0.22 292 / 0.2)",
            borderRadius: "0.75rem",
          }}
        >
          {status === "success" ? (
            <div className="text-center py-8" data-ocid="quote.success_state">
              <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Quote Request Sent!
              </h3>
              <p className="text-muted-foreground">
                We&apos;ll get back to you within 24 hours.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => setStatus("idle")}
                data-ocid="quote.secondary_button"
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate data-ocid="quote.panel">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="q-name">Full Name *</Label>
                  <Input
                    id="q-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-input/50"
                    data-ocid="quote.input"
                  />
                  {errors.name && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="quote.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="q-email">Email Address *</Label>
                  <Input
                    id="q-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-input/50"
                    data-ocid="quote.input"
                  />
                  {errors.email && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="quote.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Video Length */}
                <div className="flex flex-col gap-1.5">
                  <Label>Video Length *</Label>
                  <Select value={videoLength} onValueChange={setVideoLength}>
                    <SelectTrigger
                      className="bg-input/50"
                      data-ocid="quote.select"
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "<1 min",
                        "1-5 min",
                        "5-15 min",
                        "15-30 min",
                        "30+ min",
                      ].map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.videoLength && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="quote.error_state"
                    >
                      {errors.videoLength}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="q-desc">Project Description *</Label>
                  <Textarea
                    id="q-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project, style preferences, reference links..."
                    rows={4}
                    className="bg-input/50 resize-none"
                    data-ocid="quote.textarea"
                  />
                  {errors.description && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="quote.error_state"
                    >
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {status === "error" && (
                <div
                  className="flex items-center gap-2 mt-4 text-destructive text-sm"
                  data-ocid="quote.error_state"
                >
                  <AlertCircle size={16} /> Failed to submit. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon-sm font-semibold"
                data-ocid="quote.submit_button"
                style={{ transition: "all 0.2s" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Sending...
                  </>
                ) : (
                  "Send Quote Request"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Map ──────────────────────────────────────────────────────
function MapSection() {
  return (
    <section id="map" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="FIND US" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden mt-10"
          style={{
            height: 380,
            background: "oklch(var(--card) / 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid oklch(0.58 0.22 292 / 0.2)",
            borderRadius: "0.75rem",
          }}
        >
          <iframe
            title="Aurex Studio Location"
            src="https://maps.google.com/maps?q=Button+Store+near+Khadim+Rasool+Loha+Mandi+Brahmnipura+Bahraich+Uttar+Pradesh+271801&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
        <div className="flex items-start gap-2 mt-4 text-muted-foreground text-sm">
          <MapPin size={16} className="neon-purple mt-0.5 shrink-0" />
          Button Store, near Khadim Rasool, Loha Mandi, Brahmnipura, Bahraich,
          Uttar Pradesh 271801
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const { actor } = useActor();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    if (!actor) return;
    const alreadyCounted = sessionStorage.getItem("aurex-visitor-counted");
    const fetchCount = async () => {
      try {
        if (!alreadyCounted) {
          (actor as any).incrementVisitor &&
            (await (actor as any).incrementVisitor());
          sessionStorage.setItem("aurex-visitor-counted", "true");
        }
        const count = (actor as any).getVisitorCount
          ? await (actor as any).getVisitorCount()
          : BigInt(0);
        setVisitorCount(Number(count));
      } catch {
        // silently ignore
      }
    };
    fetchCount();
  }, [actor]);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://aurexstudio.com";
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out Aurex Studio – Elite Video Editing Agency! ${shareUrl}`)}`;

  return (
    <footer className="section-alt border-t border-border/40 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-xl tracking-widest mb-3">
              <span className="neon-purple">AUREX</span>{" "}
              <span className="neon-gold">STUDIO</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Elite video editing for influencers, celebrities & modern brands.
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
              <a
                href="https://instagram.com/official.aurexstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>

              {/* Share buttons */}
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: "oklch(0.15 0.04 250 / 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(0.4 0.1 250 / 0.4)",
                  color: "oklch(0.7 0.1 250)",
                }}
                data-ocid="nav.button"
              >
                <Share2 size={12} />
                Facebook
              </a>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: "oklch(0.15 0.08 145 / 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(0.4 0.12 145 / 0.4)",
                  color: "oklch(0.7 0.12 145)",
                }}
                data-ocid="nav.button"
              >
                <Share2 size={12} />
                WhatsApp
              </a>
            </div>

            {/* Visitor counter */}
            {visitorCount !== null && (
              <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground/60">
                <Eye size={12} />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Services", "Portfolio", "Testimonials", "Get a Quote"].map(
                (l) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollTo(
                          l.toLowerCase().replace(" a ", "").replace(" ", "-"),
                        )
                      }
                      className="hover:text-foreground transition-colors"
                      data-ocid="nav.link"
                    >
                      {l}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="neon-purple mt-0.5 shrink-0" />
                Button Store, near Khadim Rasool, Loha Mandi, Brahmnipura,
                Bahraich, UP 271801
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="neon-purple" />
                official.aurexstudio@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="neon-purple" />
                +91 8303403819
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>© {year} Aurex Studio. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Buttons ─────────────────────────────────────────
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 no-print">
      {/* Email */}
      <a
        href="mailto:official.aurexstudio@gmail.com?subject=New%20Project%20Inquiry&body=Name:%0D%0AVideo%20Length:%0D%0ADescription:"
        aria-label="Email Us"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-neon-sm transition-all hover:scale-110"
        style={{
          background: "oklch(0.58 0.22 292)",
          color: "white",
          transition: "all 0.2s",
        }}
        data-ocid="nav.button"
      >
        <Mail size={20} />
      </a>
      {/* WhatsApp */}
      <a
        href="https://wa.me/918303403819?text=Hi%20Aurex%20Studio%2C%20I%20need%20a%20quote%20for%20video%20editing."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{
          background: "#25D366",
          color: "white",
          transition: "all 0.2s",
        }}
        data-ocid="nav.button"
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────
function SectionTitle({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
        {title}
      </h2>
      <div
        className="h-0.5 w-16 mx-auto mt-4"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.58 0.22 292), oklch(0.72 0.17 72))",
        }}
      />
    </motion.div>
  );
}
