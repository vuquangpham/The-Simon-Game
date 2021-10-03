const $$ = document.querySelectorAll.bind(document);

const soundList = ['wrong', 'green', 'red', 'yellow', 'blue'];
const user = [];
const roadMap = {
    road: [],
    state: false
};

$$('.btn').forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        handleClick(idx + 1);
    })
})

const randomNumber = () => Math.floor(Math.random() * 4 + 1);

function wrongAnswer() {
    playAudio(0);
    roadMap.state = false;

    $('body').css("background-color", "red");
    $('h1').text("Game Over, Press Any Key to Restart")

    setTimeout(() => {
        $('body').css("background-color", "#011F3F");
        main();
    }, 300)
}

function handleClick(num) {
    if (roadMap.state) {
        user.push(num);
        makeAnimation(num);

        if (!check()) {
            wrongAnswer();
        }
        else {
            playAudio(num)

            if (user.length === roadMap.road.length) {
                setTimeout(() => {
                    // Change title
                    $('h1').text(`You have ${user.length} scores`);

                    // Next level
                    const randNum = randomNumber();
                    roadMap.road.push(randNum);
                    makeAnimation(randNum);
                    playAudio(randNum);

                    // Reset user round
                    user.splice(0);
                }, 800)
            }
        }
    } else {
        alert("Press a key to start");
    }
}

function check() {
    for (let i = 0; i < user.length; i++) {
        const element = user[i];
        if (element !== roadMap.road[i])
            return 0;
    }
    return 1;
}

function initGame() {
    document.removeEventListener('keydown', initGame);

    roadMap.road.splice(0);
    user.splice(0);

    const randNum = randomNumber();

    roadMap.road.push(randNum);
    roadMap.state = true;
    makeAnimation(randNum);
    playAudio(randNum)
}

function playAudio(num) {
    const audio = new Audio(`./sounds/${soundList[num]}.mp3`);
    audio.play();
}

function makeAnimation(num) {
    $(`#${soundList[num]}`).addClass("pressed");
    setTimeout(() => {
        $(`#${soundList[num]}`).removeClass("pressed");
    }, 100)
}

function main() {
    document.addEventListener('keydown', initGame);
}

main();