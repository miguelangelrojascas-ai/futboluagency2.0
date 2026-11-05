"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// Scroll-locked video hero (adapted from 21st.dev "The City Opens").
//
// While the hero is active the page does not move: the body is pinned with
// position:fixed and wheel / touch / keyboard input drives video.currentTime
// instead, forward and backward. When the video reaches the end and the
// visitor keeps going, the page unlocks and scrolls normally. Scrolling back
// up to the very top locks it again and plays the video in reverse.
//
// Changes from the original:
//  - It releases at the end (the original never did, which trapped the page).
//  - Keyboard support, a "skip" button, and no lock at all for reduced motion
//    or when the page loads already scrolled down.
//  - Brand fonts and colours, a real <h1>, CTAs that appear at the end, and
//    no third-party signature link.
// ─────────────────────────────────────────────────────────────

export interface ScrollLockedVideoHeroProps {
  videoSrc: string
  /** Shown before the video starts; also what crawlers read as the page H1. */
  title: React.ReactNode
  /** Revealed when the video is nearly over. */
  tagline?: React.ReactNode
  /** Buttons shown with the tagline. */
  actions?: React.ReactNode
  scrollHint?: string
  skipLabel?: string
  /** Total input distance (px) needed to scrub the full video. */
  scrubDistance?: number
  poster?: string
  className?: string
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function ScrollLockedVideoHero({
  videoSrc,
  title,
  tagline,
  actions,
  scrollHint = "SCROLL",
  skipLabel = "Skip",
  scrubDistance = 2600,
  poster,
  className,
}: ScrollLockedVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<() => void>(() => {})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    // Loaded mid-page (reload, back button): start at the end, unlocked.
    const startAtEnd = reduceMotion || window.scrollY > 10

    let duration = 0
    let rafId = 0
    let targetProgress = startAtEnd ? 1 : 0
    let currentProgress = targetProgress
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let touchY = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      video.currentTime = currentProgress * duration
    }
    video.addEventListener("loadeddata", onLoadedData)
    if (video.readyState >= 2) onLoadedData()

    // iOS will not buffer a video that is only ever seeked. A silent
    // play-then-pause on mount starts the real download.
    const p = video.play()
    if (p && typeof p.then === "function") p.then(() => video.pause()).catch(() => {})
    else video.pause()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    const seekTo = (t: number) => {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    // position:fixed on the body is the reliable way to freeze the page
    // across browsers (overflow:hidden alone is not, notably on iOS).
    const engageLock = () => {
      if (locked) return
      locked = true
      const b = document.body.style
      b.position = "fixed"
      b.top = "0"
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.overscrollBehavior = "none"
    }
    const releaseLock = () => {
      if (!locked) return
      locked = false
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.overscrollBehavior = ""
    }

    if (!startAtEnd) {
      window.scrollTo(0, 0)
      engageLock()
    }

    /** Returns true when the event was used to scrub and must not scroll the page. */
    const handleDelta = (deltaY: number) => {
      if (locked) {
        // At the end and still pushing forward: hand the page back.
        if (deltaY > 0 && targetProgress >= 1 && currentProgress > 0.98) {
          releaseLock()
          return false
        }
        targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
        return true
      }
      // Back at the very top and scrolling up: lock again and rewind.
      if (!reduceMotion && deltaY < 0 && window.scrollY <= 0) {
        engageLock()
        targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
        return true
      }
      return false
    }

    const onWheel = (e: WheelEvent) => {
      if (handleDelta(e.deltaY)) e.preventDefault()
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY
      const used = handleDelta((touchY - y) * 1.6)
      touchY = y
      if (used) e.preventDefault()
    }
    const KEYS: Record<string, number> = {
      ArrowDown: 120, ArrowUp: -120, PageDown: 600, PageUp: -600, " ": 600,
    }
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      const d = KEYS[e.key]
      if (d === undefined) return
      if (handleDelta(e.key === " " && e.shiftKey ? -d : d)) e.preventDefault()
    }

    skipRef.current = () => {
      targetProgress = 1
      currentProgress = 1
      releaseLock()
      const next = section.getBoundingClientRect().bottom + window.scrollY
      window.setTimeout(() => window.scrollTo({ top: next, behavior: "smooth" }), 50)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("keydown", onKey)

    const frame = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18
      if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress

      if (duration > 0) seekTo(currentProgress * duration)

      video.style.transform = `scale(${1 + currentProgress * 0.06})`

      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.3, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.01 ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.8) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
        taglineRef.current.style.pointerEvents = t > 0.6 ? "auto" : "none"
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKey)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100dvh] w-full overflow-hidden bg-[#05070d] ${className ?? ""}`}
      style={{ touchAction: "none" }}
    >
      {/* Poster as a plain image under the video, so the first frame shows
          at once while the video downloads (the video fades in over it). */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0, transformOrigin: "center center", willChange: "transform" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.55), rgba(5,7,13,0.1) 35%, rgba(5,7,13,0.25) 70%, rgba(5,7,13,0.7))",
        }}
      />

      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] pt-16 text-center"
        style={{ willChange: "transform, filter, opacity" }}
      >
        <h1
          className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.55)" }}
        >
          {title}
        </h1>
      </div>

      {(tagline || actions) && (
        <div
          ref={taglineRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-[8%] pt-16 text-center opacity-0"
          style={{ pointerEvents: "none" }}
        >
          {tagline && (
            <p
              className="max-w-3xl font-display text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.55)" }}
            >
              {tagline}
            </p>
          )}
          {actions}
        </div>
      )}

      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-[clamp(24px,6vh,52px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-body text-[11px] font-semibold tracking-[0.3em] text-white/75 transition-opacity duration-500"
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" className="slvh-bounce" aria-hidden>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <button
        type="button"
        onClick={() => skipRef.current()}
        className="absolute bottom-5 right-5 z-[2] rounded-full border border-white/25 bg-black/30 px-4 py-2 font-body text-xs font-semibold text-white/80 backdrop-blur transition-colors hover:bg-black/50 hover:text-white"
      >
        {skipLabel} ↓
      </button>

      {/* Progress line in brand red, filling as the video advances. */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <style>{`
        .slvh-bounce { animation: slvh-bounce 1.6s ease-in-out infinite; }
        @keyframes slvh-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(5px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) { .slvh-bounce { animation: none; } }
      `}</style>
    </section>
  )
}
