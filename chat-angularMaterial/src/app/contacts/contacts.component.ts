import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"]
})
export class ContactsComponent {
  showFiller = false;
  contactsUrl = "https://5b7534abdeca780014ec9f2a.mockapi.io/channels";
  public contacts: any[] = [];
  public messages: any[] = [];
  public activeContactName: any = "";
  public activeContactImg: any = "";
  constructor(private http: HttpClient) {}

  getConacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(this.contactsUrl, {
        method: "GET"
      }).then(
        res => {
          res.json().then(res => {
            this.contacts = res;
            resolve();
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public openChat(id, name, avatar): Promise<any> {
    let chanelUrl = this.contactsUrl + "/" + id + "/messages";
    return new Promise((resolve, reject) => {
      fetch(chanelUrl, {
        method: "GET"
      }).then(
        res => {
          res.json().then(res => {
            this.messages = res;
            this.activeContactName = name;
            this.activeContactImg = avatar;
            resolve();
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }
  public randomMessageSending() {
    let rundomNumber =  Math.floor(Math.random() * 10);
    let randomItemString =   "chanelItem"+rundomNumber;
    let randomItem = document.getElementById(randomItemString);
    console.warn(randomItemString);
    console.warn(randomItem);
  }

  ngAfterViewInit() {
    this.getConacts();
    this.randomMessageSending();
  }
}
