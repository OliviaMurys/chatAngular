import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { GetMessagesService } from "src/app/services/get-messages.service";
import * as moment from "moment";
import { IconService } from "../services/icons.service";

@Component({
  selector: "app-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.css"]
})
export class SendMessageComponent implements OnInit {
  constructor(
    public getData: GetMessagesService,
    public iconService: IconService
  ) {}
  @ViewChild("fileUpload")
  fileUpload: ElementRef;
  @ViewChild("jsValue")
  jsValue: ElementRef;

  public chekFileType(event) {
    let filename = this.fileUpload.nativeElement.value;
    console.log(filename);
    let extn = filename.split(".").pop();
    console.log(extn);
    switch (extn) {
      case "png":
      case "jpg":
      case "tif":
      case "gif":
        this.onImgUpload(event);
        break;
      case "pdf":
      case "zip":
      case "doc":
      case "rar":
        this.onFileUpload(filename, extn);
        break;
    }
  }

  public onFileUpload(filename, extn) {
    console.log("file uploaded ", filename);
    this.getData.messages.push({
      fileName: filename,
      fileType: extn,
      createdAt: moment().format("MMMM Do YYYY, h:mm"),
      name: "Murys Olivia",
      avatar:
        "https://yt3.ggpht.com/a-/ACSszfHvgwmHzF1IsA79wY0KnI0UReAKkU44Hd90gw=s900-mo-c-c0xffffffff-rj-k-no"
    });
  }
  public onImgUpload(event) {
    console.log("img uploaded ");
    let files = event.target.files;
    this.asyncFunc(files).then(file => {
      this.getData.messages.push({
        imageUrl: file,
        createdAt: moment().format("MMMM Do YYYY, h:mm"),
        name: "Murys Olivia",
        avatar:
          "https://yt3.ggpht.com/a-/ACSszfHvgwmHzF1IsA79wY0KnI0UReAKkU44Hd90gw=s900-mo-c-c0xffffffff-rj-k-no"
      });
    });
  }
  public asyncFunc(files): Promise<any> {
    return new Promise((resolve, reject) => {
      let fileArr = [];
      for (let i = 0, file; (file = files[i]); i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileArr.push(reader.result);
          if (i == files.length - 1) resolve(fileArr);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
      err => {
        reject(err);
      };
    });
  }
  ngOnInit() {}
}
