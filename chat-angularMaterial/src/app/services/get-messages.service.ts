import { Injectable } from "@angular/core";
import { SnotifyService } from "ng-snotify";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class GetMessagesService {
  public contactsUrl = "https://5b7534abdeca780014ec9f2a.mockapi.io/channels";
  public messages: any[] = [];
  public channelUrl: any;
  public contacts: any[] = [];
  public activeContactName: any = "";
  public activeContactImg: any = "";
  public activeChannelId: number;
  public randomTime;
  constructor(private snotifyService: SnotifyService) {}
  /**
   * функція повертає контакти
   */
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

  /**
   * функція для того щоб вятигнуии конкретні повідомлення з апішки
   */
  public getMessages(id): Promise<any> {
    this.channelUrl = this.contactsUrl + "/" + id + "/messages";
    return new Promise((resolve, reject) => {
      fetch(this.channelUrl, {
        method: "GET"
      }).then(
        res => {
          res.json().then(res => {
            this.messages = res;
            resolve();
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }
  /**
   * функція що витягує власні повідомлення(не з апішки)
   */
  public getOwnMessages(id) {
    id = id - 1;
    this.messages = this.contacts[id].messages;
  }

  /**
   * бере дані для верхньох панельки
   */
  public getShortChannelData() {
    let activeObj = this.activeChannelId - 1;
    this.activeContactName = this.contacts[activeObj].name;
    this.activeContactImg = this.contacts[activeObj].avatar;
  }
  /**
   * рандомна функція
   */
  public getRandomTime() {
    return (this.randomTime = Math.floor(Math.random() * 15000) + 5000);
  }

  public randomMessageSending() {
    const randomMessage = Math.random()
      .toString(36)
      .substring(7);
    let randomActiveChannel = Math.floor(Math.random() * this.contacts.length);
    let { messages } = this.contacts[randomActiveChannel];
    const message: any = {
      text: randomMessage,
      createdAt: "MMMM Do YYYY, h:mm",
      name: "Bot",
      avatar:
        "https://pro2-bar-s3-cdn-cf4.myportfolio.com/184b535622300b5c658719a36dbe3843/f0e10cc72ae22454875c5ea3_rw_1920.jpg?h=4f0cb85d5f29bd5bd18e7206bb5593de"
    };
    messages.push(message);
    if (this.contacts[randomActiveChannel].id != this.activeChannelId) {
      this.contacts[randomActiveChannel].unread_messages_count++;
    }
    this.snotifyService.prompt(`${message.text}`, `${message.name}`, {
      icon: null,
      closeOnClick: false,
      placeholder: "Enter answear",
      buttons: [
        {
          text: "Send",
          action: toast => this.sendMessage(toast)
        },
        { text: "Cancel" }
      ]
    });
  }

  /**
   * функція з рекурсією, що рандомно шле повідомлення з рандомним інтервалом
   */
  private messageLoop(): void {
    this.randomMessageSending();
    let delay = this.getRandomTime();
    setTimeout(() => this.messageLoop(), delay);
  }
  /**
   * функція для надсилання повідомлення в чат
   */
  sendMessage(messagetext) {
    let message = messagetext.value;
    if (message.trim()) {
      this.messages.push({
        text: message,
        createdAt: moment().format("MMMM Do YYYY, h:mm"),
        name: "Murys Olivia",
        avatar:
          "https://yt3.ggpht.com/a-/ACSszfHvgwmHzF1IsA79wY0KnI0UReAKkU44Hd90gw=s900-mo-c-c0xffffffff-rj-k-no"
      });
      (<any>document.getElementById("sendMessageForm")).reset();
      setTimeout(this.scrollBottom);
    }
  }
  /**
   * функція для скролу вниз якщо було написане нове повідомлення
   */
  scrollBottom() {
    let objDiv = document.getElementById("mesage-scroll-block");
    objDiv.scrollTo(0, objDiv.scrollHeight);
  }
  /**
   * функція що виконається після загрузки сторінки
   */
  some() {
    // this.getMessages(this.activeChannelId);
    this.getOwnMessages(this.activeChannelId);
    this.getShortChannelData();
    this.messageLoop();
  }
}
