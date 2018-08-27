import { Component } from "@angular/core";
import { GetMessagesService } from "src/app/services/get-messages.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"]
})
export class ContactsComponent {
  public searchValue:string;
   constructor(
    public getData: GetMessagesService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  /**
   * функція для пошуку по контактах
   */
  public onSearch():void {
    const s = this.searchValue.trim();
    if (s) {
      for ( let contact of this.getData.contacts) {
        let found = contact.name && contact.name.indexOf(s) != -1;
        if (!found) {
          console.log('found', found)
          document.querySelector(`[data-itemid="${contact.id}"]`).classList.add('hidden');
        } else {
          document.querySelector(`[data-itemid="${contact.id}"]`).classList.remove('hidden');
        }
      }
    
    } else this.getData.getConacts();
  }

  /**
   * функція для перевірки урли
   */
  private setActiveChannel(id: number): void {
    const channel = this.getData.contacts.find(contact => contact.id == id);
    if (channel) {
      this.getData.activeChannelId = id;
      channel.unread_messages_count = 0;
    } else {
      this.router.navigate(["/channel", this.getData.contacts[0].id]);
    }
  }
  /**
   *   функція що виконується після загрузки сторінки
   */
  ngAfterViewInit() {
    this.getData.getConacts().then(res => {
      this.activatedRoute.params.forEach((params: Params) => {
        if (params["id"] !== undefined) {
          this.setActiveChannel(params["id"]);
        } else {
          this.setActiveChannel(this.getData.contacts[0].id);
        }
        this.getData.some();
      });
    });
  }
}
