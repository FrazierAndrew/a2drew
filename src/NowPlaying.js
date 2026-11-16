import { useEffect, useRef, useState } from "react";
import "./NowPlaying.css";

const track = {
  title: "The Color of Nothing",
  artist: "ford.",
  artwork: "/now-playing.jpg",
  audio: "/now-playing.mp3",
  spotify: "https://open.spotify.com/track/7AxFLOKzAkxhkWKXZC7WVM",
};

const formatTime = (value) => {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

export default function NowPlaying() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    return () => { if (audio) audio.pause(); };
  }, []);

  const readDuration = (event) => {
    const length = event.currentTarget.duration;
    setDuration(Number.isFinite(length) && length > 0 ? length : 0);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setFailed(false);
    try {
      if (audio.error) audio.load();
      await audio.play();
    } catch (error) {
      // A pause during a pending play is an ordinary interaction.
      if (error.name !== "AbortError") setFailed(true);
      setPlaying(false);
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const time = Math.min(duration, Math.max(0, Number(event.target.value)));
    audio.currentTime = time;
    setElapsed(time);
  };

  return (
    <section className="now-playing" aria-label="Music player">
      <div className="now-playing-main">
        <a className="now-playing-art" href={track.spotify} target="_blank" rel="noopener noreferrer"
          aria-label={`Open ${track.title} by ${track.artist} on Spotify`}>
          <img src={track.artwork} alt="" width="48" height="48" />
        </a>
        <div className="now-playing-track">
          <span className="now-playing-label">On repeat</span>
          <a className="now-playing-title" href={track.spotify} target="_blank" rel="noopener noreferrer">
            {track.title}
          </a>
          <span className="now-playing-artist">{track.artist}</span>
        </div>
        <button className="now-playing-toggle" type="button" onClick={toggle}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}>
          {playing ? (
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="M6 4h3v12H6zm5 0h3v12h-3z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="m7 4 9 6-9 6Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <div className="now-playing-timeline">
        <span className="now-playing-time" aria-hidden="true">{formatTime(elapsed)}</span>
        <input className="now-playing-seek" type="range" min="0" max={duration || 1}
          step="0.1" value={Math.min(elapsed, duration || 1)} disabled={!duration || failed}
          onChange={seek} aria-label="Playback position"
          aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`}
          style={{ "--played": `${duration ? Math.min(100, elapsed / duration * 100) : 0}%` }} />
        <span className="now-playing-time" aria-hidden="true">{formatTime(duration)}</span>
      </div>
      {failed && <p className="now-playing-error" role="status">Audio unavailable. <a href={track.spotify}
        target="_blank" rel="noopener noreferrer">Listen on Spotify</a></p>}
      <audio ref={audioRef} src={track.audio} preload="metadata"
        onLoadedMetadata={readDuration} onDurationChange={readDuration}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onPlay={() => { setPlaying(true); setFailed(false); }}
        onPause={() => setPlaying(false)}
        onEnded={(event) => { setPlaying(false); setElapsed(0); event.currentTarget.currentTime = 0; }}
        onError={() => { setPlaying(false); setFailed(true); }} />
    </section>
  );
}
