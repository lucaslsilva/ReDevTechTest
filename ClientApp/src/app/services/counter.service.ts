import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public getCounter(): Observable<number> {
    return this.counter.asObservable();
  }

  public increment(): void {
    this.counter.next(this.counter.value + 1);
  }
}
