
function Log( target: Object, method: string, des:PropertyDescriptor){
    let originMethod = des.value;
    des.value = (...args)=>{
        let res = originMethod.apply(this, args);
        console.log(`${JSON.stringify(args)} => ${res}`)
        return res;
    }
}



/*
 return
 1: date2 > date1 to > day  
 0: date2 === date1  today
 -1: date2 < date1  to < day
 */
@Log()
export function compareDay(date: Date, from?: Date, to?: Date): number {

    let _date = date.valueOf();
    let _from = undefined;
    let result;
    if (!!from) {
        _from = new Date(from.getFullYear(), from.getMonth(), from.getDate()).valueOf();
    }
    let _to = undefined;
    if (!!to) {
        _to = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1).valueOf() - 1;
    }


    if (_from && _date < _from) result = -1;
    else if (_to && _date > _to) result = 1;
    else result = 0;

    console.log("compare Day result: ", result);
    return result
}