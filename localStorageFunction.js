// 데이터 저장
function setStorage(name, score) {
    localStorage.setItem(name, score);
}
// 데이터 추출
function getStorage(name) {
    return localStorage.getItem(name);
}
// 데이터 삭제
function removeStorage(name) {
    localStorage.removeItem(name);
}
// 데이터 전체 삭제
function removeAllStorage() {
    localStorage.clear();
}
// 최고점수 검사
function bestScore() {
    let best = 0;
    let length;
    length = localStorage.length
    for (let i = 0; i < length; i++)
    {
        console.log(localStorage[localStorage.key(i)])
        if (localStorage.key(i) == "playing")
        {
        }
        else
        {
            if (best < localStorage[localStorage.key(i)])
            {
                best = localStorage[localStorage.key(i)];
            }
        }
    }
    return best
}
// 사용중인 플레이어 저장
function myNameIs(name) {
    localStorage.setItem('playing', name);
}