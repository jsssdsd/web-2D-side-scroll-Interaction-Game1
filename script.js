// 상수 선언 (변하지 않는 객체들)
const canvas = document.getElementById("canvas");
const img = new Image();
const ctx = canvas.getContext("2d");
const canvasUser = document.getElementById("canvasUser");
const ctxUser = canvasUser.getContext("2d");
const myDiv = document.getElementById("canvasDiv");
const canvasBall = document.getElementById("canvasBall");
const ctxBall = canvasBall.getContext("2d");
const canvasMonster = document.getElementById("canvasMonster");
const ctxMonster = canvasMonster.getContext("2d");
const input = document.getElementById('input');
const button = document.getElementById('button');
const startImg = document.getElementById('img');
const screenBlur = document.getElementById('screen-blur');

img.src="background/순수배경.png";
let myGround = new Array(2);

// 변수 선언
let imgCenterX;
let imgCenterY;
let userFrame;
let que;

// 유저 클래스 객체 정의
class User
{
	// 객체 속성 설정
	constructor(life, X, Y)
	{
		this.life = life; // 10
		this.x = X; // 0
		this.y = Y; // 0
		this.normalUrl = "Chick/Chick/";
		this.walkUrl = "Chick/Chick-walk/";
		this.attackUrl = "Chick/Chick-attack/";
		this.deadUrl = "Chick/Chick-dead/";
		this.arrow = "left";
		this.speed = 6;
		this.jumpV = 190;
		this.damage = 1;
		this.score = 0;
	}

