
const Lbt_0 =document.getElementById("Lbutton");
let expire = new Date();
let userScore;
let userName;
Lbt_0.addEventListener('click',loginR);

function loginR()
{
	Lid_N1 = document.getElementById("name").value;
	userScore = getStorage(Lid_N1);
	// 1. 이름 입력 X
	if (Lid_N1 == "")
	{
		userScore = 0;
		userName = "짹짹이";
	}
	// 2. 등록된적 없는 이름
	else if( userScore == null)
	{
		userScore = 0;
		userName = Lid_N1;
	}
	// 3. 플레이 기록이 있는 이름
	else
	{
		userName = Lid_N1;
	}
	setStorage(userName,userScore);
	myNameIs(userName);
	alert(userName+"님 환영합니다.\n"+userName+"님의 최고 기록은 "+userScore+"점 입니다.\n세계최고기록은 "+bestScore()+"점 입니다.")
}
