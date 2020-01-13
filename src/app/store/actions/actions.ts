import { Injectable } from '@angular/core';
import { Subject, MonoTypeOperatorFunction} from 'rxjs';
import { filter } from 'rxjs/operators';
export interface Action {
    type: string;
    payload?: any;
}

export function ofType<T extends Action>(type): MonoTypeOperatorFunction<T> {
    return filter(_ => type === _.type);
}
@Injectable({ providedIn: "root" })
export class Actions{
    private _actions$:Subject<Action> = new Subject()
    get actions$(){
        return this._actions$;
    }
    constructor(){
        console.log("create Actions");
        
    }
}
