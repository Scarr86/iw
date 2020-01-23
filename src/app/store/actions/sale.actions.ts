import { File } from '../../models/file.model'
import { Sale } from 'src/app/models/sale.model';
export class GetSales {
    static readonly type = '[Sale] Get sales';
}

export class SetBaseInfo {
    static readonly type = '[Sale] Set Base Info';
    constructor(public baseInfo: File) { }
}

export class DeleteBaseInfo {
    static readonly type = '[Sale] Delete Base Info';
}

export class DeleteSale {
    static readonly type = '[Sale] Delete Sale';
    constructor(public id: number) { }
}

export class AddSale {
    static readonly type = '[Sale] Delete Sale';
    constructor(public sale: Sale) { }
}

export class ChangeSale {
    static readonly type = '[Sale] Change Sale';
    constructor(public id: number, public sale: Sale) { }
}