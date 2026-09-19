const CONFIG = {
    androidUrl:
        "https://github.com/panditji11029-hash/FOCUSVERSE/releases/download/v1.0.0/app-debug.apk",

    windowsUrl:
        "https://github.com/panditji11029-hash/FOCUSVERSE/releases/latest",

    version:
        "v1.0.0"
};


/* ===============================
   DOWNLOAD BUTTONS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const androidButton =
        document.getElementById("android-download");

    const windowsButton =
        document.getElementById("windows-download");

    const versionStatus =
        document.getElementById("version-status");


    /* ANDROID */

    if (androidButton) {

        androidButton.href =
            CONFIG.androidUrl;

        androidButton.removeAttribute("target");

        androidButton.removeAttribute("onclick");

        androidButton.setAttribute(
            "download",
            ""
        );
    }


    /* WINDOWS */

    if (windowsButton) {

        windowsButton.href =
            CONFIG.windowsUrl;

        windowsButton.removeAttribute("onclick");
    }


    /* VERSION STATUS */

    if (versionStatus) {

        versionStatus.textContent =
            `FOCUSVERSE ${CONFIG.version} • Android download available`;
    }

});


/* ===============================
   CURSOR GLOW
================================ */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (cursorGlow) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });

}


/* ===============================
   SCROLL REVEAL
================================ */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .section-heading, .world-copy, .universe, .community-preview, .platform-card"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal"
        );

        observer.observe(
            element
        );

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* ===============================
   SMOOTH NAVIGATION
================================ */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


/* ===============================
   COMMUNITY REACTION ANIMATION
================================ */

document
    .querySelectorAll(".reactions button")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle(
                    "active"
                );

            }
        );

    });
