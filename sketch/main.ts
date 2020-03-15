import P5 from "p5";

const gameOver = board => {
  const wins = [
    //diagonal
    [
      [0, 0],
      [1, 1],
      [2, 2]
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0]
    ],
    //row
    [
      [0, 0],
      [0, 1],
      [0, 2]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2]
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2]
    ],
    //col
    [
      [0, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2]
    ]
  ];
  return wins.find(
    positions =>
      positions.filter(([c, r]) => board[c][r] == "X").length == 3 ||
      positions.filter(([c, r]) => board[c][r] == "O").length == 3
  );
};

const main = (p: P5) => {
  let board = [
    [``, ``, ``],
    [``, ``, ``],
    [``, ``, ``]
  ];

  let winLine = null;

  let players = [`X`, `O`];

  let currentPlayer = 0;
  let button = null

  const height = 500,
    width = 500;

  p.setup = () => {
    p.createCanvas(500, 500);
    button = p.createButton("<h1>Winner is X</h1>");
    button.position(height/2-70, width/2-30);    
    button.hide()
  };
  p.mousePressed = ({ clientX, clientY }) => {
    if (winLine == null) {
      const cellCol = Math.floor(clientY / (width / 3));
      const cellRow = Math.floor(clientX / (height / 3));
      if (board[cellCol][cellRow] == '') {
        board[cellCol][cellRow] = players[currentPlayer];
        winLine = gameOver(board);
        currentPlayer = (currentPlayer + 1) % 2;
        if (winLine) {
          console.log("WinLine", winLine[0][0])
          button.html(`<h1>Winner is ${board[winLine[0][0]][winLine[0][1]]}</h1>`)
          button.show()
        }
      }
    } else {
      currentPlayer = 0;
      winLine = null;
      button.hide()
      board = [
        [``, ``, ``],
        [``, ``, ``],
        [``, ``, ``]
      ];
    }
  };
  p.draw = () => {
    p.background(220);

    let w = width / 3;
    let h = height / 3;
    p.noFill();

    p.line(w, 0, w, height);
    p.line(w * 2, 0, w * 2, height);
    p.line(0, h, width, h);
    p.line(0, h * 2, width, h * 2);

    p.push();
    p.stroke(20, 20, 220);
    p.textSize(22);
    p.strokeWeight(10);

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * j + w / 2;
        let y = h * i + w / 2;
        let square = board[i][j];
        let r = w / 2;

        if (square === players[0]) {
          p.line(x - r + 20, y - r + 20, x + r - 20, y + r - 20);
          p.line(x + r - 20, y - r + 20, x - r + 20, y + r - 20);
        }
        if (square === players[1]) {
          p.circle(x, y, w / 1.5);
        }
      }
    }
    p.pop();

    if (winLine) {
      const cellSize = width / 3;
      const startPoint = [
        winLine[0][1] * cellSize + cellSize / 2,
        winLine[0][0] * cellSize + cellSize / 2
      ];
      const finishPoint = [
        winLine[2][1] * cellSize + cellSize / 2,
        winLine[2][0] * cellSize + cellSize / 2
      ];
      
      p.push();
      p.strokeWeight(40);
      p.stroke(244, 0, 0, 192);
      p.strokeCap(p.ROUND);
      p.line(startPoint[0], startPoint[1], finishPoint[0], finishPoint[1]);
      //p.line(startPoint[1], startPoint[0], finishPoint[1], finishPoint[0]);

      p.pop();

    }
  };
};

new P5(main);
