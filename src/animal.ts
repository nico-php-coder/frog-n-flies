class animal {

  constructor () {}

  setPlayer () {
    var player = { // Grenouille
      name: "Grenouille",
      coordX: 0,
      coordY: 0,
      css_class: "grenouille", // classe
      src: "../ressources/frog50icon.png"
    };
    var x = parseInt(Math.ceil(Math.random() * 10).toString()); // on genere un nombre entre 1 et 10
    var y = parseInt(Math.ceil(Math.random() * 10).toString());
    player.coordX = x;
    player.coordY = y;

    var el1 = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case
    el1!.append('<img src="'+ player.src +'">');
  }

}

export {animal}