	// 움직임 함수
	draw(action)
	{
		let userImg = new Array();
		let url;
		let countFrame=0;
		if (action == "normal")
		{
			url = this.normalUrl;
			if (user.arrow == "right")
			{
				url = url.substring(0,url.length-1);
				url += "R/"
				
				for (let i=0; i<27; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
			else
			{
				for (let i=0; i<27; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
		}
		else if (action == "walk")
		{
			url = this.walkUrl;
			if (user.arrow == "right")
			{
				url = url.substring(0,url.length-1);
				url += "R/"
				for (let i=0; i<20; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
			else
			{
				for (let i=0; i<19; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
		}
		else if (action == "dead")
		{
			url = this.deadUrl;
			for (let i=0; i<16; i++)
			{
				userImg[i] = new Image();
				userImg[i].src=url+i+".gif";
			}
		}
		// 공격모션 보류
		// 키 입력할때마다 모션 초기화 시 버벅임 문제 발생가능성
		else if (action == "attack")
		{
			url = this.attackUrl;
			if (user.arrow == "right")
			{
				url = url.substring(0,url.length-1);
				url += "R/"
				
				for (let i=0; i<27; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
			else
			{
				for (let i=0; i<16; i++)
				{
					userImg[i] = new Image();
					userImg[i].src=url+i+".gif";
				}
			}
		}
		function animatedUser() {
			if (user.x <= 3200-640 && user.x >= -3200+640)
			{
				if (user.y >= 600)
				{
					ctxUser.clearRect(0,0,canvas.width,canvas.height);
					ctxUser.drawImage(userImg[countFrame],canvas.width/2-60,canvas.height-126-65-(user.y-600));
					countFrame+=1;
					if (countFrame==userImg.length)
					{
						countFrame=0;
					}
					userFrame = window.requestAnimationFrame(function(){ animatedUser() })
				}
				else
				{
					ctxUser.clearRect(0,0,canvas.width,canvas.height);
					ctxUser.drawImage(userImg[countFrame],canvas.width/2-60,canvas.height-126-65);
					countFrame+=1;
					if (countFrame==userImg.length)
					{
						countFrame=0;
					}
					userFrame = window.requestAnimationFrame(function(){ animatedUser() })
				}
			}
			else
			{
				let dis;
				if (user.x <= -3200+640)
				{
					dis = -3200+640 - user.x
				}
				else
				{
					dis = 3200-640 - user.x
				}
				ctxUser.clearRect(0,0,canvas.width,canvas.height);
				if (user.y >= 600)
				{
					ctxUser.drawImage(userImg[countFrame],canvas.width/2-60-dis,canvas.height-126-65-(user.y-600));
				}
				else
				{
					ctxUser.drawImage(userImg[countFrame],canvas.width/2-60-dis,canvas.height-126-65);
				}
				countFrame+=1;
				if (countFrame==userImg.length)
				{
					countFrame=0;
				}
				userFrame = window.requestAnimationFrame(function(){ animatedUser() })
			}
		}

		userFrame = window.requestAnimationFrame(function(){ animatedUser() })

	}
	// 점프 함수
	jump(startY)
	{
		let t=0;
		function _jump()
		{
			user.y = startY+user.jumpV*t - 1/2 * 50 * t**2;
			t+=0.15;
			
			if (user.y < 0)
			{
				arrowUp = false;
				user.y = 0;
				myGround[0]=undefined;
				myGround[1]=undefined;
				clearInterval(que);
			}
			// 낙하순간 체크
			else if (user.jumpV < 50 * t)
			{
				// 지형물 객체 검수
				for (let i =0; i< cloudArr.length; i++)
				{
					// x 좌표 필터
					if (user.x >= cloudArr[i].x1 && user.x <= cloudArr[i].x2 )
					{
						// y 좌표 필터. Interval 주기를 고려해서 오차값 범위 내
						if(590 <= Math.floor(user.y) && 610 >= Math.floor(user.y))
						{
							arrowUp = false;
							user.y = 600;
							myGround[0]=cloudArr[i].x1;
							myGround[1]=cloudArr[i].x2;
							clearInterval(que);
						}
					}
				}
				// 지형물 객체 검수
				for (let i =0; i<groundArr.length; i++)
				{
					// x 좌표 필터
					if (user.x >= groundArr[i].x1 && user.x <= groundArr[i].x2 )
					{
						// y 좌표 필터. Interval 주기를 고려해서 오차값 범위 내
						if(285 >= Math.floor(user.y) && 265 <= Math.floor(user.y))
						{
							arrowUp = false;
							user.y = 275;
							myGround[0]=groundArr[i].x1;
							myGround[1]=groundArr[i].x2;
							clearInterval(que);
						}
					}
				}
			}
		}
		let que = setInterval(_jump,16)
	}
}


// 투사체 클래스 객체 정의
let ballImgs = new Array();  // 투사체이미지 저장할array형성
for (let i=0; i<4; i++)
{
	ballImgs[i] = new Image();
	ballImgs[i].src="atk/thr/"+i+".gif";
}

class Ball
{
	constructor(X,Y,arrow) {
		this.x = X;
		this.y = Y;
		this.arrow = arrow;
		this.speed = 16;
		if (this.arrow=="left")
			this.x -= 80
		else
			this.x += 80
		this.images = ballImgs;
	}

	draw() {
		let countFrame = 0;
		if (user.x <= 3200-640 && user.x >= -3200+640)
		{
			if (user.y >= 600)
			{
				ctxBall.drawImage(ballImgs[countFrame],canvas.width/2 +this.x- user.x - ballImgs[countFrame].width/2, canvas.height - this.y + 600 - 120);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
			}
			else
			{
				ctxBall.drawImage(ballImgs[countFrame],canvas.width/2 + this.x-user.x - ballImgs[countFrame].width/2 , canvas.height - this.y + user.y - 130);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
			}

		}
		else if (user.x > 3200-640)
		{
			if (user.y >= 600)
			{
				ctxBall.drawImage(ballImgs[countFrame],canvas.width/2 + this.x -3200+640 - ballImgs[countFrame].width/2 ,
				canvas.height - this.y + 600 - 130);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
			}
			else
			{
				ctxBall.drawImage( ballImgs[countFrame],canvas.width/2 + this.x -3200+640 - ballImgs[countFrame].width/2,
				canvas.height - this.y + user.y - 130);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
			}
		}
		else if (user.x < -3200+640)
		{
			if (user.y >= 600)
			{
				ctxBall.drawImage( ballImgs[countFrame],canvas.width/2 + this.x +3200-640 - ballImgs[countFrame].width/2,
				canvas.height - this.y + 600 - 130);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
					
			}
			else
			{
				ctxBall.drawImage(ballImgs[countFrame],canvas.width/2 + this.x +3200-640 - ballImgs[countFrame].width/2,
				canvas.height - this.y + user.y - 130);
				countFrame+=1;
				if (countFrame==ballImgs.length)
				{
					countFrame=0;
				}
			}
		}


		if (this.arrow == "right")
		{
			this.x += this.speed;
		}
		else
		{
			this.x -= this.speed;
		}
	}
}
// 몬스터 이미지 저장
let httpArr = new Image();
let cssArr = new Image();
let jsArr = new Image();
let pyArr = new Image();
let githubArr = new Image();
let vscodeArr = new Image();

httpArr.src="Monster/1.Html/0.gif"
cssArr.src="Monster/2.Css/0.gif"
jsArr.src="Monster/3.Js/0.gif"
pyArr.src="Monster/4.Py/0.gif"
vscodeArr.src="Monster/5.Vscode/0.gif"
githubArr.src="Monster/6.Github/0.gif"

// 몬스터 클래스
class Monster
{
	constructor(X,Y,S,A,L,Score,url,F=false) {
		this.x = X; // 최초 x 좌표
		this.y = Y; // 최초 y 좌표
		this.speed = S; // 몬스터 속도
		this.atc = A; // 몬스터 공격력
		this.life = L; // 몬스터 생명력
		this.score = Score; // 처치 점수
		this.fly = F; // 몬스터 공중 여부
		this.url = url;

		if (this.url == "http")
		{
			this.images = httpArr;
		}
		else if (this.url == "css")
		{
			this.images = cssArr;
		}
		else if (this.url == "python")
		{
			this.images = pyArr;
		}
		else if (this.url == "javascript")
		{
			this.images = jsArr;
		}
		else if (this.url == "github")
		{
			this.images = githubArr;
		}
		else if (this.url == "vscode")
		{
			this.images = vscodeArr;
		}
	}
	draw(obj)
	{
		// 공중유닛
		if(obj.fly)
		{
			if(user.x <= 3200-640 && user.x >= -3200+640)
			{
				if(user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x - user.x - obj.images.width/2 ,canvas.height - obj.y + user.y - obj.images.width/2 - 130);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x - user.x - obj.images.width/2 ,canvas.height - obj.y +600 - obj.images.width/2- 130);
				}
			}
			else if(user.x > 3200 - 640)
			{
				if (user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x -3200+640 - obj.images.width/2 ,canvas.height  - obj.y +user.y - obj.images.width/2- 130);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x -3200+640 - obj.images.width/2 ,canvas.height - obj.y +600 - obj.images.width/2- 130);
				}

			}
			else if(user.x < -3200 + 640)
			{
				if (user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x +3200-640 - obj.images.width/2 ,canvas.height  - obj.y +user.y - obj.images.width/2- 130);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x +3200-640 - obj.images.width/2 ,canvas.height - obj.y +600 - obj.images.width/2- 130);
				}

			}
			if (obj.y - user.y < 0)
			{
				obj.y += 1;
			}
			else
			{
				obj.y -= 1;
			}
		}
		// 지상유닛
		else
		{
			if(user.x <= 3200-640 && user.x >= -3200+640)
			{
				if(user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x - user.x - obj.images.width/2 ,canvas.height - 300 + obj.y + user.y);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x - user.x - obj.images.width/2 ,canvas.height - 300 + obj.y +600);
				}
			}
			else if(user.x > 3200 - 640)
			{
				if (user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x -3200+640 - obj.images.width/2 ,canvas.height - 300 + obj.y +user.y);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x -3200+640 - obj.images.width/2 ,canvas.height - 300 + obj.y +600);
				}

			}
			else if(user.x < -3200 + 640)
			{
				if (user.y < 600)
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x +3200-640 - obj.images.width/2 ,canvas.height - 300 + obj.y +user.y);
				}
				else
				{
					ctxMonster.drawImage(obj.images,canvas.width/2 + obj.x +3200-640 - obj.images.width/2 ,canvas.height - 300 + obj.y +600);
				}

			}
		}
		if (obj.x - user.x < 0)
		{
			obj.x += obj.speed;
		}
		else
		{
			obj.x -= obj.speed;
		}
	}
}

