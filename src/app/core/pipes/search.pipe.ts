import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjrct:any[], term:string): any {
      
    return arrayOfObjrct.filter(  (item)=>item.title.toLowerCase().includes(term.toLowerCase())        );
  }

}
