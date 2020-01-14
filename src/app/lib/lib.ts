   /*
    return
    1: date2 > date1 to > day  
    0: date2 === date1  today
    -1: date2 < date1  to < day
    */
   export function compareDay(date: Date, {from = date, to = from }:{from?:Date, to?:Date}): number {
    let _date = date.valueOf();
    let _from = new Date(from.getFullYear(), from.getMonth(), from.getDate()).valueOf();
    let _to = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1).valueOf() - 1;

    if(_date < _from)  return  -1;
    else if (_date > _to ) return 1;
    else return 0
}