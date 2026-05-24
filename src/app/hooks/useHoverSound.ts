let hoverAudio: HTMLAudioElement | null = null;

function getHoverAudio() {
  if (!hoverAudio) {
    hoverAudio = new Audio('/sounds/hover.mp3');
    hoverAudio.volume = 0.3;
  }
  return hoverAudio;
}

export function playHoverSound() {
  try {
    const audio = getHoverAudio();
    audio.currentTime = 0;
    audio.play();
  } catch {
    // silent fail
  }
}

export function useHoverSound() {
  return {
    onMouseEnter: playHoverSound,
  };
}
