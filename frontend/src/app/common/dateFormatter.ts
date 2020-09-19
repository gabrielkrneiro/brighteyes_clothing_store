import { formatDate } from '@angular/common';

function dateFormatter(date: Date): string {
  return new Date(date).toLocaleDateString('pt-br');
}

function dateParser(date: Date): any {
  return formatDate(date, 'yyyy-MM-dd', 'en');
}

export { dateFormatter, dateParser };
