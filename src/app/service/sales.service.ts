import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';



export interface IUser {
    id?: string
    name: string;
    age: number;
    nikname?: string;
}






@Injectable({ providedIn: "root" })
export class SalesService {
    static url = "https://quickstart-1564505516527.firebaseio.com/users"
    static url2 = "https://test-with-auth.firebaseio.com/test"
    constructor(private http: HttpClient) { }
    create(user: IUser) {
        return this.http.post<any>(`${SalesService.url}/${user.name}.json`, user)
    }
    get(): Observable<any> {
        return this.http.get<IUser>(`${SalesService.url}.json`)
            .pipe(
                // tap(console.log.bind(this)),
                map((body) =>
                    Object.keys(body).map((key): IUser => {
                        let obj = body[key];
                        return {
                            id: Object.keys(obj)[0],
                            name: key,
                            ...obj[Object.keys(obj)[0]],
                        }
                    })
                ),
                catchError(err => {
                    console.log("error", err);
                    return of([]);
                })
            )
    }
    delete(user: IUser) {
        return this.http.delete(`${SalesService.url}/${user.name}/${user.id}.json`)
    }

    edit(user: IUser) {
        return this.http.put(`${SalesService.url}/${user.name}/${user.id}.json`, {
            nikname: user.nikname
        })
    }
    update(user: IUser) {
        // return this.http.patch(`${SalesService.url}/${user.name}/${user.id}.json`, {
        //     nikname: user.nikname
        // })
        let key = `${user.name}/${user.id}`;

        return this.http.patch(`${SalesService.url}.json`, {
            "bben/-LzXDHVCnK_rV-WIggXN": user.nikname
        })
    }
}