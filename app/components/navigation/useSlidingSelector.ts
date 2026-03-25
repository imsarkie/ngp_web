"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SlidingSelectorConfig = {
  itemCount: number;
  initialIndex: number;
  dragIntentThreshold?: number;
  flingVelocityThreshold?: number;
  stretchScale?: number;
};

type CommitReason = "tap" | "drag" | "keyboard";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function useSlidingSelector({
  itemCount,
  initialIndex,
  dragIntentThreshold = 10,
  flingVelocityThreshold = 760,
  stretchScale = 0.24,
}: SlidingSelectorConfig) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartScreenXRef = useRef(0);
  const hasDragIntentRef = useRef(false);
  const lastMoveRef = useRef({ x: 0, t: 0 });
  const velocityRef = useRef(0);

  const [railWidth, setRailWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [previewIndex, setPreviewIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const itemWidth = useMemo(
    () => (itemCount > 0 ? railWidth / itemCount : 0),
    [itemCount, railWidth],
  );

  const pageProgressFromX = useCallback(
    (x: number) => {
      if (itemWidth <= 0) return 0;
      return clamp(x / itemWidth - 0.5, 0, itemCount - 1);
    },
    [itemCount, itemWidth],
  );

  const indexFromX = useCallback(
    (x: number) => {
      const progress = pageProgressFromX(x);
      return clamp(Math.round(progress), 0, itemCount - 1);
    },
    [itemCount, pageProgressFromX],
  );

  const selectorWidthFromX = useCallback(
    (x: number) => {
      if (itemWidth <= 0) return 0;
      const progress = pageProgressFromX(x);
      const fraction = progress - Math.floor(progress);
      const midpointAffinity = 1 - Math.abs(fraction - 0.5) * 2;
      return itemWidth * (1 + midpointAffinity * stretchScale);
    },
    [itemWidth, pageProgressFromX, stretchScale],
  );

  const selectorLeftFromX = useCallback(
    (x: number, width: number) => {
      if (railWidth <= 0) return 0;
      return clamp(x - width / 2, 0, railWidth - width);
    },
    [railWidth],
  );

  const releaseIndexWithVelocity = useCallback(
    (nearestIndex: number, velocityPxPerSecond: number) => {
      let target = nearestIndex;
      if (Math.abs(velocityPxPerSecond) >= flingVelocityThreshold) {
        target += velocityPxPerSecond > 0 ? 1 : -1;
      }
      return clamp(target, 0, itemCount - 1);
    },
    [flingVelocityThreshold, itemCount],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new ResizeObserver(() => {
      const rect = rail.getBoundingClientRect();
      setRailWidth(rect.width);
    });

    observer.observe(rail);

    return () => observer.disconnect();
  }, []);

  const syncActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setPreviewIndex(index);
  }, []);

  const positionFromEvent = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return clamp(event.clientX - rect.left, 0, rect.width);
  }, []);

  const startDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerIdRef.current = event.pointerId;
      dragStartScreenXRef.current = event.clientX;
      hasDragIntentRef.current = false;
      const now = performance.now();
      const x = positionFromEvent(event);
      lastMoveRef.current = { x, t: now };
      velocityRef.current = 0;

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [positionFromEvent],
  );

  const moveDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== event.pointerId) return;

      const x = positionFromEvent(event);
      const deltaFromStart = event.clientX - dragStartScreenXRef.current;
      if (!hasDragIntentRef.current && Math.abs(deltaFromStart) < dragIntentThreshold) {
        return;
      }

      hasDragIntentRef.current = true;
      setIsDragging(true);

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveRef.current.t);
      const dx = x - lastMoveRef.current.x;
      velocityRef.current = (dx / dt) * 1000;
      lastMoveRef.current = { x, t: now };

      setDragX(x);
      setPreviewIndex(indexFromX(x));
    },
    [dragIntentThreshold, indexFromX, positionFromEvent],
  );

  const endDrag = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      onCommit: (index: number, reason: CommitReason) => void,
    ) => {
      if (pointerIdRef.current !== event.pointerId) return;

      const x = positionFromEvent(event);
      const hadIntent = hasDragIntentRef.current;

      pointerIdRef.current = null;
      hasDragIntentRef.current = false;
      setIsDragging(false);

      if (!hadIntent) {
        const tapIndex = indexFromX(x);
        setActiveIndex(tapIndex);
        setPreviewIndex(tapIndex);
        onCommit(tapIndex, "tap");
        return;
      }

      const nearest = indexFromX(x);
      const releaseIndex = releaseIndexWithVelocity(nearest, velocityRef.current);
      setActiveIndex(releaseIndex);
      setPreviewIndex(releaseIndex);
      onCommit(releaseIndex, "drag");
    },
    [indexFromX, positionFromEvent, releaseIndexWithVelocity],
  );

  const selectorState = useMemo(() => {
    if (itemWidth <= 0) {
      return {
        left: 0,
        width: 0,
      };
    }

    if (isDragging) {
      const width = selectorWidthFromX(dragX);
      return {
        left: selectorLeftFromX(dragX, width),
        width,
      };
    }

    const width = itemWidth;
    const left = activeIndex * itemWidth;
    return { left, width };
  }, [activeIndex, dragX, isDragging, itemWidth, selectorLeftFromX, selectorWidthFromX]);

  return {
    railRef,
    activeIndex,
    previewIndex,
    isDragging,
    itemWidth,
    selectorState,
    startDrag,
    moveDrag,
    endDrag,
    syncActiveIndex,
    setActiveIndex,
  };
}
