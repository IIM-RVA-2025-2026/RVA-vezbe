import { Dobavljac } from "./dobavljac";

export class Porudzbina {
    id!:number;
    datumPorudzbine!:Date;
    datumIsporuke!:Date;
    iznos!:number;
    placeno!:boolean;
    dobavljac!:Dobavljac;
}