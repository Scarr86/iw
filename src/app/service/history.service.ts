import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment'
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class HistoryService implements OnInit {
    // private _dates: BehaviorSubject<moment.Moment[]> = new BehaviorSubject([]);
    private _start: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
    private _end: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    set end(d: moment.Moment) {
        this._end.next(d);
    }
    get end() {
        return this._end.getValue();
    }
    set start(d: moment.Moment) {
        this._start.next(d);
    }
    get start() {
        return this._start.getValue();
    }
    // get dates() {
    //     return this._dates.asObservable();
    // }
    ngOnInit() {


        //this.crateDates(this._start, this._end);
    }
    days(): Observable<moment.Moment[]> {
        return this.dates("days")
        //.pipe(map(days => days.map(d => d.format("DD-MM-YYYY"))));
    }


    private dates(granilarity: moment.unitOfTime.DurationConstructor): Observable<moment.Moment[]> {
        return combineLatest(this._start, this._end)
            .pipe(
                map(([start, end]) => {
                    // console.log(start.format(), end);
                    
                    if (!start || !end) return [];
                    if (start.isAfter(end)) return [];

                    let day = start.clone();
                    let dates: moment.Moment[] = [];
                    while (day.isSameOrBefore(end, granilarity)) {
                        dates.push(day.clone());
                        day.add(1, granilarity);
                    }
                    return dates
                }));
    }

}