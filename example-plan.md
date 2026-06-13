# Ableton Rebuild: Hosini — Dimma (Extended Mix)
**Anjunadeep Explorations 11-01-008**

---

## Key Facts

| | |
|---|---|
| BPM | **114.84** (set exactly — do not round) |
| Key | **A minor** |
| Duration | 7:24 |
| Stems | bass, drums, guitar, other, piano, vocals\* |
| Sidechain | Mild (1.18× ratio) — light pump, not aggressive |

> **\*Vocals stem is essentially silence** — RMS is near zero, crest factor 38.4 dB. This is an instrumental track. The "vocals" separation is noise floor. Ignore it or mute the track.

---

## Session Setup

1. New Live Set → BPM **114.84** → 4/4
2. Sample rate **44100 Hz** (stems were recorded at this rate)
3. Set clip grid to 1 bar
4. Key: A in the clip view (optional but helpful for MIDI layering)
5. Master: insert **Glue Compressor** (ratio 2:1, threshold -6dB, attack 0.5ms, release Auto) + **Limiter** (ceiling -0.3dBFS) at the end of the chain

---

## Track Layout

Create 5 audio tracks in this order. Route everything to a **Mix Bus** return before master.

```
1. BASS        → Mix Bus → Master
2. DRUMS       → Mix Bus → Master
3. GUITAR      → Mix Bus → Master
4. OTHER       → Mix Bus → Master
5. PIANO       → Mix Bus → Master
6. [VOCALS]    → mute or delete
```

---

## Track 1 — BASS

**Measured:** Mono (0.1% stereo width), sub-dominant, -23.3 dBFS RMS, -2.9 dBFS peak, crest 20.3 dB, onset density 0.75/s (sparse, slow bassline), reverb tail 3.52s.

**Frequency profile:** 20–60Hz: 22% · 60–100Hz: 49% · 100–200Hz: 26% · 200Hz+: ~3%
The fundamental sits 60–100 Hz. Almost nothing above 200 Hz.

**Arrangement note:** Bass is **completely silent for the first ~1:23** (intro). Enters around 1:23 and drives the main sections. Drops out during breakdowns. Confirmed from energy profile — slices 0–9 are near-zero, slices 10–17 are active.

### Chain
```
Utility (Mono: ON, Width: 0%) → EQ Eight → Compressor → Saturator
```

**Utility:** Force mono immediately — the original is 0.1% wide. Check "Mono" in Utility.

**EQ Eight:**
- HPF: 25 Hz (cut rumble below the sub fundamental)
- Bell: +2 dB at 72 Hz, Q 1.2 (boost the 60–100 Hz fundamental)
- Bell: -3 dB at 180 Hz, Q 1.8 (notch out boxiness in the 100–200 Hz zone)
- LPF: 180 Hz, slope 24 dB/oct (cut everything above — this stem has nothing above 200 Hz and any presence there is bleed)

**Compressor:**
- Ratio: 3:1
- Attack: 12 ms (let the transient through)
- Release: 80 ms
- Threshold: -18 dB
- Makeup: ~3 dB
- Crest factor of 20.3 dB means it's not over-compressed — keep it breathing

**Saturator:** Drive 10%, type Soft Sine — adds warmth and helps the bass cut on smaller speakers without boosting volume.

**Level:** Set fader so bass RMS sits around -20 dBFS on the mix bus.

---

## Track 2 — DRUMS

**Measured:** Nearly mono (2.5%), crest 14.8 dB (most compressed stem — heaviest limiting applied), reverb tail 0.12s (dry — essentially no reverb), onset density 6.96/s (dense), sub-dominant in frequency (sub 79%).

**Key insight:** Crest of 14.8 dB is the lowest of all stems — this means the drums were processed with heavy compression/limiting in the original. Replicate this. The 0.12s reverb tail means they're intentionally dry.

**Frequency profile:** Sub 20–60Hz: 21% · Sub 60–100Hz: 58% · Low 100–200Hz: 15% — the kick is deep (60–100 Hz fundamental).

### Chain
```
EQ Eight → Drum Buss → Glue Compressor → Utility (Mono: ON)
```

