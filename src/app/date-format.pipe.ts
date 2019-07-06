import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'timestampConverter'})
export class TimestampConverterPipe implements PipeTransform {
  transform(value: number): string {
  	let date = new Date(value);

      return date.getUTCFullYear() +
        '-' + ('0' + date.getUTCMonth()).slice(-2) +
        '-' + ('0' + date.getUTCDate()).slice(-2) + 
        ' ' + ('0' + date.getUTCHours()).slice(-2) +
        ':' + ('0' + date.getUTCMinutes()).slice(-2) +
        ':' + ('0' + date.getUTCSeconds()).slice(-2) +
        '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) 
    };

}
