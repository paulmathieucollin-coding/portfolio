import { useEffect, useRef } from 'react';

const FADE_DURATION = 2000;
const RESUME_DELAY = 1500;
const TARGET_VOLUME = 0.15;

let ambientAudio: HTMLAudioElement | null = null;
let fadeInterval: ReturnType<typeof setInterval> | null = null;
let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
let isVideoPlaying = false;
let isMuted = false;
let muteListeners: Array<(muted: boolean) => void> = [];

function getAmbient(): HTMLAudioElement {
  if (!ambientAudio) {
    ambientAudio = new Audio('/sounds/ambient.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0;
  }
  return ambientAudio;
}

function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function fadeTo(target: number, duration: number) {
  if (isMuted) return;
  clearFade();
  const audio = getAmbient();
  const start = audio.volume;
  const diff = target - start;
  if (Math.abs(diff) < 0.001) {
    audio.volume = target;
    return;
  }
  const steps = 30;
  const stepTime = duration / steps;
  let step = 0;
  fadeInterval = setInterval(() => {
    step++;
    audio.volume = Math.max(0, Math.min(1, start + (diff * step) / steps));
    if (step >= steps) {
      clearFade();
      audio.volume = target;
      if (target === 0) audio.pause();
    }
  }, stepTime);
}

export function notifyVideoPlay() {
  isVideoPlaying = true;
  if (resumeTimeout) {
    clearTimeout(resumeTimeout);
    resumeTimeout = null;
  }
  fadeTo(0, 800);
}

export function notifyVideoStop() {
  isVideoPlaying = false;
  if (resumeTimeout) clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    if (!isVideoPlaying && ambientAudio && !isMuted) {
      ambientAudio.play();
      fadeTo(TARGET_VOLUME, FADE_DURATION);
    }
  }, RESUME_DELAY);
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  const audio = getAmbient();
  if (isMuted) {
    clearFade();
    audio.volume = 0;
    audio.pause();
  } else if (!isVideoPlaying) {
    audio.play().catch(() => {});
    fadeTo(TARGET_VOLUME, 600);
  }
  muteListeners.forEach((fn) => fn(isMuted));
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}

export function onMuteChange(fn: (muted: boolean) => void) {
  muteListeners.push(fn);
  return () => { muteListeners = muteListeners.filter((l) => l !== fn); };
}

export function useAmbientAudio() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const startAmbient = () => {
      if (started.current) return;
      started.current = true;
      if (isMuted) return;
      const audio = getAmbient();
      audio.volume = 0;
      audio.play().then(() => {
        fadeTo(TARGET_VOLUME, FADE_DURATION);
      }).catch(() => {});
    };

    document.addEventListener('click', startAmbient, { once: true });
    document.addEventListener('mousemove', startAmbient, { once: true });

    return () => {
      document.removeEventListener('click', startAmbient);
      document.removeEventListener('mousemove', startAmbient);
    };
  }, []);
}
