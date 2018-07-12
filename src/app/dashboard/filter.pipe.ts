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
      if(item['id']){
        var idd = item['id'].toString();
        st += idd.toLowerCase();
      }
      if(item['custgroupName']){
        st += item['custgroupName'].toLowerCase();
      }
      if(item['team']){
        st += item['team'].toLowerCase();
      }
      if(item['title']){
        st += item['title'].toLowerCase();
      }
      if(item['STATUS']){
        st += item['STATUS'].toLowerCase();
      }
      if(item['priority']){
        st += item['priority'].toLowerCase();
      }
      if(item['link']){
        st += item['link'].toLowerCase();
      }
      if(item['COMMENT']){
        st += item['COMMENT'].toLowerCase();
      }
      if(item['days']){
        var day = item['days'].toString();
        st += day.toLowerCase();
      }
      if(item['type']){
        st += item['type'].toLowerCase();
      }
      if(item['userType']){
        st += item['userType'].toLowerCase();
      }
      if(item['username']){
        st += item['username'].toLowerCase();
      }
      if(item['description']){
        st += item['description'].toLowerCase();
      }
      if(item['createdtime']){
        st += item['createdtime'].toLowerCase();
      }
      if(item['modifiedtime']){
        st += item['modifiedtime'].toLowerCase();
      }
      if(item['cf_568id']){
        var cf = item['cf_568id'].toString();
        st += cf.toLowerCase();
      }

      var string2 = filterString.toLowerCase();
      if (st.indexOf(string2) > -1) {
        resultArray.push(item);
      }
    }
      
  
    return resultArray;
  }

}
