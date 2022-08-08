const backgroundCanvas = document.getElementById("backgroundCanvas");
const ctxBackground = backgroundCanvas.getContext("2d");
let backgroundMode = undefined;

backgroundCanvas.width = innerWidth;
backgroundCanvas.height = innerHeight;
// 게임의 시간과 유저의 남은 생명을 필터링한다.
function checkGameData() {
    backgroundCanvas.width = innerWidth;
    backgroundCanvas.height = innerHeight;
    if (min == 0)
    {
        backgroundMode = "begin"
    }
    else if (min == 1)
    {
        backgroundMode = "level_1"
    }
    else if (min == 2)
    {
        backgroundMode = "level_2"
    }
    else if (min >= 3)
    {
        backgroundMode = "level_3"
    }

    if ( user.life <= 0 )
    {
        backgroundMode = "gameOver"
    }

    changeBackground();
    makeText();
    changeText();

}

function changeBackground() {
    if (backgroundMode =="begin" )
    {
        backgroundCanvas.style.backgroundColor = "#F1ECC3";
    }
    else if (backgroundMode == "level_1" )
    {
        backgroundCanvas.style.backgroundColor = "#C9D8B6";
    }
    else if (backgroundMode == "level_2" )
    {
        backgroundCanvas.style.backgroundColor = "#57837B";
    }
    else if (backgroundMode == "level_3" )
    {
        backgroundCanvas.style.backgroundColor = "#515E63";
    }
    else if (backgroundMode == "gameOver" )
    {
        backgroundCanvas.style.backgroundColor = "#112031";
    }
}

const textArr = [
    // 0
    "print('hello world')",
    "console.log('hello world')",
    // 1
    "for(let i = 0; i < myArr.length; i++)",
    "if (check){ console.log('check') } ",
    // 2
    "while (true) { console.log('newObj' + key); key += 1 }",
    "document.getElementById('LEVEL_3')",
    // 3
    "< GAME > < /GAME >",
    // over
    "< /GAME OVER >"
]

class Text
{
    constructor(x, y, text, speed, font){
        this.x = x;
        this.y = y;
        this.text = text;
        this.speed = speed;
        this.font = font;
    }
    draw()
    {
        ctxBackground.font = this.font;
        if (backgroundMode =="gameOver" )
        {
            ctxBackground.fillStyle="green";
        }
        ctxBackground.fillText(this.text, this.x, this.y);
        this.x += this.speed;
    }
}

let textClassArr = new Array();
let textKey = 0;
function makeText() {
    let per = Math.random();
    let dy = Math.floor(Math.random()*screen.height);

    if (backgroundMode == "begin")
    {

        if (per <= 0.01)
        {
            let what = Math.floor(Math.random()*2);
            textClassArr[textKey] = new Text(-200,dy,textArr[what],0.5,"10px Verdana");
            textKey += 1;
        }
    }
    else if (backgroundMode == "level_1")
    {
        if (per <= 0.03)
        {
            let what = Math.floor(Math.random()*2);
            textClassArr[textKey] = new Text(-600,dy,textArr[what+2],0.8,"16px Verdana");
            textKey += 1;
        }
    }
    else if (backgroundMode == "level_2")
    {
        if (per <= 0.05)
        {
            let what = Math.floor(Math.random()*2);
            textClassArr[textKey] = new Text(-700,dy,textArr[what+4],1.1,"24px Verdana");
            textKey += 1;
        }
    }
    else if (backgroundMode == "level_3")
    {
        if (per <= 0.07)
        {
            let what = Math.floor(Math.random()*2);
            textClassArr[textKey] = new Text(-800,dy,textArr[what+6],1.4,"30px Verdana");
            textKey += 1;
        }
    }
    else if ( backgroundMode == "gameOver" )
    {
        if (per <= 0.05)
        {
            textClassArr[textKey] = new Text(-500,dy,textArr[textArr.length-1],2,"40px Verdana");
            textKey += 1;
        }
    }
}


function changeText() {
    ctxBackground.clearRect(0,0,backgroundCanvas.width,backgroundCanvas.height)
    for (let i = 0; i < textClassArr.length; i++)
    {
        textClassArr[i].draw()
    }
}

setInterval(checkGameData,16)