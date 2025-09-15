import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount$: Observable<number> = this.counterService.getCounter();

  constructor(private readonly counterService: CounterService) {}

  public incrementCounter(): void {
    this.counterService.increment();
  }
}
