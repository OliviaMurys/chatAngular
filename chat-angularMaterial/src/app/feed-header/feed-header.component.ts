import { Component, OnInit } from "@angular/core";
import { GetMessagesService } from "src/app/services/get-messages.service";

@Component({
  selector: "app-feed-header",
  templateUrl: "./feed-header.component.html",
  styleUrls: ["./feed-header.component.css"]
})
export class FeedHeaderComponent implements OnInit {
  constructor(public getData: GetMessagesService) {}
  ngOnInit() {}
}