// 몬스터 생성 (반복)
let monsterArr = new Array();
let monsterCnt = 0;
let createPer = 0.5; // 1퍼센트일 경우 16밀리세컨드 기준 1.6초에 한 마리 생성.

function createMonster() {
	let createMyPer = Math.floor(Math.random()*1000+1)/10;
	let xArr = [-3600,3600];
	let LR = Math.floor(Math.random()*xArr.length);
	xArr = xArr[LR];
	let monsterY = Math.floor(Math.random()*1040);
	if (createMyPer <= createPer)
	{
		// 3분 지상 강력 몬스터 출현
		if (min >=3)
		{
			createPer = 4;
			let radMon = Math.floor(Math.random()*10);
			if (radMon<=1)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-1)+","+1+
				","+1+","+20+",'"+"http"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=3)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-1)+","+1+
				","+1+","+20+",'"+"css"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=5)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-1)+","+1+
				","+1+","+40+",'"+"python"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=7)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-1)+","+1+
				","+1+","+40+",'"+"javascript"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon==8)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed)+","+2+
				","+2+","+50+",'"+"github"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon==9)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed)+","+2+
				","+2+","+50+",'"+"vscode"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
		}
		// 2분 몬스터 이동속도 증가
		else if (min >=2)
		{
			createPer = 2;
			let radMon = Math.floor(Math.random()*8);
			if (radMon<=1)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-1)+","+1+
				","+1+","+10+",'"+"http"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=3)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-1)+","+1+
				","+1+","+10+",'"+"css"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=5)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-1)+","+1+
				","+1+","+20+",'"+"python"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=7)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-1)+","+1+
				","+1+","+20+",'"+"javascript"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}

		}
		// 1분 공중유닛 등장
		else if (min >= 1)
		{
			createPer = 1;
			let radMon = Math.floor(Math.random()*8);
			if (radMon<=2)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-3)+","+1+
				","+1+","+10+",'"+"http"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon<=5)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-3)+","+1+
				","+1+","+10+",'"+"css"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon==6)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-2)+","+1+
				","+1+","+20+",'"+"python"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else if (radMon==7)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+monsterY+","+(user.speed-2)+","+1+
				","+1+","+20+",'"+"javascript"+"',"+true+")")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
		}
		// 1분 미만
		else
		{
			let radMon = Math.floor(Math.random()*2)
			if (radMon==0)
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-3)+","+1+
				","+1+","+10+",'"+"http"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
			else
			{
				eval("monster"+monsterCnt+"= new Monster("+xArr+","+0+","+(user.speed-3)+","+1+
				","+1+","+10+",'"+"css"+"')")
				monsterArr[monsterCnt]=eval("monster"+monsterCnt);
				monsterCnt += 1;
			}
		}
	}
}
// 유저 객체 생성 / life, X, Y
const mhp =10;
const user= new User(mhp,  0 , 0);

