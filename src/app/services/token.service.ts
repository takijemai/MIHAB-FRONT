import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  setToken(token:any){
    return this.storage.set('auth-token', token)
  }

  async getToken(){
    return await this.storage.get('auth-token')
  }

  deleteToken(){
    return this.storage.remove('auth-token')
  }

  async getPayolad(){
const token= await this.storage.get('auth-token')
let payload
if(token){
  payload= token.split('.')[1]
  payload= JSON.parse(window.atob(payload))
}
return payload
  }

  async isLoggedIn(): Promise<boolean> {
    if (await this.storage.get('auth-token')) {
      return true;
    } else {
      return false;
    }
  }
}
