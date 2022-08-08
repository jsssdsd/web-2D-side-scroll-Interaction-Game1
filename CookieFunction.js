function GetCookie(name) {
    let pairs = document.cookie.split(";");
    console.log(pairs)
    for (let i = 0; i<pairs.length; i++)
    {
        let pair = pairs[i].trim();
        let unit = pair.split("=");
        if (unit[0] == name)
            return unit[1]
    }
}

function SetCookie(name, value, expireDate) {
    let cookieStr = name + "=" + value +
    ((expireDate == null)?"" : ("; expires="+expireDate.toUTCString()));
    document.cookie = cookieStr;
}

