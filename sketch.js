let rec;
let rec_stat = [];
let animationBackground = [];
let icon_doorway = [];
let station = [];
let animation = [];
let mainBackground;
let textbox;
let icon_door;
let notice;
let resultStation = 0;
// 0 - 없음 / 1 - ... / 2 - 혜화 / 3 - 길음 / 4 - 이촌
let state = 0;
// 0 - stopped / 1 - recording
let door = 0;
// 1 - 오른쪽 / 2 - 왼쪽

function preload() {
  rec_stat[0] = loadImage('img/recStop.png');
  rec_stat[1] = loadImage('img/recContinue.png');

  animationBackground[0] = loadImage('img/offAniBackground.png');
  animationBackground[1] = loadImage('img/recAniBackground.png');

  mainBackground = loadImage('img/mainBackground.png');
  whiteBackground = loadImage('img/whiteBackground.png');
  textbox = loadImage('img/textBox.png');
  icon_door = loadImage('img/icon_door.png');
  notice = loadImage('img/notice.png');

  station[1] = loadImage('img/dot.png');
  station[2] = loadImage('img/kangnam.png');

  animation[0] = createVideo('img/hyehwa.mp4');
  animation[1] = createVideo('img/gillum.mp4');
  animation[2] = createVideo('img/ichon.mp4');

  rec = new p5.SpeechRec("ko", gotSpeech); // preload에 전처리하면 더 빠름.
}

function setup() {
  createCanvas(393, 852);
  background(0);
  textSize(24);
  textSize(36);
  stroke(255);
  strokeWeight(1.5);
  textFont('SUITE');
  fill(255);
  image(whiteBackground, 0, 0, 393, 852);
  image(mainBackground, 0, -10, 393, 630);

  image(textbox, 15, 570, 355, 150); // 녹화 상태 표시
  image(rec_stat[0], 145, 510, 100, 100); // 녹화 상태 표시
  image(notice, 113, 355, 166, 174);

  for (let i = 0; i < 3; i++) {
    animation[i].hide(); // DOM 요소 숨김
    animation[i].loop(); // 반복 재생 설정
  }
}

function draw() {
  background(0); // 이전에 그린 내용을 지우기 위해 배경을 흰색으로 초기화
  drawMain();

  image(whiteBackground, 0, 0, 393, 852);
  image(mainBackground, 0, -10, 393, 630);
  // 초기 배경 그리기
  image(textbox, 15, 570, 355, 150); // 녹화 상태 표시
  
  drawStation();
}

function drawMain() {
  // 역 별 애니메이션 그리기
  if (resultStation == 2) {
    animation[0].loadPixels();
    image(animation[0], -75, 248, 542.34, 304.063); // 혜화역 동영상 표시
  } else if (resultStation == 3) {
    animation[1].loadPixels();
    image(animation[1], -100, 240, 589.5, 331.59); // 길음역 동영상 표시
  } else if (resultStation == 4) {
    animation[2].loadPixels();
    image(animation[2], -100, 240, 589.5, 331.59); // 이촌역 동영상 표시
  }


}

function drawStation() {
  if (state == 0) {
    text("어서오세요", 120, 180);
  }
  if (state == 1) {
    text("이번 역은...", 120, 180);
    image(rec_stat[1], 145, 510, 100, 100); // 녹화 상태 표시
  } else {
    image(rec_stat[0], 145, 510, 100, 100); // 녹화 상태 표시
    image(notice, 113, 355, 166, 174);
  }

  if (resultStation == 1) {
    image(station[1], 95, 610, 200, 50);
  }
  if (resultStation == 2) {
    strokeWeight(1);
    text("혜 화 역", 135, 652);
  } else if (resultStation == 3) {
    strokeWeight(1);
    text("길 음 역", 135, 652);
  } else if (resultStation == 4) {
    strokeWeight(1);
    text("이 촌 역", 135, 652);
  }

  if (door == 1) {
    image(icon_door, 275, 613, 50, 50);
  }
  if (door == 2) {
    image(icon_door, 60, 613, 50, 50);
  }
}

function gotSpeech() {
  if (rec.resultValue) {
    let resultText = rec.resultString; // 인식된 텍스트 가져오기
    console.log(resultText); // 인식된 텍스트를 콘솔에 표시

    // 단어가 포함되어 있는지 확인
    if (
      resultText.includes("혜화") ||
      resultText.includes("세화") ||
      resultText.includes("예와") ||
      resultText.includes("회화")
    ) {
      resultStation = 2;
      door = 1;
    } else if (resultText.includes("기름")) {
      resultStation = 3;
      door = 2;
    } else if (
      resultText.includes("이촌") ||
      resultText.includes("이천") ||
      resultText.includes("2000")
    ) {
      resultStation = 4;
      door = 2;
    }

    if (resultText.includes("출입문")) {
      drawMain();
      drawStation();
      resultStation = 1;
      state = 1;
      door = 0;
    }
  }
}

function mousePressed() {
  // rec_stat 이미지의 위치와 크기 내에서 클릭 여부 확인
  if (mouseX >= 156 && mouseX <= 156 + 81 && mouseY >= 539 && mouseY <= 539 + 81) {
    // state 값 변경 (0 -> 1 또는 1 -> 0 토글)
    state = (state + 1) % 2;
    drawMain();
    drawStation();

    if (state == 1) {
      isListening = true;
      rec.start(true, false);
      console.log("음성 인식 시작됨");
      resultStation = 1;
    } else {
      resultStation = 0;
      door = 0;
      isListening = false;
      console.log("음성 인식 종료됨");
    }
  }
}
