let rec;
let rec_stat = [];
let animationBackground = [];
let icon_doorway = [];
let station = [];
let mainBackground;
let textbox;
let icon_door;
let isNightRecognized = false;
let resetTimer;
let resultStation = 0;
// 0 - 없음 / 1 - 강남역
let state = 0;
// 0 - stopped / 1 - recording

function preload() {
  rec_stat[0] = loadImage('img/recStop.png');
  rec_stat[1] = loadImage('img/recContinue.png');
  
  animationBackground[0] = loadImage('img/offAniBackground.png');
  animationBackground[1] = loadImage('img/recAniBackground.png');
  
  mainBackground = loadImage('img/mainBackground.png');
  textbox = loadImage('img/textBox.png');
  icon_door = loadImage('img/icon_door.png');
  
  station[0] = loadImage('img/kangnam.png');
  
  rec = new p5.SpeechRec("ko", gotSpeech); // preload에 전처리하면 더 빠름.
}

function setup() {
  createCanvas(393, 852);
  background(255);
  textSize(24);
  image(mainBackground, 0, 0, 393, 415);
  image(animationBackground[0], 28, 28, 337, 337); // 애니메이션 배경 표시
  image(rec_stat[0], 32, 596, 120, 24); // 녹화 상태 표시
  
  
  // 음성 인식 시작
  rec.start(true, false);
}

function draw() {
  background(255);
  image(mainBackground, 0, 0, 394, 415);
  drawMain();
  drawStation();
}

function drawMain() {
  if (state == 1) {
    image(animationBackground[1], 28, 229, 337, 337); // 애니메이션 배경 표시
    image(rec_stat[1], 32, 596, 120, 24); // 녹화 상태 표시
  }
  else{
    image(animationBackground[0], 28, 28, 337, 337); // 애니메이션 배경 표시
    image(rec_stat[0], 32, 596, 120, 24); // 녹화 상태 표시
  }
}
  
function drawStation() {
  if (resultStation == 1) {
    image(station[0], 113, 630, 170, 33);
  }
  if (door == 1) {
    image(icon_door, 113, 638, 60, 60);
  }
  if (door == 1) {
    image(icon_door, 30, 638, 60, 60);
  }
}

function gotSpeech() {
  if (rec.resultValue) {
    let resultText = rec.resultString;  // 인식된 텍스트 가져오기
    text(resultText, 10, 100);  // 인식된 텍스트를 화면에 표시

    // '강남'이라는 단어가 포함되어 있는지 확인
    if (resultText.includes("강남")) {
      resultStation = 1;
    }
    
    if (resultText.includes("오른")) {
      door = 1;
    }
    if (resultText.includes("왼")) {
      door = 2;
    }
    
    else {
      resultStation = 0;
      door = 0;
    }
  }
  
  
}
