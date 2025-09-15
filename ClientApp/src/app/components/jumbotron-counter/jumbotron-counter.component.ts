import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-jumbotron-counter',
  templateUrl: './jumbotron-counter.component.html'
})
export class JumbotronCounterComponent {
  public currentCount$: Observable<number> = this.counterService.getCounter();

  constructor(private readonly counterService: CounterService) {}
}
