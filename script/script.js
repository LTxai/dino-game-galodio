function startGame() {
    const galodinho = document.querySelector('.galodinho');
    const background = document.querySelector('.background');

    let galodinhoIsJumping = false;
    let galodinhoPosition = 0;
    let points = 0

    function handleKeyUp(event) {
        if (event.keyCode === 32) {
            if (!galodinhoIsJumping) {
                jump()
            }
        }
    }

    function handleTouch() {
        if (!galodinhoIsJumping) {
            jump()
        }
    }

    function jump() {

        galodinhoIsJumping = true;

        let jumpUp = setInterval(() => {
            if (galodinhoPosition >= 150) {
                clearInterval(jumpUp);

                let jumpDown = setInterval(() => {
                    if (galodinhoPosition <= 0) {
                        clearInterval(jumpDown);
                        galodinhoIsJumping = false;
                    } else {
                        galodinhoPosition -= 4;
                        galodinho.style.bottom = galodinhoPosition + 'px'
                    }
                })
            } else {
                galodinhoPosition += 4;
                galodinho.style.bottom = galodinhoPosition + 'px'
            }
        })
    }

    function createCactus() {
        const cactus = document.createElement('div');
        let cactusPosition = 2000;
        let randomTime = Math.random() * 6000;

        cactus.classList.add('cactus');
        cactus.style.left = cactusPosition + 'px';
        background.appendChild(cactus);



        let leftInterval = setInterval(() => {
            if (cactusPosition < -60) {
                clearInterval(leftInterval);
                background.removeChild(cactus);
                points += 1;
                document.getElementById("score").innerHTML = `Pontos: ${points}`

            } else if (cactusPosition > 0 && cactusPosition < 60 && galodinhoPosition < 60) {
                clearInterval(leftInterval);
                document.body.innerHTML = `
                <div>
                <h2 class="game-over">Fim de jogo! </br> Pontuação: ${points}</h2>
                <p class='developed-by'> Feito por: <a href=http://www.github.com/LTxai>Lucas Txai</a>
                </div>
                `
            } else {
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px'
            }
        }, 20)

        setTimeout(createCactus, randomTime);
    }

    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('touchend', handleTouch);
    console.log(`Pontos: ${points}`)
    createCactus()
}

startGame()