// 맵 세팅 시 설정되는 것들.
function setting() {
	makeGround();
	user.draw("normal");
	button.visibility = 'visible';
}

// div 이벤트 추가
myDiv.addEventListener("keydown", moveUserKeyDown );
myDiv.addEventListener("keyup", moveUserKeyUp );

// 키 다운 변수 선언
let arrowLeft = false;
let arrowRight = false;
let arrowUp = false;
let arrowDown = false;
let toggleDown = false;
let modX;
let spaceDown = false;
let ballCnt = 0;
let ballArr = new Array();

// 키 다운 함수 호출
function moveUserKeyDown(e) {
	// 왼쪽 방향키
	if ( arrowRight==false && e.code== "ArrowLeft" )
	{
		arrowLeft = true;
		user.arrow="left";
		if (toggleDown == false)
		{
			user.draw("walk");
			toggleDown = true;
			modX = setInterval(function() { user.x-=user.speed;
				if ( user.x <= -3200 )
				{
					clearInterval(modX);
				} },16);
		}
	}
	// 오른쪽 방향키
	else if ( arrowLeft==false && e.code== "ArrowRight" )
	{
		arrowRight = true;
		user.arrow="right";
		if (toggleDown == false)
		{
			user.draw("walk");
			toggleDown = true;
			modX = setInterval(function() { user.x+=user.speed;
				if ( user.x >= 3200 )
				{
					clearInterval(modX);
				} },16);

		}
	}
	// 점프 (위 방향키)
	if( arrowUp==false && e.code=="ArrowUp" )
	{
		arrowUp = true;
		startY=user.y;
		user.jump(startY);
	}
	// 스페이스바
	if (spaceDown==false && e.code=="Space")
	{
		eval("Ball"+ballCnt+"= new Ball("+user.x+","+user.y+",'"+user.arrow+"');");
		ballArr[ballCnt] = eval("Ball"+ballCnt);
		ballCnt+=1;
		spaceDown=true;
		setTimeout(function(){
			spaceDown=false;
		},250);
	}
}
// 키 업 토글 제어 (중복 클릭 방지 기능)
function moveUserKeyUp(e) {

	if ( e.code== "ArrowLeft" )
	{
		arrowLeft = false;
		if (arrowRight==false)
		{
			toggleDown=false;
			user.draw("normal");
			clearInterval(modX);
		}

	}
	else if ( e.code== "ArrowRight" )
	{
		arrowRight = false;
		if (arrowLeft==false)
		{
			toggleDown=false;
			user.draw("normal");
			clearInterval(modX);
		}
	}


}
// 배경 움직임 함수
function moveCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(user.x <= 3200-640 && user.x >= -3200+640)
	{
		if (user.y >= 600)
		{
			ctx.drawImage(img, imgCenterX+user.x, imgCenterY-600, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
		}
		else
		{
			ctx.drawImage(img, imgCenterX+user.x, imgCenterY-user.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
		}

	}
	// 맵 경계선 제어
	else
	{
		if (user.x > 3200-640)
		{
			if (user.y >= 600)
			{
				ctx.drawImage(img, imgCenterX+3200-640, imgCenterY-600, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			}
			else
			{
				ctx.drawImage(img, imgCenterX+3200-640, imgCenterY-user.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			}
		}
		else if (user.x < -3200+640)
		{
			if (user.y >= 600)
			{
				ctx.drawImage(img, imgCenterX-3200+640, imgCenterY-600, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			}
			else
			{
				ctx.drawImage(img, imgCenterX-3200+640, imgCenterY-user.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			}
		}
	}

	
}

// 이미지 url 배열
const imgGroundArr = ["background/눈기둥(지형).png","background/사막기둥(지형).png","background/풀기둥(지형).png"];
// 지형 클래스
class Ground
{
	constructor(X,url)
	{
		this.x1=X;
		this.x2=X+400;
		this.y=275;
		this.url=url;
		
		// 이미지 객체 생성을 반복하면 로딩이 길어지며 깜빡임이 생긴다.
		// 가능한 이미지 객체 생성 및 할당을 반복함수 안에서 호출하면 안된다.
		this.groundImg = new Image();
		this.groundImg.src=this.url;
	}

	draw()
	{
		if(user.x <= 3200-640 && user.x >= -3200+640)
		{

			ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-user.x , canvas.height-126-(this.y-user.y));

		}
		else
		{
			if (user.x > 3200-640)
			{

				ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-3200+640, canvas.height-126-(this.y-user.y));
			}
			else if (user.x < -3200+640)
			{
				ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1+3200-640, canvas.height-126-(this.y-user.y));
			}
		}
	}
}
// 구름 객체 생성
class Cloud
{
	constructor(X)
	{
		this.x1=X;
		this.x2=X+360;
		this.y=550;
		this.url="background/구름(지형).png";
		
		// 이미지 객체 생성을 반복하면 로딩이 길어지며 깜빡임이 생긴다.
		// 가능한 이미지 객체 생성 및 할당을 반복함수 안에서 호출하면 안된다.
		this.groundImg = new Image();
		this.groundImg.src=this.url;
	}
	draw()
	{
		if(user.x <= 3200-640 && user.x >= -3200+640)
		{
			if (user.y >= 600)
			{
				ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-user.x , canvas.height-126-(this.y-600));
			}
			else
			{
				ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-user.x , canvas.height-126-(this.y-user.y));
			}
		}
		else
		{
			if (user.x > 3200-640)
			{
				if (user.y >= 600)
				{
					ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-3200+640 , canvas.height-126-(this.y-600));
				}
				else
				{
					ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1-3200+640, canvas.height-126-(this.y-user.y));
				}
			}
			else if (user.x < -3200+640)
			{
				if (user.y >= 600)
				{
					ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1+3200-640 , canvas.height-126-(this.y-600));
				}
				else
				{
					ctxGround.drawImage(this.groundImg, canvas.width/2+this.x1+3200-640, canvas.height-126-(this.y-user.y));
				}
			}
		}
	}
}


