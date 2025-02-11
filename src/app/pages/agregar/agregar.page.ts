import { Component, OnInit } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from "../../models/lista.model";
import { ListaItem } from "../../models/lista-item.model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string = "";

  constructor(
    private DeseosService: DeseosService,
    private route: ActivatedRoute
  ) {
    const listaID = this.route.snapshot.paramMap.get("listaId");
    console.log(listaID);
    this.lista = this.DeseosService.obtenerLista(listaID);
    console.log(this.lista);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push(nuevoItem);
    this.nombreItem = "";
    this.DeseosService.guardarStorage();
  }
  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(
      (itemData) => !itemData.completado
    ).length;
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.DeseosService.guardarStorage();
  }
  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.DeseosService.guardarStorage();
  }
}
