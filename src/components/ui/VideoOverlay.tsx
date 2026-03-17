"use client";

import styles from "./VideoOverlay.module.css";

interface VideoOverlayProps {
  videoUrl: string;
  title?: string;
  onClose: () => void;
}

export function VideoOverlay({ videoUrl, title = "Video", onClose }: VideoOverlayProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`${videoUrl}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
        <button className={styles.close} onClick={onClose} aria-label="Close video">
          ✕
        </button>
      </div>
    </div>
  );
}
