import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InMemoryCache {

    

    constructor() { }

    setItem(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    getItem(key: string) : any {
        const data = sessionStorage.getItem(key);
        return data ? data : null;
       // return  ? key : null;
      
    }
    clear() {
        sessionStorage.clear();
    }
}
