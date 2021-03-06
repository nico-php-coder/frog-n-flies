
class circuit {

  private longueurCircuit : number;
  private largeurCircuit : number;
  private score : number;
  public player: number;
  public static cookieName : string = "circuit"; // voir l199 [?].substring


  constructor(longueurCircuit : number, largeurCircuit : number, score : number, player: number = 0) {
      this.longueurCircuit = longueurCircuit;
      this.largeurCircuit = largeurCircuit;
      this.score = score;
      this.player = player;
  }

  public generate(nombreMouche : number) : void {
      this.generateMap(this.longueurCircuit, this.largeurCircuit);
      this.generateRocks();
      this.generateFlies(nombreMouche);
      this.generateFrog();
  }

  public generateMap(longeurCircuit : number, largeurCircuit : number) : void {
      document.getElementById('container-circuit')!.innerHTML = ""; // réinitialise la carte

      var el = document.getElementById('container-circuit')!;

      for (var i : number = 0; i < longeurCircuit; i++) { // genere une carte de 10 sur 10
          var row = document.createElement('div');
          row.setAttribute("class", "row"); // attribution classe row
          el.appendChild(row);

          for (var j : number = 0; j < largeurCircuit; j++) {
              var col = document.createElement('div');
              col.setAttribute("class", "square"); // attribution classe row
              col.setAttribute("data-x", (j + 1).toString()); // attribution attribut data-x
              col.setAttribute("data-y", (i + 1).toString()); // attribution attribut data-y
              col.setAttribute("type", ""); // attribution attribut type (vide/blocked/weapon/player)
              row.appendChild(col);
          }
      }
  }

  public generateRocks(nombreCailloux : number = 20) : void {
      for (var i : number = 0; i < nombreCailloux; i++) {
          var x : number = Math.ceil(Math.random() * 10); //genere un nombre entre 1 et 10
          var y : number = Math.ceil(Math.random() * 10);

          var rock = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case

          if (rock!.getAttribute("type") === "") { // test si la case est vide
            rock!.setAttribute("type", "rock"); // on defini le type a rock
            rock!.classList.add("rock"); // on attribue la classe rock
          } else {
            i--; // si la case n'est pas vide on recommence l'iteration
          };
      }
  }

  public generateFlies(nombreMouche : number) : void {
      for (var i : number = 0; i < nombreMouche; i++) {
          var x : number = Math.ceil(Math.random() * 10); //genere un nombre entre 1 et 10
          var y : number = Math.ceil(Math.random() * 10);

          var fly = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case

          if (fly!.getAttribute("type") === "") { // test si la case est vide
            fly!.setAttribute("type", "fly"); // on defini le type a fly
            fly!.classList.add("fly"); // on attribue la classe fly
          } else {
            i--; // si la case n'est pas vide on recommence l'iteration
          };
      }
  }


  public generateFrog() : void {
    var player = { // Grenouille
      name: "Grenouille",
      coordX: 0,
      coordY: 0,
      css_class: "frog", // classe
    };
    var x = parseInt(Math.ceil(Math.random() * 10).toString()); // on genere un nombre entre 1 et 10
    var y = parseInt(Math.ceil(Math.random() * 10).toString());
    player.coordX = x; // On set les coordonnées
    player.coordY = y;


    var frog = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case
    if (frog!.getAttribute("type") === "") { // test si la case est vide
      frog!.setAttribute("type", "frog"); // on defini le type a frog
      frog!.classList.add("frog"); // on attribue la classe frog
    } else {
      this.generateFrog();
    };
  }

  public setCookie() : void {
    const date = new Date();
    const value = this;

    document.cookie = circuit.cookieName+"="+ JSON.stringify(value) +"; date="+Date;
    
    console.log(document.cookie);
  }

  public static getCookie() : circuit {
//
    if(document.cookie.length>0){
      //Si les cookies sont pleins: (.length>0)
      let cookie  : string = document.cookie;
      if(cookie.length > 2){
        cookie = cookie.split("; ").filter(function(item){
          return item.startsWith(circuit.cookieName+"=");
          //.filter => variante de .find (find fonctionne seulement sur firefox)
        })[0].substring(circuit.cookieName.length+1);
        //[?]substring => affiche le contenu après une "string=";
        return JSON.parse(cookie) as circuit;
      }
    }
      
     return new circuit(20, 20, 0);
  }


}
// export class circuit{
//   generateFrog();
// }
export {circuit};
