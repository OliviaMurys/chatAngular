import { Component, OnInit } from "@angular/core";
import { GetMessagesService } from "src/app/services/get-messages.service";

@Component({
  selector: "app-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.css"]
})
export class SendMessageComponent implements OnInit {
  constructor(public getData: GetMessagesService) {}

  ngOnInit() {}
}
