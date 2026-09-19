const CONFIG = {

    androidUrl:
        "https://github.com/panditji11029-hash/FOCUSVERSE/releases/download/v1.0.0/app-debug.apk",

    windowsUrl:
        "https://github.com/panditji11029-hash/FOCUSVERSE/releases/download/v1.0.0/focusverse-windows.zip",

    version:
        "v1.0.0"
};


/* ================================
   DOWNLOAD LINKS
================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const androidButton =
            document.getElementById(
                "android-download"
            );


        const windowsButton =
            document.getElementById(
                "windows-download"
            );


        const versionStatus =
            document.getElementById(
                "version-status"
            );


        if (androidButton) {

            androidButton.href =
                CONFIG.androidUrl;

            androidButton.removeAttribute(
                "target"
            );

            androidButton.removeAttribute(
                "onclick"
            );

            androidButton.setAttribute(
                "download",
                ""
            );

        }


        if (windowsButton) {

            windowsButton.href =
                CONFIG.windowsUrl;

            windowsButton.removeAttribute(
                "target"
            );

            windowsButton.removeAttribute(
                "onclick"
            );

        }


        if (versionStatus) {

            versionStatus.textContent =
                `FOCUSVERSE ${CONFIG.version} • Android + Windows available`;

        }


        initializeRevealAnimations();

        initializeReactions();

        initializeSmoothScroll();

        initializeCursor();

    }
);


/* ================================
   CURSOR GLOW
================================ */

function initializeCursor() {

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (!cursorGlow) {
        return;
    }


    document.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* ================================
   REVEAL ANIMATIONS
================================ */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".feature-card, " +
            ".section-heading, " +
            ".world-copy, " +
            ".universe, " +
            ".community-preview, " +
            ".platform-card, " +
            ".download-note"
        );


    if (!revealElements.length) {
        return;
    }


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }

}


/* ================================
   SMOOTH NAVIGATION
================================ */

function initializeSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


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

                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );

                        }

                    }
                );

            }
        );

}


/* ================================
   COMMUNITY REACTIONS
================================ */

function initializeReactions() {

    document
        .querySelectorAll(
            ".reactions button"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        button.classList.toggle(
                            "active"
                        );


                        const count =
                            button.querySelector(
                                "span"
                            );


                        if (!count) {
                            return;
                        }


                        const current =
                            Number(
                                count.textContent
                            );


                        if (
                            Number.isNaN(
                                current
                            )
                        ) {
                            return;
                        }


                        if (
                            button.classList.contains(
                                "active"
                            )
                        ) {

                            count.textContent =
                                current + 1;

                        } else {

                            count.textContent =
                                Math.max(
                                    0,
                                    current - 1
                                );

                        }

                    }
                );

            }
        );

}


/* ================================
   KEYBOARD ACCESSIBILITY
================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            document
                .activeElement
                ?.blur();

        }

    }
);
