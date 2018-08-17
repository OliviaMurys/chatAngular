import { Component, OnInit } from "@angular/core";
import { ContactsComponent } from "src/app/contacts/contacts.component";
@Component({
  selector: "app-feed-header",
  templateUrl: "./feed-header.component.html",
  styleUrls: ["./feed-header.component.css"]
})
export class FeedHeaderComponent implements OnInit {
  constructor(public contactsComponent: ContactsComponent) {}
  ngOnInit() {}
}
