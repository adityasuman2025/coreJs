
function getPdfPagesCount(pdfUrl) { // pdfUrl: pdf url or imported local pdf
    async function getFileFromUrl(url, name, defaultType = 'image/png') {
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], name, { type: data.type || defaultType });
    }

    return new Promise(async function (resolve, reject) {
        try {
            const file = await getFileFromUrl(pdfUrl, 'pdfUrl.pdf', 'application/pdf');

            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = function () {
                const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                resolve(count);
            }
            reader.onerror = reject;
        } catch (e) {
            reject(e);
        }
    });
}
