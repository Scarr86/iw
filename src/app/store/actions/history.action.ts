
export type Param = "dialogPeriod"| "selectPeriod" ;
export class SetHistory {
    static readonly type = '[History] Action]';
    constructor(public param:Param , public value:any){}
}
