import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disponiblePipe',
})
export class DisponiblePipe implements PipeTransform {

    transform(data: any[]) {
        return data.filter(article => article.Disponible == "1");
    }

}