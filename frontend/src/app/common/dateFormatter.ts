import { formatDate } from '@angular/common';
import * as _ from 'lodash';

function dateFormatter(date: Date): string {
  return new Date(date).toLocaleDateString('pt-br');
}

function dateParser(date: Date | string): any {
  if (date instanceof Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  } else {
    const numbers = date.split('/');
    return formatDate(
      new Date(_.reverse(numbers).toString()),
      'yyyy-MM-dd',
      'en'
    );
  }
}

export { dateFormatter, dateParser };
