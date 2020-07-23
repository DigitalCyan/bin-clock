// Base Setup
const canvas = document.querySelector('#bin-clock');
const c = canvas.getContext('2d');

// Class
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Base Variables
const width = 150;
const height = 150;
let cursor = new Point(0, 0);
const matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

// Canvas
canvas.width = width;
canvas.height = height;

// Draw handling
function drawMatrix() {
    c.clearRect(0, 0, width, height);
    cursor = new Point(30, 30);
    matrix.forEach((row) => {
        cursor.y = 30;
        row.forEach((e) => {
            switch (e) {
                case 0:
                    c.fillStyle = 'rgb(25,25,25)';
                    c.fillRect(cursor.x - 10, cursor.y - 15, 20, 20);
                    break;

                case 1:
                    c.fillStyle = 'rgb(255,255,255)';
                    c.fillRect(cursor.x - 10, cursor.y - 15, 20, 20);
                    break;
            }

            cursor.y += 30;
        });
        cursor.x += 30;
    });
}

function getTime() {
    const date = new Date();
    let m = date.getMinutes();
    let h = date.getHours();
    return { hours: h, minutes: m };
}

function toBin(n) {
    let out = [];
    while (n != 0) {
        out.unshift(n % 2);
        n = Math.floor(n / 2);
    }
    return out;
}

function updateMatrix() {
    const time = getTime();
    const timeArray = [];
    timeArray.push(Math.floor(time.hours / 10));
    timeArray.push(time.hours % 10);
    timeArray.push(Math.floor(time.minutes / 10));
    timeArray.push(time.minutes % 10);
    for (let i = 0; i < 4; i++) {
        const row = toBin(timeArray[i]);
        while (row.length < 4) {
            row.unshift(0);
        }
        matrix[i] = row;
    }
    drawMatrix();
}

setInterval(() => {
    updateMatrix();
}, 1000);