// 지형 랜덤생성 (랜덤 x 값 부여)
// 세팅 함수에 포함시킬것.
const canvasGround = document.getElementById("canvasGround");
const ctxGround = canvasGround.getContext("2d");
// 지형 클래스 객체 배열
let groundArr = [];
let cloudArr = [];
// 지형 클래스 객체 생성 및 최초 출력
function makeGround() {
	// 지형 몇 개 생성 // 4개로 지정
	let randCnt1 = 4;
	let xArr = [];
	
	while(true)
	{
		let t=true;
		for(let i=0; i<randCnt1; i++)
		{
			xArr[i] = Math.floor(Math.random()*(6400-800)-2600);
		}
		for(let i=0; i<xArr.length; i++)
		{
			for(let m=0; m<xArr.length-i; m++)
			{
				if (i == (xArr.length - m - 1))
				{
				}
				else if((xArr[i] - xArr[xArr.length-m-1]) < 400+410 && (xArr[i] - xArr[xArr.length-m-1]) > -400-410 )
				{
					t=false;
				}
				else
				{
				}
			}
		}
		if (t==true)
		{
			break;
		}
	}
	xArr.sort(function(a,b) {
		return a - b;
	});
	for ( let i = 0; i < xArr.length; i++ )
	{
		let cat;
		if (xArr[i]<-1450)
			cat = imgGroundArr[1];
		else if (xArr[i]<1250 && xArr[i]>=-1450)
			cat = imgGroundArr[2];
		else
			cat = imgGroundArr[0];
		eval("ground"+i+"= new Ground("+xArr[i]+",'"+cat+"')");
		groundArr[i] = eval("ground"+i);
	}

	// 구름 지형 만들기
	for (let i=0; i<groundArr.length-1;i++)
	{
		let key = Math.floor(Math.random()*2);
		if (key == 0)
		{
			eval("cloud"+i+"= new Cloud("+groundArr[i].x2+")");
		}
		else
		{
			let key2 = groundArr[i+1].x1-(groundArr[i+1].x2-groundArr[i+1].x1);
			eval("cloud"+i+"= new Cloud("+key2+")");
		}
		cloudArr[i] = eval("cloud"+i);
	}
}

