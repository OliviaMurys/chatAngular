import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class IconService {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "attachment",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/attachment.svg")
    );
    iconRegistry.addSvgIcon(
      "search",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/loupe.svg")
    );
    iconRegistry.addSvgIcon(
      "doc",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/doc.svg")
    );
    iconRegistry.addSvgIcon(
      "zip",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/zip.svg")
    );
    iconRegistry.addSvgIcon(
      "rar",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/rar.svg")
    );
    iconRegistry.addSvgIcon(
      "pdf",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pdf.svg")
    );
  }
}
