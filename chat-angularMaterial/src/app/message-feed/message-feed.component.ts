import { Component, OnInit } from '@angular/core';
import { ContactsComponent } from 'src/app/contacts/contacts.component'

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit {

  constructor(public contactsComponent: ContactsComponent) { }

  ngOnInit() {
  }

}
