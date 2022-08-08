let chickDiv = document.getElementById("walkingChick");
const chickens = chickDiv.children;
const chickArr = new Array(chickens.length);
let myWidth;
class Chick
{
    constructor(obj,right=true)
    {
        this.obj = obj;
        this.right = right;
        if (this.right)
        {
            this.x = -200;
        }
        else
        {
            this.x = myWidth + 200;
        }
        this.frame = true;
        this.key = 0;
        // 속도 랜덤
        let rand = Math.random();
        if (rand < 0.5 )
        {
            this.speed = 0.5;
        }
        else
        {
            this.speed = 1;
        }
        // 소스 바인딩
        if (this.right)
        {
            this.obj.src = "Chick/Chick-walkR.gif"
        }
        else
        {
            this.obj.src = "Chick/Chick-walk.gif"
        }
    }

    draw() {
// 오른쪽으로 걷기. 왼쪽으로 걷기. 왼쪽 바라보고 멈추기. 오른쪽 바라보고 멈추기.
// 왼쪽 바라보고 쓰러지기. 오른쪽 바라보고 쓰러지기.
        // 걷기
        if ( this.x <= -150 && this.right == false )
        {
            this.x = myWidth + 200;
            // 위치 초기화 및 속도 무작위 
            let rand = Math.random();
            if (rand < 0.5 )
            {
                this.speed = 0.5;
            }
            else
            {
                this.speed = 1;
            }
        }
        else if ( this.x >= myWidth && this.right == true)
        {
            this.x = -200;
            let rand = Math.random();
            if (rand < 0.5 )
            {
                this.speed = 0.5;
            }
            else
            {
                this.speed = 1;
            }
        }

        // 오른쪽으로 이동
        if (this.right)
        {
            this.x += this.speed;
            this.obj.style.left = this.x+"px";
        }
        // 왼쪽으로 이동
        else
        {
            this.x -= this.speed;
            this.obj.style.left = this.x+"px";
        }

    }
}

function startPoint(){
    let x = Math.floor(Math.random()*2);
    if (x == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

let set = setTimeout(function() {
    myWidth = window.innerWidth;
    for (let i = 0; i < chickens.length; i++)
    {
        let m = startPoint();
        eval("chick"+i+" = new Chick(chickens[" +i+ "],"+m+")");
        chickArr[i] = eval("chick"+i);
        eval("chick"+i).obj.style.left=  eval("chick"+i+".x")+"px";
        eval("chick"+i).obj.style.display="block";
    }
    
    setInterval(drawChick,16);
    clearTimeout(set);
},5000)


function drawChick() {
    for (let i = 0; i < chickArr.length; i++)
    {
        chickArr[i].draw()
    }
}
