import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    save(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }

    get(name){
        return JSON.parse(localStorage.getItem(name));
    }
}
