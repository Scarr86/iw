import { Injectable, Optional } from '@angular/core';
import { Observable, of, Subject, MonoTypeOperatorFunction, merge, timer, throwError } from 'rxjs';
import { startWith, publishReplay, refCount, delay, tap, finalize, share, shareReplay, scan, filter, switchMap, map, switchMapTo, catchError } from 'rxjs/operators';
import { LogService } from './log.service';


interface ItemsState {
   items: number[];
   error: any,
   loading: boolean;
}

interface Action {
   type: string;
   payload?: any;
}

const defaultState: ItemsState = {
   items: [],
   error: null,
   loading: false
}



function ofType<T extends Action>(type: string): MonoTypeOperatorFunction<T> {
   return filter((action) => type === action.type)
}

function loadWithError() {
   return timer(1000).pipe(
      switchMapTo(throwError('Something wrong!'))
   );
}


function load(): Observable<number[]> {

   return of([1, 2, 3]).pipe(
      delay(1000)
   );
}

@Injectable({ providedIn: "root" })
export class DownloadManager {

   actions$: Subject<Action> = new Subject<Action>();
   state$: Observable<ItemsState>
   load$: Observable<Action>;
   dispatcher$: Observable<Action>;

   constructor(private log: LogService) {
      // log.write("dm constructor");

      this.load$ = this.actions$
         .pipe(
            finalize(() => log.write("load$ fin", "accent")),
            ofType('load'),
            tap(_ => log.write("download", 'accent')),
            // switchMap(() => this.load()),
            switchMap(() => load() /*loadWithError()*/.pipe(
               map((d): Action => ({
                  type: 'load success',
                  payload: d
               })),
               catchError((error) => of<Action>({
                  type: 'load failed',
                  payload: error
               }))
            )),
         );

      this.dispatcher$ = merge(this.actions$, this.load$);

      //this.load$.subscribe( a => log.write(a, "warn"));

      // this.dispatcher$.subscribe(r => log.write(r, 'accent'));

      // this.actions$.subscribe(a => log.write("actions$"), null, ()=>log.write("actions$ fin"));
   

      this.state$ = this.dispatcher$
         .pipe(
            startWith(this.start(defaultState)),
            scan(this.stateReducer.bind(this)),
            // tap(_ => this.log.write("get", "accent")),
            finalize(() => this.log.write("state$ fin", "accent")),
            // delay(1000),
            publishReplay<ItemsState>(1),
            refCount(),
         );

         
   }
   getState() {
      return this.state$
   }

   start(def:ItemsState){
      // this.log.write("state$ startWith", 'accent');
      return def;
   }

   stateReducer(state: ItemsState, action: Action): ItemsState {
      // this.log.write(action);
      switch (action.type) {
         case 'load':
            return {
               ...state,
               error: null,
               loading: true
            };
         case 'load success':
            return {
               items: action.payload,
               error: null,
               loading: false
            };
         case 'load failed': {
            return {
               ...state,
               error: action.payload,
               loading: false
            }
         }
         default:
            return state;
      }
   }


}
