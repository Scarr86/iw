export interface File {
    id?: string,
    name?: string,
    iconLink?:string,
    size?:string,
    modifiedTime?:string,
    createdTime?:string,
    body?:string,
}
//files(id, name,iconLink, size, mimeType, parents, modifiedTime)