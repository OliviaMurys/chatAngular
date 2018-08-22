import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';									  

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
  public NumOfChannels: number;
  public randomActiveChannel: any = 1;
  public activeContactName: any = "";
  public activeContactImg: any = "";
  public chanelUrl: any;
  public activeChannelId: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  
  getConacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(this.contactsUrl, {
        method: "GET"
      }).then(
        res => {
          res.json().then(res => {
            this.contacts = res;
            this.NumOfChannels = res.length;
            resolve();
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public openChat(id): Promise<any> {
   this.chanelUrl = this.contactsUrl + "/" + id + "/messages";
    return new Promise((resolve, reject) => {
      fetch(this.chanelUrl, {
        method: "GET"
      }).then(
        res => {
          res.json().then(res => {
            this.messages = res;
            // this.activeContactName = name;
            // this.activeContactImg = avatar;
            resolve();
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  public randomtime(){
    const randomTime = Math.floor(Math.random() * 10000) + 1000;
  }
  public randomMessageSending() {
    const randomMessage = Math.random().toString(36).substring(7);
    this.randomActiveChannel = Math.floor(Math.random() * this.NumOfChannels) + 1;
   // console.log('randomActiveChannel'+ this.randomActiveChannel)
    this.chanelUrl = this.contactsUrl + "/" + this.randomActiveChannel + "/messages";
    //console.warn('chanel url where i push ' + this.chanelUrl)
      this.messages.push({
      text: randomMessage,
      createdAt: "MMMM Do YYYY, h:mm",
      name: "Olivia Murys",
      avatar:
      "https://yt3.ggpht.com/a-/ACSszfHvgwmHzF1IsA79wY0KnI0UReAKkU44Hd90gw=s900-mo-c-c0xffffffff-rj-k-no"
    })
  }      

  private setActiveChannel(id: number): void {
    this.activeChannelId = id;
  }

  ngAfterViewInit() {
    this.getConacts().then(res => {
    //  this.openChat(1, this.contacts[0].name,  this.contacts[0].avatar)
    //  setInterval(() => this.randomMessageSending(), 10000);
    });
    this.activatedRoute.params.forEach((params: Params) => {
      if (params['id'] !== undefined)
        this.setActiveChannel(params['id']);
        this.openChat(this.activeChannelId);
    }); 

  }
}
