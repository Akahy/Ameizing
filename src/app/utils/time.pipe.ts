import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform the hours time into hours minutes time
 * Usage:
 *   value | time
 * Example:
 *   {{ 2.5 | time }}
 *   formats to: 2h 30min
*/
@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
      let minutes = Math.floor((value*60)%60);
      let seconds = (value*60*60)%3600;
      if (Math.floor(value)===0) {
          if (minutes===0) {
              return seconds+"s";
          }
          return minutes +"min";
      }
      else if (minutes===0) {
          return Math.floor(value) +"h ";
      }
      return Math.floor(value) +"h "+ minutes +"min";
  }
}
