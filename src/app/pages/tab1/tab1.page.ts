import { Component } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { Lista } from "../../models/lista.model";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(
    public deseosServices: DeseosService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async agregarLista() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Nueva Lista",
      inputs: [
        { name: "titulo", type: "text", placeholder: "nombre de la lista" },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => console.log("cancelar"),
        },
        {
          text: "crear",
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            const listaID = this.deseosServices.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaID}`);
          },
        },
      ],
    });
    alert.present();
  }
  listaSeleccionada(lista: Lista) {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
}
