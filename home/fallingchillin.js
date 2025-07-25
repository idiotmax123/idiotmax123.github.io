async function spawnChillin() {
    const img = document.createElement("img");
    img.src = "/assets/chillin64x64.png";
    img.style.position = "absolute";
    img.style.left = Math.floor(Math.random() * screen.availWidth) + "px";
    img.style.top = "-20px";
    img.style.zIndex = "9999";
    document.body.appendChild(img);

    let y = -20;
    const fall = () => {
        y += 10;
        img.style.top = y + "px";

        if (y < screen.availHeight + 64) {
            requestAnimationFrame(fall);
        } else {
            img.remove();
        }
    };

    requestAnimationFrame(fall);
}

function chillinsThread() {
    setInterval(spawnChillin, 35);
}

chillinsThread();
