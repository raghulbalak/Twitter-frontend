import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {
  now = new Date().getTime();

  transform(value: any, ...args: unknown[]) {
    let result;
    const date = new Date(value);

    let delta = (this.now - date.getTime()) / 1000;
    if (delta < 10) {
      result = 'posted now';
    } else if (delta < 60) { // sent in last minute
      result = 'posted ' + Math.floor(delta) + ' seconds';
    } else if (delta < 3600) { // sent in last hour
      result = 'posted ' + Math.floor(delta / 60) + ' minutes';
    } else if (delta < 86400) { // sent on last day
      result = 'posted ' + Math.floor(delta / 3600) + ' hours';
    } else { // sent more than one day ago
      result = 'posted ' + Math.floor(delta / 86400) + ' days';
    }
    console.log(value);
    return result;
  }

}
