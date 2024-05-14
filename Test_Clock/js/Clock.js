const clock = document.querySelector('.clock');
const hoursBox = document.querySelector('.clock__hand--hour');
const minutesBox = document.querySelector('.clock__hand--minute');
const secondsBox = document.querySelector('.clock__hand--second');

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radius = 150;
let lineWidth = 3;
let TickHeight = 15;
let startAngle = 0;
let endAngle = Math.PI * 2;
let now ;
let hours ;
let minutes ;
let seconds ;



let clockHour= document.querySelector('.clock__hand--hour');
let clockMinute= document.querySelector('.clock__hand--minute');
let clockSecond= document.querySelector('.clock__hand--second');




context.beginPath();
context.arc(centerX, centerY, radius, startAngle, endAngle);
context.lineWidth = lineWidth;
context.strokeStyle = 'black'; // Цвет обводки
context.stroke();

const setCustomProperty = (name, value) => {
    clock.style.setProperty(`--${name}`, value);
};

const setTimeVariables = (time) => {
    setCustomProperty('hours', time.getHours());
    setCustomProperty('minutes', time.getMinutes());
    setCustomProperty('seconds', time.getSeconds());
};

const setTimeLayout = (time) => {

    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();


    clock.setAttribute('datetime', time.toISOString());

}

const setTime = () => {
    now = new Date();

    setTimeVariables(now);
    setTimeLayout(now);
}

function drawTickMark(angle, size,radius) {
    context.beginPath();
    let tickX = centerX + Math.cos(angle) * radius;
    let tickY = centerY + Math.sin(angle) * radius;
    context.moveTo(tickX, tickY);
    tickX -= TickHeight * size * Math.cos(angle);
    tickY -= TickHeight * size * Math.sin(angle);
    context.lineTo(tickX, tickY);
    context.stroke();
}

// Draw the clock face with tick marks
function drawClockFace() {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.lineWidth = lineWidth;
    context.strokeStyle = 'black';
    context.stroke();

    // Add large tick marks for each hour (12 marks in total)
    for (let i = 0; i < 12; i++) {
        let angle = (Math.PI * i / 6) + Math.PI / 2;
        drawTickMark(angle, 1,radius);  // Draw large tick marks with size 1
    }

    // Add smaller tick marks between each hour (5 marks between each pair)
    for (let i = 0; i < 12; i++) {
        for (let j = 1; j <= 5; j++) {
            let angle = (Math.PI * i / 6) + (Math.PI * j / 30) + Math.PI / 2;
            drawTickMark(angle, 0.5,radius/1.02);  // Draw smaller tick marks with size 0.5
        }
    }
}
function CreateClockHand(){
    clockSecond.style.textContent ='';
    clockSecond.style.width ='3px';
    clockSecond.style.height ='170px';
    clockSecond.style.background ='red';
    clockSecond.style.borderRadius ='20%';
    clockSecond.style.zIndex ='5';
    clockSecond.style.top ='20%';
    clockSecond.style.left ='50%';

    clockMinute.style.height ='160px';
    clockMinute.style.width ='7px';
    clockMinute.style.display ='block';
    clockMinute.style.position ='absolute';
    clockMinute.style.top ='22%';
    clockMinute.style.left ='50%';
    clockMinute.style.right ='90%';
    clockMinute.style.bottom ='55%';
    clockMinute.style.zIndex ='4';



    clockHour.style.width ='15px';
    clockHour.style.height ='125px';
    clockHour.style.borderRadius ='20%';
    clockHour.style.zIndex ='3';
    clockHour.style.top ='29%';



    let whiteZone= document.createElement("span");


    whiteZone.style.textContent = '';
    whiteZone.style.width ='7px';
    whiteZone.style.height ='20px';
    whiteZone.style.color = 'white';

    clockHour.appendChild(whiteZone);
}
function CreateTransformClock() {
    setInterval(() => {
        const now = new Date();

        const hours = now.getHours() * 30; // 30 градусов на каждый час
        const minutes = now.getMinutes() * 6; // 6 градусов на каждую минуту
        const seconds = now.getSeconds() * 6; // 6 градусов на каждую секунду

        // Устанавливаем поворот для каждой стрелки в зависимости от текущего времени
        hoursBox.style.transform = `rotateZ(${hours + (minutes / 12)}deg)`; // Перемещаем стрелку часов на 30 градусов за каждый час и дополнительно на (minutes / 12) градусов за каждую минуту
        minutesBox.style.transform = `rotateZ(${minutes}deg)`; // Перемещаем стрелку минут на 6 градусов за каждую минуту
        secondsBox.style.transform = `rotateZ(${seconds}deg)`; // Перемещаем стрелку секунд на 6 градусов за каждую секунду



        // Устанавливаем точку вращения в центр для каждой стрелки
        hoursBox.style.transformOrigin = 'bottom';
        minutesBox.style.transformOrigin = 'bottom';
        secondsBox.style.transformOrigin = 'bottom';
    }, 1000); // Обновляем каждую секунду
}
function drawNumbers() {
    const numbers = [3, 6, 9, 12];
    const radius = 120; // радиус циферблата
    const centerX = canvas.width / 2 ;
    const centerY = canvas.height / 2  ;
    const font = '20px Arial';

    for (let i = 0; i < 12; i += 3) {
        const angle = ((i ) * Math.PI) / 6; // угол между числами
        const x = centerX + Math.cos(angle) * radius; // x-координата числа
        const y = centerY + Math.sin(angle) * radius; // y-координата числа

        context.font = font;
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(numbers[i / 3].toString(), x, y);
    }
}

drawNumbers();





// Call drawClockFace before drawing hands

drawClockFace();
CreateClockHand();
CreateTransformClock();

setTime();
setInterval(setTime, 1000);