import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { ASSEMBLY_PROCESS_SCENES, CRAFT_MOVEMENT_IMAGE } from '../data/watches';

interface MovementVideoPlaceholderProps {
  videoSrc?: string;
  posterSrc?: string;
}

const SCENE_DURATION_SEC = 4;
const TOTAL_REEL_SEC = ASSEMBLY_PROCESS_SCENES.length * SCENE_DURATION_SEC;

export function MovementVideoPlaceholder({
  videoSrc,
  posterSrc = CRAFT_MOVEMENT_IMAGE.src,
}: MovementVideoPlaceholderProps) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);
  const [elapsedSec, setElapsedSec] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync native <video> element if an external HD MP4/WebM source is provided
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !videoSrc) return;
    if (isPlaying) {
      vid.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      vid.pause();
    }
  }, [isPlaying, videoSrc]);

  // Smooth looping playback timer for the 4-scene high-finish assembly reel
  useEffect(() => {
    if (videoSrc || !isPlaying) return;

    let rafId = 0;
    let lastTs: number | null = null;

    const tick = (now: number) => {
      if (lastTs === null) {
        lastTs = now;
      }
      const dt = Math.max(0, Math.min(0.1, (now - lastTs) / 1000));
      lastTs = now;
      if (dt > 0) {
        setElapsedSec((prev) => {
          const next = (prev + dt) % TOTAL_REEL_SEC;
          return next < 0 || !Number.isFinite(next) ? 0 : next;
        });
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isPlaying, videoSrc]);

  const safeElapsed = Number.isFinite(elapsedSec) ? Math.max(0, elapsedSec) : 0;
  const activeIndex = Math.max(
    0,
    Math.min(
      ASSEMBLY_PROCESS_SCENES.length - 1,
      Math.floor(safeElapsed / SCENE_DURATION_SEC)
    )
  );
  const activeScene = ASSEMBLY_PROCESS_SCENES[activeIndex] ?? ASSEMBLY_PROCESS_SCENES[0];
  const progressPct = Math.max(0, Math.min(100, (safeElapsed / TOTAL_REEL_SEC) * 100));

  const formatTime = (sec: number) => {
    const whole = Math.max(0, Math.floor(Number.isFinite(sec) ? sec : 0));
    return `0:${String(whole).padStart(2, '0')}`;
  };

  return (
    <div className="movement-video-shell">
      <div className="movement-video-stage">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="movement-video-element"
            src={videoSrc}
            poster={posterSrc}
            autoPlay={!prefersReduced}
            loop
            muted
            playsInline
            aria-label="Master Horology watchmaking and assembly process film"
          />
        ) : (
          <div className="process-reel-layers" aria-live="polite">
            {ASSEMBLY_PROCESS_SCENES.map((scene, idx) => {
              const isActive = idx === activeIndex;
              return (
                <figure
                  key={scene.id}
                  className={`process-reel-frame${isActive ? ' is-active' : ''}${
                    isPlaying ? ' is-animating' : ''
                  }`}
                >
                  <img
                    src={scene.image}
                    alt={scene.alt}
                    className="process-reel-img"
                    referrerPolicy="no-referrer"
                  />
                </figure>
              );
            })}
            <div className="movement-video-scrim" aria-hidden="true" />
          </div>
        )}

        <div className="movement-video-overlay-top">
          <span className="movement-placeholder-label">
            Video Placeholder · Geneva Assembly Film (HD Loop)
          </span>
          <span className="movement-loop-time mono tabular-nums">
            {formatTime(elapsedSec)} / {formatTime(TOTAL_REEL_SEC)}
          </span>
        </div>

        <div className="movement-video-controls">
          <div className="movement-video-meta">
            <p className="movement-scene-kicker mono">
              Stage {activeScene.chapter} of 0{ASSEMBLY_PROCESS_SCENES.length}
            </p>
            <h3 className="movement-video-title">{activeScene.title}</h3>
            <p className="movement-video-sub">{activeScene.detail}</p>
          </div>

          <div className="movement-control-buttons">
            <button
              type="button"
              className="video-ctrl-btn video-ctrl-primary"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause assembly process film' : 'Play assembly process film'}
            >
              {isPlaying ? (
                <>
                  <Pause size={15} strokeWidth={1.75} aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={15} strokeWidth={1.75} aria-hidden="true" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="movement-progress-track" aria-hidden="true">
          <div
            className="movement-progress-fill"
            style={{ width: `${progressPct.toFixed(2)}%` }}
          />
        </div>
      </div>

      {!videoSrc && (
        <div
          className="process-chapter-strip"
          role="tablist"
          aria-label="Assembly process film chapters"
        >
          {ASSEMBLY_PROCESS_SCENES.map((scene, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`process-chapter-btn${isActive ? ' is-active' : ''}`}
                onClick={() => setElapsedSec(idx * SCENE_DURATION_SEC + 0.05)}
              >
                <span className="process-chapter-num mono">{scene.chapter}.</span>
                <span className="process-chapter-label">{scene.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
