import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '@jkonst/lottery-form-feature';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input()
  isDeterminate: boolean = false;

  @Input()
  status!: Status;
}
