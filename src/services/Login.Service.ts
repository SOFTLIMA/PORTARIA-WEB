import { Injectable, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoginService {

  private valueSource = new BehaviorSubject<boolean>(false);
  public value = this.valueSource.asObservable();

  constructor(){}

  changeValue(value : boolean){
    this.valueSource.next(value);
  }

}
