import { Component, OnInit } from "@angular/core";
import { GetMessagesService } from "src/app/services/get-messages.service";

@Component({
  selector: "app-message-feed",
  templateUrl: "./message-feed.component.html",
  styleUrls: ["./message-feed.component.css"]
})
export class MessageFeedComponent implements OnInit {
  constructor(public getData: GetMessagesService) {}

  ngOnInit() {}
}
