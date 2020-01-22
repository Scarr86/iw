import{File} from '../../models/file.model'
export class GetSales{
    static readonly type ='[Sale] Get sales';
}

export class SetBaseInfo{
    static readonly type ='[Sale] Set Base Info';
    constructor(public baseInfo: File){}
}

export class DeleteBaseInfo{
    static readonly type ='[Sale] Delete Base Info';
}