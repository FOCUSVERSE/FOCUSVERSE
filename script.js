const CONFIG = {

    /*
     * IMPORTANT:
     * Change these two values.
     */

    githubOwner: "panditji11029-hash",

    githubRepo: "FOCUSVERSE",

    androidFile: "app-debug.apk",

    windowsFile: "focusverse-windows.zip"

};


/* CURSOR EFFECT */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", function(event) {

    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";

});


/* GITHUB RELEASE */

async function loadLatestRelease() {

    const status =
        document.getElementById("version-status");

    const android =
        document.getElementById("android-download");

    const windows =
        document.getElementById("windows-download");


    const api =
        `https://api.github.com/repos/${CONFIG.githubOwner}/${CONFIG.githubRepo}/releases/latest`;


    try {

        const response =
            await fetch(api);


        if (!response.ok) {

            throw new Error(
                "Release not found"
            );

        }


        const release =
            await response.json();


        const assets =
            release.assets || [];


        const androidAsset =
            assets.find(
                asset =>
                    asset.name.toLowerCase() ===
                    CONFIG.androidFile.toLowerCase()
            );


        const windowsAsset =
            assets.find(
                asset =>
                    asset.name.toLowerCase() ===
                    CONFIG.windowsFile.toLowerCase()
            );


        if (androidAsset) {

            android.href =
                androidAsset.browser_download_url;

        }
        else {

            android.href =
                `https://github.com/${CONFIG.githubOwner}/${CONFIG.githubRepo}/releases/latest`;

        }


        if (windowsAsset) {

            windows.href =
                windowsAsset.browser_download_url;

        }
        else {

            windows.href =
                `https://github.com/${CONFIG.githubOwner}/${CONFIG.githubRepo}/releases/latest`;

        }


        status.textContent =
            `Latest version: ${release.tag_name}`;


    }
    catch (error) {

        android.href =
            `https://github.com/${CONFIG.githubOwner}/${CONFIG.githubRepo}/releases/latest`;

        windows.href =
            `https://github.com/${CONFIG.githubOwner}/${CONFIG.githubRepo}/releases/latest`;

        status.textContent =
            "Latest releases available on GitHub.";

    }

}


/* SCROLL REVEAL */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(
        ".feature-card, .platform-card, .community-preview"
    )
    .forEach(
        element =>
            observer.observe(element)
    );


loadLatestRelease();
