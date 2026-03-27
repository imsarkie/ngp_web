# Reliability Principles

Reader is built with reliability as a core user promise, not an afterthought.

## Local-First Architecture

Reader is designed local-first. Your saved articles, highlights, folder structure, and reading state are stored on-device. This means:

- **Reading works offline.** Once an article is saved, it is available whether you have a connection or not.
- **Instant response.** Tapping and swiping feel instant because the interface never waits on a network round-trip for basic interactions.
- **Your data is yours.** Sensitive reading data does not need to transit a server to serve its primary purpose: letting you read.

## Flutter Performance

Reader is built with Flutter, giving it smooth 60fps (and above) rendering on modern devices. The fluid micro-animations and spring-physics swipe interactions are only possible because Flutter renders every frame directly, without the compromises of a web-view or hybrid approach.

## Graceful Degradation

Network conditions are unpredictable. Reader is built to degrade gracefully:

- RSS feed syncing retries intelligently without disrupting the reading experience
- Article content parsing handles edge-case formatting without crashing or showing broken layouts
- Offline access is consistent — what you saved is always retrievable

## Durable Annotations

Highlights, saved articles, and reading progress are treated as durable data. These are not ephemeral cache entries — they persist reliably across app updates and device restarts.

## The Promise

A reading app should never feel fragile. When you save something, you should trust with certainty that it will be there when you are ready to read it. Reader is designed to earn and hold that trust.

---

- [Complete Feature Set](features.md)
- [The Reading Experience](reader.md)
- [Privacy Policy](privacy-policy.md)
