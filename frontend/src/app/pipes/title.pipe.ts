import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(title: string): string {
    let result = ""
    if(title.length > 16) {
      result = title.substring(0,16) + '...';
      return result
    }
    return title;
  }

}
