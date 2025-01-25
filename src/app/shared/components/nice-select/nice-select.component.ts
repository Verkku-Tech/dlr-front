import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NiceSelectOption } from '../../interfaces/option.interface';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-nice-select',
  templateUrl: './nice-select.component.html',
  styleUrls: ['./nice-select.component.scss'],
})
export class NiceSelectComponent {

  @Input() options!: NiceSelectOption[];
  @Input() defaultCurrent?: number = 0;
  @Input() placeholder: string = '';
  @Input() className: string = '';

  @Output() onChange: EventEmitter<NiceSelectOption> = new EventEmitter();
  
  public UtilsService = inject(UtilsService) 

  open = false;
  current: NiceSelectOption | undefined;

  toggleOpen() {
    this.open = !this.open;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  currentHandler(item: NiceSelectOption, index: number) {
    this.current = this.options[index];
    this.onChange.emit(item);
    this.onClose();
  }

  onClose() {
    this.open = false;
  }
}
