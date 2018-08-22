import { Component, OnInit } from "@angular/core";
import { ContactsComponent } from "src/app/contacts/contacts.component";
import * as moment from "moment";
@Component({
  selector: "app-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.css"]
})
export class SendMessageComponent implements OnInit {
  constructor(public contactsComponent: ContactsComponent) {}
  // @ViewChild("sendMessageForm")
  sendMessage(messagetext) {
    let message = messagetext.value;
    let pattern = /^[\s]+$/;
    let objDiv = document.getElementById("mesage-scroll-block");
    if (!pattern.test(message) && message!='') {
      this.contactsComponent.messages.push({
        text: message,
        createdAt: moment().format("MMMM Do YYYY, h:mm"),
        name: "Johnnie Anderson",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/theonlyzeke/128.jpg"
      });
      (<any>document.getElementById("sendMessageForm")).reset();
    }
    objDiv.scrollTo(0, objDiv.scrollHeight);
  }
  ngOnInit() {}
}
