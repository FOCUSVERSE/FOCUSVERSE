"use strict";


/* ==========================================
   FOCUSVERSE CINEMATIC ENGINE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  initStars();

  initCursor();

  initReveal();

  initParallax();

  initSmoothScroll();

  initDownloads();

  initStageInteraction();

  initMagneticButtons();

});


/* ==========================================
   SPACE PARTICLES
========================================== */

function initStars() {

  const canvas =
    document.getElementById("space");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  let width;
  let height;

  let stars = [];

  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  function resize() {

    width =
      window.innerWidth;

    height =
      window.innerHeight;

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    stars =
      Array.from(
        {
          length:
            Math.min(
              180,
              Math.floor(
                width * height / 9000
              )
            )
        },
        () => ({
          x:Math.random() * width,
          y:Math.random() * height,
          r:Math.random() * 1.4 + .2,
          a:Math.random() * .55 + .1,
          s:Math.random() * .2 + .02
        })
      );

  }


  function draw() {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    stars.forEach(star => {

      ctx.beginPath();

      ctx.arc(
        star.x,
        star.y,
        star.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(170,255,80,${star.a})`;

      ctx.fill();


      if (!reduced) {

        star.y -= star.s;

        if (star.y < -5) {

          star.y =
            height + 5;

          star.x =
            Math.random() * width;
        }

      }

    });


    if (!reduced) {

      requestAnimationFrame(
        draw
      );

    }

  }


  window.addEventListener(
    "resize",
    resize
  );


  resize();

  draw();
}


/* ==========================================
   CURSOR
========================================== */

function initCursor() {

  const cursor =
    document.getElementById(
      "cursor"
    );

  if (!cursor) return;


  if (
    window.matchMedia(
      "(pointer:coarse)"
    ).matches
  ) {

    cursor.style.display =
      "none";

    return;
  }


  window.addEventListener(
    "mousemove",
    event => {

      cursor.style.left =
        event.clientX + "px";

      cursor.style.top =
        event.clientY + "px";

    }
  );

}


/* ==========================================
   REVEAL
========================================== */

function initReveal() {

  const targets =
    document.querySelectorAll(
      ".system-card,.world-stage,.stage,.companion,.community-ui,.download-inner"
    );


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.animate(
                [
                  {
                    opacity:0,
                    transform:
                      "translateY(35px)"
                  },
                  {
                    opacity:1,
                    transform:
                      "translateY(0)"
                  }
                ],
                {
                  duration:800,
                  easing:
                    "cubic-bezier(.16,1,.3,1)",
                  fill:"forwards"
                }
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:.12
      }
    );


  targets.forEach(
    target =>
      observer.observe(target)
  );

}


/* ==========================================
   PARALLAX
========================================== */

function initParallax() {

  if (
    window.matchMedia(
      "(pointer:coarse)"
    ).matches
  ) return;


  const planet =
    document.querySelector(
      ".planet-system"
    );


  if (!planet) return;


  window.addEventListener(
    "mousemove",
    event => {

      const x =
        event.clientX /
        window.innerWidth -
        .5;

      const y =
        event.clientY /
        window.innerHeight -
        .5;


      planet.style.transform =
        `translate3d(${x * 12}px,${y * 12}px,0)`;

    }
  );

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll() {

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        if (
          !id ||
          id === "#"
        ) return;


        const target =
          document.querySelector(id);

        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      }
    );

  });

}


/* ==========================================
   DOWNLOAD / VERSION SYSTEM
========================================== */

async function initDownloads() {

  const fallback = {

    latestVersion:"1.0.0",

    android:
      "https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-v1.0.0.apk",

    windows:
      "https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-Windows-v1.0.0.zip"

  };


  let config =
    fallback;


  try {

    const response =
      await fetch(
        "version.json?cache=" +
        Date.now(),
        {
          cache:"no-store"
        }
      );


    if (!response.ok)
      throw new Error(
        "version.json failed"
      );


    const remote =
      await response.json();


    config = {
      ...fallback,
      ...remote
    };

  } catch(error) {

    console.warn(
      "Using fallback release configuration."
    );

  }


  document.querySelectorAll(
    '[data-download="android"]'
  ).forEach(link => {

    link.href =
      config.android ||
      fallback.android;

  });


  document.querySelectorAll(
    '[data-download="windows"]'
  ).forEach(link => {

    link.href =
      config.windows ||
      fallback.windows;

  });


  document.querySelectorAll(
    "[data-version]"
  ).forEach(label => {

    label.textContent =
      "v" +
      String(
        config.latestVersion
      ).replace(/^v/i,"");

  });

}


/* ==========================================
   WORLD STAGE INTERACTION
========================================== */

function initStageInteraction() {

  const stages =
    document.querySelectorAll(
      ".stage"
    );


  const label =
    document.querySelector(
      ".world-label strong"
    );


  if (!stages.length)
    return;


  stages.forEach(stage => {

    stage.addEventListener(
      "mouseenter",
      () => {

        stages.forEach(
          s =>
            s.classList.remove(
              "active"
            )
        );


        stage.classList.add(
          "active"
        );


        if (label) {

          label.textContent =
            stage
              .querySelector("b")
              .textContent;

        }

      }
    );

  });

}


/* ==========================================
   MAGNETIC BUTTONS
========================================== */

function initMagneticButtons() {

  if (
    window.matchMedia(
      "(pointer:coarse)"
    ).matches
  ) return;


  const buttons =
    document.querySelectorAll(
      ".btn,.nav-btn,.download-card"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "mousemove",
      event => {

        const rect =
          button.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        button.style.transform =
          `translate(${x * .08}px,${y * .08}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform =
          "";

      }
    );

  });

}
