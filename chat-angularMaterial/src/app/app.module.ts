import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactsComponent } from "./contacts/contacts.component";
import { MessageFeedComponent } from "./message-feed/message-feed.component";
import { SendMessageComponent } from "./send-message/send-message.component";
import { MaterialModuleModule } from "./material-module/material-module.module";
import { FeedHeaderComponent } from "./feed-header/feed-header.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';

const routes = [{ path: '', redirectTo: 'channel/1',pathMatch: 'full'},
                { path: "channel/:id", component: ContactsComponent}];


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    MessageFeedComponent,
    SendMessageComponent,
    FeedHeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SnotifyModule
  ],
  providers: [
  { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
