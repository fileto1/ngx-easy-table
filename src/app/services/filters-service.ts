import { Injectable } from '@angular/core';
import { ResourceService } from './resource-service';

@Injectable()
export class FiltersService {

  constructor(public resource: ResourceService) {
  }

  public filters: Array<any> = [];

  update(k: string, v: string) {
    this.filters[k] = v;
  }

  get(): Array<any> {
    return this.filters;
  }

  public applyCustomFilters(filters: Object, data: Array<Object>): Array<Object> {
    console.log('customFilters: ', filters);
    if (Object.keys(filters).length === 0) {
      return data;
    }
    const tmpData = [...data];
    data.forEach((row) => {
      Object.keys(filters).forEach((key) => {
        const cell = row[key];
        const filter = filters[key];
        console.log('query', filter['query']);
        switch (filter['query']) {
          case '=': {
            if (cell.toLocaleLowerCase().indexOf(filter['value'].toLocaleLowerCase()) === -1) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
          case '>': {
            if (!(cell > filter['value'])) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
          case '>=': {
            if (!(cell >= filter['value'])) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
          case '<': {
            if (!(cell < filter['value'])) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
          case '<=': {
            if (!(cell <= filter['value'])) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
          case 'IN': {
            if (filter['value'].length === 0) {
              break;
            }
            if (filter['value'].indexOf(cell) === -1) {
              tmpData.splice(tmpData.indexOf(row), 1);
            }
            break;
          }
        }
      });
    });

    return tmpData;
  }
}
