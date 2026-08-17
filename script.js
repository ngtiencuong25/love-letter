/* =========================================
   LOVE LETTER WEBSITE
   Nguyễn Văn A -> Nguyễn Thị B
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const intro = document.getElementById("intro");

const letterScreen =
    document.getElementById("letterScreen");

const endScreen =
    document.getElementById("endScreen");

const openLetter =
    document.getElementById("openLetter");

const restartButton =
    document.getElementById("restartButton");

const heartsContainer =
    document.getElementById("hearts");

const starsContainer =
    document.getElementById("stars");

const musicButton =
    document.getElementById("musicButton");

const bgMusic =
    document.getElementById("bgMusic");


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove("active");

        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   OPEN LETTER
========================================= */

openLetter.addEventListener(
    "click",
    () => {

        createHeartBurst();

        setTimeout(() => {

            showScreen(letterScreen);

        }, 450);

        tryStartMusic();

    }
);


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        showScreen(intro);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   FLOATING HEART
========================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    const heartTypes = [
        "♥",
        "♡",
        "❤",
        "💗",
        "💕"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    const size =
        12 +
        Math.random() * 22;

    heart.style.fontSize =
        size + "px";

    const duration =
        7 +
        Math.random() * 8;

    heart.style.animationDuration =
        duration + "s";

    heart.style.animationDelay =
        Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);


    setTimeout(
        () => {

            heart.remove();

        },
        (duration + 3) * 1000
    );
}


/* =========================================
   START FLOATING HEARTS
========================================= */

setInterval(
    createFloatingHeart,
    700
);


/* =========================================
   HEART BURST
========================================= */

function createHeartBurst() {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.textContent =
            "♥";

        heart.style.left =
            "50%";

        heart.style.bottom =
            "40%";

        heart.style.fontSize =
            15 +
            Math.random() * 25 +
            "px";

        heart.style.animationDuration =
            2 +
            Math.random() * 2 +
            "s";

        heart.style.transform =
            `translateX(
                ${Math.random() * 400 - 200}px
            )`;

        heartsContainer.appendChild(heart);

        setTimeout(
            () => heart.remove(),
            5000
        );
    }
}


/* =========================================
   STARS
========================================= */

function createStars() {

    const amount =
        window.innerWidth < 600
            ? 60
            : 110;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("div");

        star.className =
            "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 4 + "s";

        star.style.animationDuration =
            2 +
            Math.random() * 4 +
            "s";

        starsContainer.appendChild(star);
    }
}

createStars();


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;


/*
    Trình duyệt thường chặn autoplay.
    Vì vậy nhạc sẽ được thử bật sau
    khi người dùng bấm "Mở thư".
*/

function tryStartMusic() {

    if (!bgMusic.src) {
        return;
    }

    bgMusic.volume = 0.35;

    bgMusic
        .play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent =
                "🔊";

        })
        .catch(() => {

            musicPlaying = false;

            musicButton.textContent =
                "🎵";

        });
}


/* =========================================
   MUSIC BUTTON
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (!bgMusic.src) {

            alert(
                "Muốn bật nhạc, hãy thêm file music.mp3 vào thư mục website rồi bỏ comment dòng source trong index.html nhé ❤️"
            );

            return;
        }


        if (musicPlaying) {

            bgMusic.pause();

            musicPlaying = false;

            musicButton.textContent =
                "🔇";

        } else {

            bgMusic
                .play()
                .then(() => {

                    musicPlaying = true;

                    musicButton.textContent =
                        "🔊";

                })
                .catch(() => {

                    alert(
                        "Không thể phát nhạc trên thiết bị này."
                    );

                });

        }

    }
);


/* =========================================
   ENVELOPE EFFECT
========================================= */

const envelope =
    document.querySelector(".envelope");

envelope.addEventListener(
    "click",
    () => {

        createHeartBurst();

    }
);


/* =========================================
   PARALLAX
========================================= */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 2;

        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 2;

        const envelope =
            document.querySelector(".envelope");

        if (
            envelope &&
            window.innerWidth > 700
        ) {

            envelope.style.transform =
                `
                rotateY(${x * 5}deg)
                rotateX(${y * -5}deg)
                translateY(-5px)
                `;

        }

    }
);


/* =========================================
   RESET PARALLAX
========================================= */

document.addEventListener(
    "mouseleave",
    () => {

        const envelope =
            document.querySelector(".envelope");

        if (envelope) {

            envelope.style.transform =
                "";

        }

    }
);


/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            musicPlaying
        ) {

            bgMusic.pause();

        }

    }
);


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%c💌 Love Letter",
    "font-size:24px;font-weight:bold;color:#ff5b9d;"
);

console.log(
    "%cGửi Nguyễn Thị B ❤️",
    "font-size:16px;color:#d88cff;"
);