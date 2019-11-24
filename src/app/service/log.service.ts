import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })//если нужно один сервис на всех
export class LogService {

   consoleStyles = {
      'primary': 'font: 1.em Arial; color:green',
      'accent': 'font: 1.em Arial; color:blue',
      'warn': 'font: 1.em Arial; color:tomato',
   };
   constructor(){}


   write(logMsg: any, styleMsg: string = 'primary') {
      console.log('%c' + JSON.stringify(logMsg), this.consoleStyles[styleMsg]);
   }

}