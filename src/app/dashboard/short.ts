import { PipeTransform, Pipe } from "@angular/core";

@Pipe ({
    name: 'short'
})
export class ShortPipe implements PipeTransform {
    transform(value: string): string {
        if(value === null){
            value = '';
        }
        if (value.length > 25) {
            return value.substr(0, 25) + ' ...';
        }
        return value;
    }
}