export const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {};
    }
};

export const formatNumber = (number) => {
    return typeof number === 'number' ? number.toFixed(2) : parseFloat(number).toFixed(2)
}

export const UTCtoLocalTime = (utcTimeString, timeZoneOffset) => {
    const utcDate = new Date(utcTimeString);
    // const localDate = new Date(utcDate.getTime() + timeZoneOffset * 3600000);
    const localDate = new Date(utcDate.getTime() + 7 * 3600000);

    const day = localDate.getDate().toString().padStart(2, '0');
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    return `${day}-${month} ${hours}:${minutes}`;
};

export const convertTime = (time) => {
    const timestamp = time * 1000;
    const dt_object = new Date(timestamp);

    // Thêm 7 giờ vào thời gian
    dt_object.setHours(dt_object.getHours() - 1);

    const year = dt_object.getFullYear();
    const month = (dt_object.getMonth() + 1).toString().padStart(2, '0');
    const day = dt_object.getDate().toString().padStart(2, '0');
    const hours = dt_object.getHours().toString().padStart(2, '0');
    const minutes = dt_object.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${day}-${month} ${hours}:${minutes}`;
    return formattedTime;
};

export const convertTimeSelectOddRun = (time) => {
    const timestamp = time * 1000;
    const dt_object = new Date(timestamp);

    // Thêm 7 giờ vào thời gian
    dt_object.setHours(dt_object.getHours() - 1);
    const hours = dt_object.getHours().toString().padStart(2, '0');
    const formattedTime = hours;
    return formattedTime;
};


export const createHtmlExcerpt = (htmlContent, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    let excerpt = doc.body.textContent || "";

    if (excerpt.length > maxLength) {
        excerpt = excerpt.slice(0, maxLength) + "...";
    }

    return excerpt;
};


export const createPostUrl = (postTitle) => {
    const match = postTitle.match(/(.*?)\s*-/);

    if (match) {
        const sanitizedTitle = match[1].trim();
        return `/post/${sanitizedTitle.toLowerCase().replace(/ /g, '-')}`;
    } else {
        return `/post/${postTitle.toLowerCase().replace(/ /g, '-')}`;
    }
}

export const base64ToFile = (base64URL, fileName, fileType) => {
    const byteCharacters = atob(base64URL.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    return file;
}

export const startMatchTimer = (STATE, TIME, elementID) => {
    if (STATE === undefined || TIME === undefined) {
        // Nếu thiếu STATE hoặc TIME, không thực hiện gì cả.
        return;
    }

    var currentTimeUTC = new Date();
    const offsetHours = -7;
    currentTimeUTC.setHours(currentTimeUTC.getHours() + offsetHours);
    var _serverTime = `${currentTimeUTC.getFullYear()},${currentTimeUTC.getMonth()},${currentTimeUTC.getDate()},${currentTimeUTC.getHours()},${currentTimeUTC.getMinutes()},${currentTimeUTC.getSeconds()}`;

    var difftime;
    if (_serverTime) {
        var sps = _serverTime.split(",");
        difftime = new Date() - new Date(sps[0], sps[1], sps[2], sps[3], sps[4], sps[5]);
    }

    let ms = "";
    let goTime = "";
    const timeIcon = "<span class='in-gif'></span>";

    // switch (STATE) {
    //     case 5: ms = 'Pen.'; break; // Đá penalty
    //     case 4: ms = 'ET'; break; // Thời gian bù giờ
    //     case 3: ms = '2nd Half'; break; // Hiệp 2
    //     case 2: ms = 'HT'; break; // Giữa hiệp
    //     case 1: ms = '1st Half'; break; // Hiệp 1
    //     default: ms = 'Unknown'; // Xử lý trạng thái không khớp
    // }

    if (STATE === '1') {
        const currentTime = new Date();
        const elapsedTime = currentTime - new Date(TIME) - difftime;
        goTime = Math.floor(elapsedTime / 60000);
        if (goTime < 1) {
            goTime = "1";
        } else if (goTime > 45) {
            goTime = "45+";
        }

        ms += "1st Half - " + goTime + timeIcon;
    } else if (STATE === '3') {
        const currentTime = new Date();
        const elapsedTime = (currentTime) - new Date((TIME)) - difftime;
        goTime = Math.floor(elapsedTime / 60000) + 46;

        if (goTime < 46) {
            goTime = "46";
        } else if (goTime > 90) {
            goTime = "90+";
        }

        ms += "2nd Half - " + goTime + timeIcon;
    } else if (STATE === '2') {
        ms += "HT";
    } else if (STATE === '4') {
        ms += "ET";
    } else if (STATE === '5') {
        ms += "Pen";
    }

    const matchTimeElement = document.getElementById(elementID);
    if (matchTimeElement) {
        matchTimeElement.innerHTML = ms;
    }
    setTimeout(startMatchTimer, 30 * 1000);

}

// export const createPostUrl = (postTitle) => {
//     const sanitizedTitle = postTitle.replace(/[ -]/g, '-').replace(/:/g, '');

//     return `/post/${sanitizedTitle.toLowerCase()}`;
// }