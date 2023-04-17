import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  setErrorToControls(message: any, controls: any) {

    const keys = Object.keys(message);
    console.log(message)
    console.log(controls)
    keys.forEach(key => {
      controls[key].setErrors({responsError: message[key]})
    })
  }
}