// 지형 클래스 객체를 요소로 가지는 배열을 이용해 그려준다.
function moveGround(){
	ctxGround.clearRect(0,0,canvas.width,canvas.height);
	for (let i=0; i<groundArr.length;i++)
	{
		groundArr[i].draw();
	}
	for (let i=0; i<cloudArr.length;i++)
	{
		cloudArr[i].draw();
	}
}

// y값 고정 풀기 및 고정
function modY() {
	if (myGround[0]==undefined)
	{
	}
	else
	{
		// 2단에서 밖으로 나가면
		if (user.y == 275)
		{
			if (user.x < myGround[0] || user.x > myGround[1])
			{
				arrowUp=true;
				let t=0;
				function a()
				{
					user.y -= 1/2 * 50 * t**2;
					t+=0.02;
					if (user.y < 0)
					{
						user.y=0;
						arrowUp=false;
						clearInterval(que);
					}
				}
				let que = setInterval(a,16);
			}
		}
		// 3단에서 밖으로 나가면
		else if (user.y == 600)
		{
			if (user.x < myGround[0] || user.x > myGround[1])
			{
				arrowUp=true;
				let t=0;
				function a()
				{
					user.y -= 1/2 * 50 * t**2;
					t+=0.02;
					if (user.y < 0)
					{
						user.y=0;
						arrowUp=false;
						clearInterval(que)
					}
					else
					{
						// 지형물 객체 검수
						for (let i =0; i<groundArr.length; i++)
						{
							// x 좌표 필터
							if (user.x >= groundArr[i].x1 && user.x <= groundArr[i].x2 )
							{
								// y 좌표 필터. Interval 주기를 고려해서 오차값 범위 내
								if(280 >= Math.floor(user.y) && 260 <= Math.floor(user.y))
								{
									arrowUp = false;
									user.y = 275;
									myGround[0]=groundArr[i].x1;
									myGround[1]=groundArr[i].x2;
									clearInterval(que);
								}
							}
						}
					}
				}
				let que = setInterval(a,16);
			}
		}
	}
}

// 공 그려주기
function moveBall() {
	ctxBall.clearRect(0,0,canvas.width,canvas.height);
	for (let i = 0 ; i < ballArr.length; i++)
	{
		if (ballArr[i].speed==0)
		{

		}
		else
		{
			ballArr[i].draw();
		}
	}
}

// 몬스터 그려주기
function moveMonster() {
	ctxMonster.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < monsterArr.length; i++)
	{
		if (monsterArr[i].life <= 0)
		{
		}
		else
		{
			monsterArr[i].draw(monsterArr[i]);
		}
	}
}

function chechAttackMonster() {
	for (let i = 0; i < monsterArr.length; i++)
	{
		for (let m = 0; m < ballArr.length; m++)
		{

			if ( ballArr[m].x - monsterArr[i].x <= 30 && ballArr[m].x - monsterArr[i].x >= -30)
			{
				if ( ballArr[m].y - monsterArr[i].y < monsterArr[i].images.height/2 && ballArr[m].y - monsterArr[i].y > -monsterArr[i].images.height/2  )
				{
					ballArr[m].speed = 0;
					ballArr[m].x = undefined;
					ballArr[m].y = undefined;
					monsterArr[i].life -= user.damage;
					if (monsterArr[i].life <= 0)
					{
						monsterArr[i].x = undefined;
						monsterArr[i].y = undefined;
					}
					user.score += monsterArr[i].score;
				}
			}


		}
	}
}