**EQ Eight:**
- HPF: 22 Hz
- Bell: +2 dB at 72 Hz, Q 1.5 (reinforce the kick's sub punch)
- Bell: -2 dB at 300 Hz, Q 1.0 (clean up the mud between kick and bass)
- Bell: +1.5 dB at 8 kHz, Q 0.8 (hi-hat air)
- No reverb — keep it dry matching the 0.12s tail measurement

**Drum Buss:**
- Drive: 12%
- Crunch: 15%
- Boom: 0% (bass track handles sub)
- Transients: +1.5 dB

**Glue Compressor:**
- Ratio: 4:1 (heavy — matching the low 14.8 dB crest)
- Threshold: -14 dB
- Attack: 2 ms
- Release: 100 ms
- Peak clip: ON

**Utility:** Width 0% — collapse to mono. The original is 2.5% wide (effectively mono).

**Level:** This is the loudest active stem. Set fader so drums sit at -12 dBFS peak on the mix bus.

---

## Track 3 — GUITAR (Synth Pad/Arp)

**Measured:** Very wide stereo (83.8%), low-dominant (66% in 100–400 Hz), crest 24.3 dB (minimal compression), reverb tail 3.4s, onset density 1.7/s (sustained chords, not busy).

**What it is:** Despite the label, this is a synth — almost certainly a wide stereo pad or chord stack. The 83.8% stereo width and 3.4s reverb tail are the defining characteristics. This is what creates the "space" in the mix. In Anjunadeep tracks this is typically a SuperSaw or stacked chord synth run through stereo widening.

**Frequency profile:** 100–200Hz: 34% · 200–400Hz: 32% · 400–800Hz: 17% · 800Hz–2kHz: 12% · 2kHz+: ~5%
It has real mid content — this is the harmonic bed.

### Chain
```
EQ Eight → Compressor → Reverb (Return) → Utility (Width 90%)
```

**EQ Eight:**
- HPF: 180 Hz, slope 12 dB/oct (high-pass below bass territory — leave low end to bass+drums)
- Bell: +1.5 dB at 250 Hz, Q 1.5 (reinforce the harmonic body)
- Bell: -2 dB at 600 Hz, Q 1.2 (reduce the "nasal" mid buildup)
- Bell: +1 dB at 3 kHz, Q 0.8 (add definition)
- High shelf: +1.5 dB at 10 kHz (restore air lost by HPF)

**Compressor:** Very light — crest of 24.3 dB means barely touched.
- Ratio: 2:1, Threshold: -24 dB, Attack: 30 ms, Release: 200 ms

**Reverb (Send to Return track):**
- Decay: 3.4s (matching the measured reverb tail)
- Pre-delay: 18 ms
- Size: 85%
- Diffusion: 80%
- Wet send level: ~-12 dB (reverb is present but the dry signal leads)

**Utility:** Width 90% — matches the 83.8% measured width.

---

## Track 4 — OTHER (Atmosphere / Reverb Bed)

**Measured:** Very wide stereo (88.8%), low-dominant, reverb tail **63.78s** (this stem essentially IS the wet/reverb atmosphere), onset density 5.13/s.

**What it is:** The 63.78-second reverb tail is the critical clue. This isn't a traditional instrument — it's the atmospheric/reverb layer of the mix. Think long hall reverb, dark pads, sub-bass rumble atmosphere. In Anjunadeep production this is typically a reverb bus that got baked into the mix, or a dark noise/pad texture with extreme reverb.

**Frequency profile:** 60–100Hz: 36% · 100–200Hz: 29% · 200–400Hz: 22% — mostly low/low-mid.

### Chain
```
EQ Eight → Auto Filter → Reverb → Utility (Width 95%)
```

**EQ Eight:**
- HPF: 60 Hz (sub cleanup — let bass own below 60 Hz)
- LPF: 3 kHz, slope 12 dB/oct (this is atmosphere, keep it dark)
- Bell: -3 dB at 800 Hz, Q 1.5 (reduce honky buildup in low-mids)

**Auto Filter:** Low-pass, cutoff ~1500 Hz, resonance 10% — automate the cutoff upward during buildups for the classic Anjunadeep filter sweep.

**Reverb:** (This stem already has reverb baked in — add only a small additional send)
- Decay: 8s
- Size: 100%
- Wet: -24 dB on send

**Utility:** Width 95%.

**Automation idea:** Volume automate — this track should swell in during breakdowns and back off slightly during drops when the more percussive elements take over.

---

## Track 5 — PIANO (Melodic Lead / Arp)

**Measured:** Moderate stereo (57.4%), low-dominant (77% in 100–400 Hz), crest 21.8 dB, reverb tail 2.15s, onset density 4.99/s (melodic activity, moderate density).

**What it is:** The melodic voice — likely the lead arpeggiated synth or plucked/piano-style melodic line. 57.4% stereo width suggests a medium spread, not collapsed mono and not fully widened. 4.99 onsets/s means there's actual melodic movement.

**Frequency profile:** 100–200Hz: 32% · 200–400Hz: 45% · 400–800Hz: 15% · 800Hz+: 8%
Centered in the low-mids with some harmonic content.

### Chain
```
EQ Eight → Compressor → Reverb (Return)
```

**EQ Eight:**
- HPF: 120 Hz (cut low fundamental, let bass own it)
- Bell: +2 dB at 300 Hz, Q 1.2 (reinforce the body — this is where 45% of content sits)
- Bell: -2 dB at 700 Hz, Q 1.5 (reduce mud)
- Bell: +2 dB at 2.5 kHz, Q 1.0 (definition and presence)
- High shelf: +2 dB at 8 kHz (air and sparkle)

**Compressor:**
- Ratio: 3:1, Threshold: -20 dB, Attack: 8 ms, Release: 120 ms
- Slightly more compressed than guitar to keep the melody consistent in the mix

**Reverb (Return):** 
- Decay: 2.15s (matching measured tail)
- Pre-delay: 12 ms
- Size: 70%
- Send: -10 dB

**Utility:** Width 55% (close to measured 57.4%).

---

## Sidechain

Measured sidechain ratio is **1.18×** — mild. The bass pumps slightly with the kick but it's not an aggressive effect.

**Setup:**
1. On the BASS track, insert a **Compressor** after the main compressor in chain
2. Sidechain input: DRUMS track
3. Settings: Ratio 3:1, Threshold -20 dB, Attack 2 ms, Release 80 ms
4. This is subtle — the bass barely ducks. If it sounds obvious, reduce the threshold to -30 dB.

---

## Song Structure & Arrangement

> **Note:** Structure derived from RMS energy analysis of all stems combined.

| Section | Timestamp | Duration | What's Happening |
|---------|-----------|----------|-----------------|
| **Intro** | 0:00 – 1:23 | 1:23 | Drums only, NO bass. Guitar/other fading in gradually. Establishes groove without bottom-end weight. |
| **First Bass Entry** | ~1:23 | — | Bass drops in. This is the first major energy shift. |
| **Buildup/Breakdown cycles** | 1:23 – 2:47 | ~1:24 | Multiple short 8–16s alternations between full energy and dropped-out sections. Classic Anjunadeep rolling tension build. |
| **Main Drop** | ~2:47 – 4:01 | ~1:14 | Extended high-energy section. All stems active. Multiple 8–16s drop phrases. |
| **Breakdown 1** | ~4:09 – 4:32 | ~23s | Bass drops out. Atmosphere/reverb leads. |
| **Breakdown 2** | ~4:40 – 5:08 | ~28s | Deeper breakdown — extended space. |
| **Second Drop** | ~5:16 – 5:40 | ~24s | Returns with energy. |
| **Long Buildup** | 5:40 – 6:32 | ~52s | Extended rise toward final drop. Filter automation on OTHER track here. |
| **Final Breakdown** | 6:32 – 6:49 | ~17s | Brief strip-back before outro. |
| **Outro** | 6:57 – 7:24 | ~27s | Elements dropping out one by one. Bass goes first. |

**Arrangement tips:**
- The bass energy profile shows it is **silent for the entire intro then enters hard** — use a clip volume automation or simply start the bass clip at 1:23.
- The "other" stem should have its volume automated upward during every breakdown — it's the dominant element when the rest drops out.
- Use clip envelopes on the guitar/piano tracks to match how they fade in at the intro.

---

## Mixing Notes

### Low-end management (most important)
- Solo bass + drums in **mono** first. The kick (60–100 Hz) and bass fundamental (60–100 Hz) share the same space. Use sidechaining (above) and the bass EQ notch at 180 Hz to keep them separate.
- The guitar and other stems have HPFs at 180 Hz — this is what keeps the low end clean. Don't skip this.
- Check the mix in mono before adding stereo width anywhere.

### Stereo image
- Bass: mono. Drums: mono. These anchor the center.
- Piano: 55% width — sits slightly wider than center.
- Guitar: 90% width — the main stereo field element.
- Other: 95% width — wraps the full image.
- This creates a classic center-anchored electronic mix with wide atmospheric layers.

### Levels (starting point, pre-mix-bus)
| Track | Starting fader |
|-------|---------------|
| Bass | -3 dB |
| Drums | 0 dB |
| Guitar | -6 dB |
| Other | -9 dB |
| Piano | -6 dB |

### Reference monitoring
Use the stems themselves as A/B reference at every stage. Bypass your processing and compare — the stems are the ground truth.

---

## Stems Reference

All stems at: `/Users/drew/stem/output/htdemucs_6s/Anjunadeep Explorations 11-01-008-Hosini-Dimma (Extended Mix)/`

```
bass.wav    — mono sub bass, enters ~1:23
drums.wav   — dry, compressed, nearly mono
guitar.wav  — wide stereo synth pad/chord stack
other.wav   — atmosphere/reverb bed, very wide
piano.wav   — melodic arp/lead, medium width
vocals.wav  — essentially silence, ignore
```

---

*Analysis by deep_analyze.py + rebuild.md — Demucs htdemucs_6s, shifts 5*
