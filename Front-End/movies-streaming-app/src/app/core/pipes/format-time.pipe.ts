import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

    transform(value: number): string {
        const h = Math.floor(value / 3600);
        const m = Math.floor((value % 3600) / 60);
        const s = Math.floor(value % 60);
    
        const hDisplay = h > 0 ? String(h).padStart(2, '0') + ':' : '';
        const mDisplay = String(m).padStart(2, '0') + ':';
        const sDisplay = String(s).padStart(2, '0');
    
        return hDisplay + mDisplay + sDisplay;
      }

}
