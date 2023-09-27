const url = "https://bep-public.s3.ap-south-1.amazonaws.com/city.json";
const data = downloadDocumentFile(url).then(resp => {
    console.log("resp", resp)
});

function downloadDocumentFile(url) {
    return fetch(url)
        .then(async resp => {
            // const text = await resp.text()
            // console.log("text", text)

            const blob = await resp.blob();
            const blobText = await new Response(blob).text();

            if (resp.status < 200 || resp.status > 299) {
                const err = await resp.json();
                throw err;
            }

            const jsonResp = JSON.parse(blobText);
            return jsonResp;
        });
}