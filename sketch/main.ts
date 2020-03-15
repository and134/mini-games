import P5 from "p5";

const main = (p: P5) => {
  let board = [[``, ``, ``], [``, ``, ``], [``, ``, ``]];

  let players = [`X`, `O`];

  let currentPlayer;

  //console.log(currentPlayer);
  const height = 500,
    width = 500;

  p.setup = () => {
    p.createCanvas(500, 500);
  };

  p.draw = () => {
    p.background(220);

    let w = width / 3;
    let h = height / 3;

p.line(w, 0 , w, height);
p.line(w*2, 0, w*2, height);
p.line(h,0,h, width)

    if(Math.random(10)< 2){
      currentPlayer = players[0];
    }else{
      currentPlayer = players[1];
    }
  


    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * j + w / 2;
        let y = h * i + w / 2;
        let square = board[i][j];
        let r = w / 2;
        p.textSize(22);
        p.strokeWeight(4);
        if (square === players[0]) {
          p.line(x - r + 20, y - r + 20, x + r - 20, y + r - 20);
          p.line(x + r - 20, y - r + 20, x - r + 20, y + r - 20);
        }
        if (square === players[1]) {
          p.circle(x, y, w / 1.5);
        }
      }
    }
  };
};

new P5(main);