function chechUserMonster() {
	for (let i = 0; i < monsterArr.length; i++)
	{


		if ( user.x - monsterArr[i].x <= 30 && user.x - monsterArr[i].x >= -30)
		{
			if ( user.y - monsterArr[i].y < 60 && user.y - monsterArr[i].y > -60  )
			{
				user.life -= monsterArr[i].atc;
				monsterArr[i].life = 0;
				monsterArr[i].x = undefined;
				monsterArr[i].y = undefined;

			}
		}
	}
}

// 동휘님 코드

let totalTime = 0;


const pythonHelloWorld = "print('hello world')";
const javascriptHelloWorld = "console.log('hello world')";

// console.log(헬로월드) 확인 함수
function checkInput (e) {
	const value = e.target.value;
	const keyCode = e.keyCode;
	if(keyCode === 13){
		if(value === pythonHelloWorld || value === javascriptHelloWorld){
			moveToGameScreen();
		}else{
			alert("잘못된 입력입니다. \n 1. console.log('hello world') \n 2. print('hello world') \n 중 하나를 입력해주세요!");
			input.value = '';
		}
	}
}

defaultText = ' < GAME START > '.repeat(20); 
textList = [];

for(let i = 0; i < 50; i++){
	const rand = Math.random() * defaultText.length;
	const modifiedText = defaultText.slice(rand, defaultText.length) + defaultText.slice(0, rand);
	textList.push(modifiedText);
}

// 배경 화면 보여주는 함수
function drawInitialScreenText() {

	ctx.beginPath();
	ctx.fillRect(0, 0,1280, 720);
	ctx.fillstyle = "black";
	ctx.fill();

	ctx.font = 'bold 36px Arial';

	for(let i = 0; i < textList.length; i++){
		//i가 textlist의 길이인 13보다 작다면?
		ctx.save();
		ctx.translate(100 * i, 0);
		ctx.rotate((Math.PI / 180) * 90);
		ctx.fillStyle = "green";
		ctx.fillText(textList[i], 0, 0);
		ctx.restore();
	}
}

// textList에 있는 모든 텍스트 각각 회전시키는 함수
function rotateInitailScreenText() {
	for(let i = 0; i < textList.length; i++){
		const currentText = textList[i];
		const rotatedText = currentText.slice(-1,currentText.length) + currentText.slice(0, -1);
		textList[i] = rotatedText;
	}
}

// 현재 살아남은 시간을 텍스트로 그리기 위한 함수
// 현재 16ms 마다 draw() 함수가 실행되므로, 함수 호출시마다 16ms씩 더함.
// 현재 구름이 타임텍스트 위로 올라오는 이슈 있음. 구름 그리는 함수가 타임텍스트 그리는 함수 다음으로 실행되야함.

const canvasTimeScore = document.getElementById('canvasTimeScore');
const ctxTimeScore = canvasTimeScore.getContext('2d'); 
// ctxTimeScore.fillStyle = "blueviolet";

let timeText;
let min;
let sec;

function drawTimeText() { 

	ctxTimeScore.clearRect(0, 0, canvasTimeScore.width, canvasTimeScore.height);

	totalTime += 16;

	min = Math.floor(totalTime / (1000*60))
	sec = Math.floor((totalTime / (1000))%60)

	ctxTimeScore.fillStyle = 'black';
	timeText =  min + ':' + sec;
	ctxTimeScore.font = '40px Impact';
	ctxTimeScore.fillText(timeText, 600, 50);
	ctxTimeScore.fill();
}

function hpbar()
{

   ctxTimeScore.fillStyle = 'red';	
   ctxTimeScore.fillRect(1010,17, 245*(user.life/mhp), 20);
   ctxTimeScore.fill();
}

// 현재 스코어를 텍스트로 그리기 위한 함수
let scoreText = '점수: ' + user.score;
function drawScoreText() {

	ctxTimeScore.fillStyle = 'blue';
	scoreText = 'score : ' + user.score;
	ctxTimeScore.font = '20px Impact';
	ctxTimeScore.fill();
	ctxTimeScore.fillText(scoreText, 950, 65);

	ctxTimeScore.fillStyle = 'red';
	lifeText = 'LIFE : '
	ctxTimeScore.fillText(lifeText, 950, 35);
	ctxTimeScore.fill();
}


