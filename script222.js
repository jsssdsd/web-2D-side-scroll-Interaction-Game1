
var tp1, ti1, tp21, tp22, ti2, tp3, ti3, tp41, tp42, ti4, tp5, ti5, tri1, tri2;

tri1=document.getElementById("tri1")
tri2=document.getElementById("tri2")

tp1=document.getElementById("tuto_pic1")
ti1=document.getElementById("tuto_info1")

tp21=document.getElementById("tuto_pic21")
tp22=document.getElementById("tuto_pic22")
ti2=document.getElementById("tuto_info2")

tp3=document.getElementById("tuto_pic3")
ti3=document.getElementById("tuto_info3")

tp41=document.getElementById("tuto_pic41")
tp42=document.getElementById("tuto_pic42")
ti4=document.getElementById("tuto_info4")

tp5=document.getElementById("tuto_pic5")
ti5=document.getElementById("tuto_info5")

let c=0
function BeforePage()
 {
	c=c-1
	if (c==3) {
		tp5.style.display="none";
		ti5.style.display="none";
		tp41.style.display="block";
		tp42.style.display="block";
		ti4.style.display="block";
	}
	else if (c==2) {
		tp41.style.display="none";
		tp42.style.display="none";
		ti4.style.display="none";
		tp3.style.display="block";
		ti3.style.display="block";
	}
	else if (c==1) {
		tp3.style.display="none";
		ti3.style.display="none";
		tp21.style.display="block";
		tp22.style.display="block";
		ti2.style.display="block";
	}
	else if (c==0) {
		tp21.style.display="none";
		tp22.style.display="none";
		ti2.style.display="none";
		tp1.style.display="block";
		ti1.style.display="block";
	}
    
 }
 function NextPage()
 {
	c=c+1
	if (c==1) {
		tp1.style.display="none";
		ti1.style.display="none";
		tp21.style.display="block";
		tp22.style.display="block";
		ti2.style.display="block";
	}
	else if (c==2) {
		tp21.style.display="none";
		tp22.style.display="none";
		ti2.style.display="none";
		tp3.style.display="block";
		ti3.style.display="block";
	}
	else if (c==3) {
		tp3.style.display="none";
		ti3.style.display="none";
		tp41.style.display="block";
		tp42.style.display="block";
		ti4.style.display="block";
	}
	else if (c==4) {
		tp41.style.display="none";
		tp42.style.display="none";
		ti4.style.display="none";
		tp5.style.display="block";
		ti5.style.display="block";
	}
	else if (c==5) {
		location.href='game_userMove.html'
	}
 }
