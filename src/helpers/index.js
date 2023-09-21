export const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {};
    }
};


export const UTCtoLocalTime = (utcTimeString, timeZoneOffset) => {
    const utcDate = new Date(utcTimeString);
    const localDate = new Date(utcDate.getTime() + timeZoneOffset * 3600000);

    const day = localDate.getDate().toString().padStart(2, '0');
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    return `${day}-${month} <br> ${hours}:${minutes}`;
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



// export const createPostUrl = (postTitle) => {
//     const sanitizedTitle = postTitle.replace(/[ -]/g, '-').replace(/:/g, '');

//     return `/post/${sanitizedTitle.toLowerCase()}`;
// }