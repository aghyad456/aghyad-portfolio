import { useEffect, useRef } from "react";

const technologies = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "TypeScript",
  "Next.js",
  "TailwindCSS",
  "Laravel",
  "ShadCn",
  "SQL",
  "MySQL",
  "Python",
  "C++",
  "C#",
  "Git",
];

const desktopPositions = [
  { x: 0.15, y: 0.27, size: 36 },
  { x: 0.38, y: 0.23, size: 40 },
  { x: 0.63, y: 0.27, size: 34 },
  { x: 0.85, y: 0.23, size: 37 },
  { x: 0.19, y: 0.72, size: 35 },
  { x: 0.42, y: 0.74, size: 38 },
  { x: 0.65, y: 0.72, size: 36 },
  { x: 0.86, y: 0.72, size: 32 },
];

const mobilePositions = [
  { x: 0.27, y: 0.19, size: 29 },
  { x: 0.73, y: 0.19, size: 31 },
  { x: 0.27, y: 0.50, size: 29 },
  { x: 0.73, y: 0.50, size: 31 },
  { x: 0.27, y: 0.81, size: 29 },
  { x: 0.73, y: 0.81, size: 29 },
];

export default function TechOrbs({
  isVisible,
  direction = 1,
}) {
  const canvasRef = useRef(null);

  const visibilityRef = useRef(isVisible);
  const directionRef = useRef(direction);

  // Keep the latest props available to the animation loop.
  useEffect(() => {
    visibilityRef.current = isVisible;
    directionRef.current = direction;
  }, [isVisible, direction]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationId;
    let lastTime = 0;
    let isMobile = false;

    let nextSwapTime = 0;
    let swapIndex = 0;

    // Start hidden so the first entrance can be animated.
    let previousVisibility = false;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const orbs = desktopPositions.map((position, index) => ({
      ...position,
      name: technologies[index],
      phase: index * 1.3,
      offsetX: 0,
      offsetY: 0,
      opacity: 1,
      changing: false,

      // Entrance and exit animation values.
      entryProgress: 0,
      transitionStart: null,
      transitionFrom: 0,
      transitionTo: 0,
      transitionDelay: 0,
    }));

    function getPositions() {
      return isMobile ? mobilePositions : desktopPositions;
    }

    function getNextTechnology(currentName) {
      const activeNames = orbs.map((orb) => orb.name);

      const available = technologies.filter(
        (name) =>
          name !== currentName &&
          !activeNames.includes(name)
      );

      if (available.length === 0) return currentName;

      return available[
        Math.floor(Math.random() * available.length)
      ];
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      isMobile = width < 560;

      const positions = getPositions();

      orbs.forEach((orb, index) => {
        if (positions[index]) {
          orb.x = positions[index].x;
          orb.y = positions[index].y;
          orb.size = positions[index].size;
        }
      });
    }

    function drawOrb(orb, time) {
      const radius = orb.size;

      const floatX =
        Math.sin(time * 0.0007 + orb.phase) * 4;

      const floatY =
        Math.cos(time * 0.0008 + orb.phase) * 5;

      // Move each orb from outside the canvas to its position.
      const entryOffset =
        (1 - orb.entryProgress) *
        width *
        0.7 *
        directionRef.current;

      const centerX =
        orb.x * width +
        orb.offsetX +
        floatX +
        entryOffset;

      const centerY =
        orb.y * height +
        orb.offsetY +
        floatY;

      ctx.save();

      ctx.globalAlpha = orb.opacity * orb.entryProgress;

      // Shadow
      ctx.beginPath();
      ctx.ellipse(
        centerX + 4,
        centerY + radius * 0.72,
        radius * 0.85,
        radius * 0.19,
        0,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(0, 0, 0, 0.13)";
      ctx.fill();

      // Sphere gradient
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.4,
        radius * 0.05,
        centerX,
        centerY,
        radius
      );

      gradient.addColorStop(0, "#FFF8EB");
      gradient.addColorStop(0.35, "#DCC5A9");
      gradient.addColorStop(0.75, "#B58B68");
      gradient.addColorStop(1, "#806047");

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.ellipse(
        centerX - radius * 0.28,
        centerY - radius * 0.36,
        radius * 0.25,
        radius * 0.12,
        -0.6,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fill();

      // Technology name
      let fontSize = Math.max(9, radius * 0.29);

      ctx.font = `600 ${fontSize}px Inter, sans-serif`;

      while (
        ctx.measureText(orb.name).width > radius * 1.65 &&
        fontSize > 8
      ) {
        fontSize -= 0.5;
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      }

      ctx.fillStyle = "#403126";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(orb.name, centerX, centerY);

      ctx.restore();
    }

    function animate(time) {
      const delta = lastTime
        ? Math.min(time - lastTime, 32)
        : 16;

      lastTime = time;

      const visibleCount = isMobile ? 6 : 8;
      const currentVisibility = visibilityRef.current;

      // Detect entering or leaving the section.
      if (currentVisibility !== previousVisibility) {
        previousVisibility = currentVisibility;

        orbs.forEach((orb, index) => {
          orb.transitionFrom = orb.entryProgress;
          orb.transitionTo = currentVisibility ? 1 : 0;
          orb.transitionStart = time;

          // Enter in order, exit in reverse order.
          orb.transitionDelay = currentVisibility
            ? index * 120
            : (visibleCount - 1 - index) * 120;
        });
      }

      // Animate each orb separately.
      orbs.forEach((orb) => {
        if (orb.transitionStart === null) return;

        const elapsed =
          time -
          orb.transitionStart -
          orb.transitionDelay;

        if (elapsed < 0) return;

        const duration = 650;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic.
        const eased = 1 - Math.pow(1 - progress, 3);

        orb.entryProgress =
          orb.transitionFrom +
          (orb.transitionTo - orb.transitionFrom) * eased;

        if (progress >= 1) {
          orb.entryProgress = orb.transitionTo;
          orb.transitionStart = null;
        }
      });

      ctx.clearRect(0, 0, width, height);

      // Replace one orb every second.
      if (time >= nextSwapTime) {
        const orb = orbs[swapIndex % visibleCount];

        if (!orb.changing && orb.opacity === 1) {
          orb.changing = true;
          swapIndex++;
          nextSwapTime = time + 1000;
        }
      }

      orbs.slice(0, visibleCount).forEach((orb) => {
        // Fade out and replace technology name.
        if (orb.changing) {
          orb.opacity -= delta / 500;

          if (orb.opacity <= 0) {
            orb.opacity = 0;
            orb.name = getNextTechnology(orb.name);
            orb.changing = false;
          }
        } else if (orb.opacity < 1) {
          orb.opacity = Math.min(
            1,
            orb.opacity + delta / 500
          );
        }

        // Mouse interaction.
        const x = orb.x * width + orb.offsetX;
        const y = orb.y * height + orb.offsetY;

        const dx = x - mouse.x;
        const dy = y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110 && distance > 0) {
          const force = (110 - distance) / 110;

          orb.offsetX += (dx / distance) * force * 1.3;
          orb.offsetY += (dy / distance) * force * 1.3;
        } else {
          orb.offsetX *= 0.96;
          orb.offsetY *= 0.96;
        }

        orb.offsetX = Math.max(
          -20,
          Math.min(20, orb.offsetX)
        );

        orb.offsetY = Math.max(
          -20,
          Math.min(20, orb.offsetY)
        );

        drawOrb(orb, time);
      });

      animationId = requestAnimationFrame(animate);
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-label="Floating technology spheres"
      />
    </div>
  );
}