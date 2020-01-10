import { Injectable } from "@angular/core";

export const MIME_TYPE_FOLDER = "application/vnd.google-apps.folder";
export const MIME_TYPE_FILE = "application/vnd.google-apps.file";

@Injectable({
    providedIn: "root"
})
export class FileService {

    list({ id = 'root', q = "" } = {}) {
        return new Promise((resove, reject) => {
            gapi.client.drive.files.list({
                pageSize: 1000,
                fields: "nextPageToken, files(id, name,iconLink, size, mimeType, parents, modifiedByMeTime)",
                q: q,
                spaces: "drive",
                orderBy: 'createdTime desc'
            }).then(resove, reject);
        })
    }
    file(id): Promise<gapi.client.Response<gapi.client.drive.File>> {

        return new Promise((resolve, reject) => {

            gapi.client.drive.files.get({
                fileId: id,
                alt: 'media',
                fields: "body, id, name, size, mimeType, modifiedByMeTime"
            }).then(resolve, reject);
        })
    }
    delete(id: string): Promise<gapi.client.Response<void>> {
        return new Promise((resolve, reject) => {
            gapi.client.drive.files.delete({
                fileId: id
            }).then(resolve, reject);
        })
    }
    createFolder(resource: { name: string, mimeType: string, parents?: string[] } = { name: "New Folder", mimeType: MIME_TYPE_FOLDER, parents: [] }) {
        return new Promise((resolve, reject) => {
            gapi.client.drive.files.create({ resource }).then(resolve, reject)
        })
    }


    createFile({ name, data }) {

        const boundary = "-------314159265358979323846";
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        const contentType = "application/json";
        var metadata = {
            name: name,
            mimeType: contentType
        };

        var multipartRequestBody =
            delimiter +
            "Content-Type: application/json \r\n\r\n" +
            JSON.stringify(metadata) +
            delimiter +
            "Content-Type: application/json \r\n\r\n" +
            data +
            // JSON.stringify(data, null, 2) +
            close_delim;

        return new Promise((resolve, reject) => {
            gapi.client.request({
                path: "/upload/drive/v3/files",
                method: "POST",
                params: { uploadType: "multipart" },
                headers: {
                    "Content-Type": 'multipart/related; boundary="' + boundary + '"'
                },
                body: multipartRequestBody
            }).then(resolve, reject);

        })
    }

    updateFile({ id, name = "new file", data = "" }) {
        const boundary = "-------314159265358979323846";
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        const contentType = "application/json";

        var metadata = {
            name: name,
            mimeType: contentType
        };

        var multipartRequestBody =
            delimiter +
            "Content-Type: application/json \r\n\r\n" +
            JSON.stringify(metadata) +
            delimiter +
            "Content-Type: application/json \r\n\r\n" +
            // data +
            JSON.stringify(data, null, 2) +
            close_delim;

        return new Promise((resolve, reject) => {
            gapi.client.request({
                path: "/upload/drive/v3/files/" + id,
                method: "PATCH",
                params: { uploadType: "multipart", alt: "json" },
                headers: {
                    "Content-Type": 'multipart/related; boundary="' + boundary + '"'
                },
                body: multipartRequestBody
            }).then(resolve, reject);
        })
    }
}