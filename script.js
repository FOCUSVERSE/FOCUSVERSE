const FALLBACK = {
  latestVersion: "1.0.0",

  downloadUrl:
    "https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-v1.0.0.apk",

  windowsUrl:
    "https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-Windows-v1.0.0.zip",

  releaseUrl:
    "https://github.com/FOCUSVERSE/FOCUSVERSE/releases/tag/v1.0.0"
};


// ---------------------------------------------------------
// CANVAS SPACE BACKGROUND
// ---------------------------------------------------------

const canvas = document.getElementById("spaceCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;

  const particles = [];

  const PARTICLE_COUNT = 120;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      drift: Math.random() * 0.5 - 0.25,
      alpha: Math.random() * 0.7 + 0.15
    };
  }

  function initializeParticles() {
    particles.length = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
      particle.y -= particle.speed;
      particle.x += particle.drift * 0.08;

      if (particle.y < -10) {
        particle.y = height + 10;
      }

      if (particle.x < -10) {
        particle.x = width + 10;
      }

      if (particle.x > width + 10) {
        particle.x = -10;
      }

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(145, 255, 0, ${particle.alpha})`;

      ctx.fill();
    }

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initializeParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initializeParticles();
  });
}


// ---------------------------------------------------------
// SMOOTH SCROLL
// ---------------------------------------------------------

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


// ---------------------------------------------------------
// REVEAL ANIMATIONS
// ---------------------------------------------------------

const revealElements =
  document.querySelectorAll(".section-reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// ---------------------------------------------------------
// VERSION DATA
// ---------------------------------------------------------

async function loadVersionData() {

  try {

    const response = await fetch(
      `version.json?t=${Date.now()}`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error("Version file unavailable");
    }

    const data = await response.json();

    return {
      ...FALLBACK,
      ...data
    };

  } catch (error) {

    console.warn(
      "Using fallback release configuration.",
      error
    );

    return FALLBACK;
  }
}


// ---------------------------------------------------------
// APPLY DOWNLOAD LINKS
// ---------------------------------------------------------

async function configureDownloads() {

  const release = await loadVersionData();

  const androidLinks =
    document.querySelectorAll(
      '[data-download="android"]'
    );

  const windowsLinks =
    document.querySelectorAll(
      '[data-download="windows"]'
    );

  const releaseLinks =
    document.querySelectorAll(
      '[data-release-link]'
    );


  androidLinks.forEach((link) => {
    link.href = release.downloadUrl;
  });


  windowsLinks.forEach((link) => {
    link.href = release.windowsUrl;
  });


  releaseLinks.forEach((link) => {
    link.href = release.releaseUrl;
  });


  document.querySelectorAll(
    "[data-version]"
  ).forEach((element) => {

    element.textContent =
      `v${release.latestVersion}`;

  });

}


// ---------------------------------------------------------
// BUTTON RIPPLE
// ---------------------------------------------------------

document.querySelectorAll(
  ".primary-button, .secondary-button, .download-card"
).forEach((button) => {

  button.addEventListener("pointerdown", (event) => {

    const rect =
      button.getBoundingClientRect();

    const ripple =
      document.createElement("span");

    ripple.className = "ripple";

    ripple.style.left =
      `${event.clientX - rect.left}px`;

    ripple.style.top =
      `${event.clientY - rect.top}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 650);

  });

});


// ---------------------------------------------------------
// DOWNLOAD CONFIG
// ---------------------------------------------------------

configureDownloads();
