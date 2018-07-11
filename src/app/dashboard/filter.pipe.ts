import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: any): any {
    console.log('propName: ', propName);
    if (value.length === 0) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      console.log('item: ', item);

      var st = '';
      //  st = item['team'].toLowerCase() + item['COMMENT'].toLowerCase() + item['custgroupName'].toLowerCase() + item['STATUS'].toLowerCase() ;
      if(item['team']){
        st += item['team'].toLowerCase();
      }
      if(item['COMMENT']){
        st += item['COMMENT'].toLowerCase();
      }
      if(item['custgroupName']){
        st += item['custgroupName'].toLowerCase();
      }
      if(item['STATUS']){
        st += item['STATUS'].toLowerCase();
      }

      var string2 = filterString.toLowerCase();
      if (st.indexOf(string2) > -1) {
        resultArray.push(item);
      }
    }
      
  
    return resultArray;
  }

}
