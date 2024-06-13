import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allStudentData: any, searchKey: any): any[] {
    const result: any = [];
    if (!allStudentData || searchKey === ''){
      return allStudentData;
    }
    else{
      allStudentData.forEach((item: any) => {
        if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
          result.push(item)
        }
      });
    }
    return result;
  }

}
