import { ref, listAll, getDownloadURL } from "firebase/storage";
import firebaseStorage from "./firebaseConfig";
import { snakeCase } from "./utils";

async function getFirebaseFiles(listRef: any): Promise<{ [key: string]: any }[]> {
    if (!listRef) return [];

    const items: { [key: string]: any }[] = [];

    try {
        const resRef = await listAll(listRef);

        for (let i = 0; i < resRef?.prefixes?.length; i++) {
            const thisFolderRef = resRef?.prefixes[i];
            const itemsInThisFolder = await getFirebaseFiles(thisFolderRef) || [];
            items.push(...itemsInThisFolder);
        }

        for (let i = 0; i < resRef?.items?.length; i++) {
            const thisItemRef = resRef?.items[i];

            /*-------- converting the file name to snakecase with route parent attached ----------*/
            // @ts-ignore
            const fileNamePath = thisItemRef?._location?.path_;
            const fileNamePathArr = fileNamePath?.split("/") || [];
            const orgFileName = fileNamePathArr.pop();
            const orgFileNameArr = orgFileName?.split(".");
            orgFileNameArr?.pop(); // file extension removed
            const fileNameWithoutExt = orgFileNameArr?.join("");
            const snakeCasedFileName = snakeCase(fileNameWithoutExt);
            /*-------- converting the file name to snakecase with route parent attached ----------*/

            const path = fileNamePathArr.reduce((acc: string, item: string) => acc + item.toLowerCase() + "/", "") + snakeCasedFileName
            const fileUrl = await getDownloadURL(thisItemRef);

            if (path && fileUrl) items.push({ path, fileUrl });
        }
    } catch (e) { console.log(e) }

    return items;
}