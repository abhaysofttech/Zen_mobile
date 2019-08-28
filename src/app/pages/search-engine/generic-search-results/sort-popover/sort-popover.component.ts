import { Component, OnInit } from '@angular/core';
import { PopoverController, Events } from '@ionic/angular';

@Component({
  selector: 'app-sort-popover',
  templateUrl: './sort-popover.component.html',
  styleUrls: ['./sort-popover.component.scss']
})
export class SortPopoverComponent implements OnInit {

  constructor
    (
      private popoverController: PopoverController,
      private events: Events
    ) {

  }

  ngOnInit() {
  }

  filterItemClick(data: string) {
    // Send select filter option data via Angular Events
    this.events.publish('sortFilter', data)
    // Dismiss the pop over
    this.popoverController.dismiss()
  }
}
