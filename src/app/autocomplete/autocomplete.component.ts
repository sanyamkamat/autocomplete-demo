import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:click)': 'hideList($event)',
  },
})
export class AutocompleteComponent implements OnInit {
  /**
   * Input properties
   */
  @Input() list: any;
  @Input() options: any;
  @Output() selectedValue = new EventEmitter();

  filteredList: any;
  textEntered: string = "";
  showFilteredList: boolean;
  placeholder: string;
  maxListSize: number;

  constructor() {
  }

  ngOnInit() {
    this.placeholder = this.options.placeholder.length > 0 ? this.options.placeholder : "";
    this.maxListSize = this.options.maxListSize > 0 ? this.options.maxListSize : 20;
  }

  filterList(event) {
    const inputText = this.textEntered.trim();
    this.filteredList = this.list.filter(elem => (elem.toLowerCase().indexOf(inputText.toLowerCase()) > -1));
    if (this.maxListSize) {
      this.filteredList = this.filteredList.slice(0, this.maxListSize);
    }
    this.showFilteredList = !!this.filteredList.length;
    this.selectedValue.emit(inputText);
  }

  formattedItem(text: string) {
    if(text.length > 0) {
      const searchText = this.textEntered.trim();
      this.showFilteredList = true;
      return text.replace(new RegExp(searchText, 'gi'), (match: string): string => {
        return `<strong>${match}</strong>`;
      });
    } else {
      this.showFilteredList = false;
    }
  }

  selectItem(index: number) {
    this.textEntered = this.filteredList[index];
    this.selectedValue.emit(this.filteredList[index]);
    this.showFilteredList = false;
  }

  hideList(event: Event) {
    if(event.target["id"] === "autocomplete") {
      this.filterList(event);
    } else {
      this.showFilteredList = false;
    }
  }

}