input.addEventListener('keypress', checkInput);

// 인트로화면 인터벌
let interval = setInterval(function (){
	drawInitialScreenText();
	rotateInitailScreenText();
}, 150);

// 게임 스크린으로 이동
function moveToGameScreen(){
	// (이미지객체, 이미지객체 내 x 좌표, 이미지객체 내 y좌표, 표현되는 너비, 표현되는 높이, 캔버스 x좌표, 캔버스 y좌표)
	imgCenterX =  img.width/2 - canvas.width/2;	
	imgCenterY = img.height/2;
	ctx.drawImage(img, imgCenterX, imgCenterY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	setting();

	input.style.display='none'; // 입력 input 제거
	startImg.style.display= 'none'; // 시작 이미지 제거
	button.style.display='block'; // 버튼 표시

	myDiv.focus(); // 게임에 바로 포커스가 가도록

	clearInterval(interval); // 시작화면 interval 제거

	interval = setInterval(draw, 16); // 게임 화면 interval 시작
}

let isGameOver = false;


// 개임 중지/재개
// 현재 점프 중 중지 시 오류
function pauseAndResume() {
	if(interval){
		arrowLeft = true;
		arrowRight = true;
		arrowUp = true;
		arrowDown = true;
		toggleDown = true;
		clearInterval(interval);
		clearInterval(modX);
		clearInterval(que);
		interval = null;
		modX = null;
		que = null;
		screenBlur.style.display = 'block';
		button.innerText = '▶';
		myDiv.removeEventListener("keydown", moveUserKeyDown );
		myDiv.removeEventListener("keyup", moveUserKeyUp );
	}else{
		arrowLeft = false;
		arrowRight = false;
		arrowUp = false;
		arrowDown = false;
		toggleDown = false;
		interval = setInterval(draw, 16);
		myDiv.focus();
		myDiv.addEventListener("keydown", moveUserKeyDown );
		myDiv.addEventListener("keyup", moveUserKeyUp );
		button.innerText = '❚❚';
		screenBlur.style.display = 'none';
	}
}

button.addEventListener('click', pauseAndResume);

// 종합인터벌종합종합인터벌종합종합인터벌종합종합인터벌종합종합인터벌종합

// 게임종료 시점
function isItGameOver() {
	let overDiv = document.getElementById("gameOver");
	let aliveTime = document.getElementById("aliveTime");
	let myScore = document.getElementById("myScore");
	let overBtn = document.getElementById("buttonEvent");
	let myBestScore = document.getElementById("myBestScore");
	let worldBestScore = document.getElementById("worldBestScore")

	overBtn.addEventListener('click', Ending_Credit);
	overBtn.innerText = "종료"

	if (user.life <= 0)
	{
		arrowLeft = true;
		arrowRight = true;
		arrowUp = true;
		arrowDown = true;
		toggleDown = true;
		clearInterval(interval);
		clearInterval(modX);
		clearInterval(que);
		interval = null;
		modX = null;
		que = null;
		button.innerText = '재개';
		myDiv.removeEventListener("keydown", moveUserKeyDown );
		myDiv.removeEventListener("keyup", moveUserKeyUp );

		let userName = getStorage("playing");
		let userScore = getStorage(userName);
		// 사용자의 최고점수 갱신
		if (userScore < user.score)
		{
			userScore = user.score;
			setStorage(userName, userScore);
		}
		// 세계기록. 사용자의 최고점수 갱신 이후 시점에서 추출
		const worldRecord = bestScore();

		overDiv.style.display = "block";
		aliveTime.innerText = "생존시간   "+min+"분 "+sec+"초 ";
		myScore.innerText = "스코어   "+user.score+" 점";
		myBestScore.innerText = "나의 최고 점수 "+userScore+" 점";
		worldBestScore.innerText = "세계 기록 "+worldRecord+" 점";
	}
}
function Ending_Credit() {
	if(user.score>=1500) {
		window.location.href = 'ending.html';
	}
	else
	{
		window.location.reload();
	}
};


// 전체 인터벌
function draw() {
	moveCanvas();
	moveGround();
	modY();
	moveBall();
	createMonster();
	moveMonster();
	chechAttackMonster();
	chechUserMonster();
	drawTimeText();
	drawScoreText();
	isItGameOver();
	hpbar();
}

