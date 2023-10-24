const url = "https://bep-public.s3.ap-south-1.amazonaws.com/city.json";
const data = downloadDocumentFile(url).then(resp => {
    console.log("resp", resp)
});

async function downloadDocumentFile(url) {
    // using async/await
    // try {
    //     const resp = await fetch(url);

    //     const blobText = await resp.text();

    //     // const blob = await resp.blob();
    //     // const blobText = await new Response(blob).text();

    //     const jsonResp = JSON.parse(blobText);
    //     return jsonResp;
    // } catch (e) {
    //     throw Error("failed to download file")
    // }

    // using then/catch
    return fetch(url)
        .then(resp => {
            return resp.text();
        })
        .then(text => {
            return JSON.parse(text);
        }).catch(e => {
            throw Error("failed to download file")
        })
}