let width = 600
let height = 300

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function draw() {

    width = document.querySelector('input#canvas-width').value
    height = document.querySelector('input#canvas-height').value
    canvas.width = width; 
    canvas.height = height; 

    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(1, 1, width-2, height-2);

    let imageData = ctx.getImageData(0, 0, width, height)

    horizontalLineOnImageData(imageData, "#d18f1d", 1)
    horizontalLineOnImageData(imageData, "#ffcb33", 2)
    horizontalLineOnImageData(imageData, "#ffcb33", 3)
    horizontalLineOnImageData(imageData, "#ac6825", 4)
    horizontalLineOnImageData(imageData, "#ac6825", 5)
    horizontalLineOnImageData(imageData, "#000000", 6)

    horizontalLineOnImageData(imageData, "#d18f1d", height)
    horizontalLineOnImageData(imageData, "#ffcb33", height - 1)
    horizontalLineOnImageData(imageData, "#ffcb33", height - 2)
    horizontalLineOnImageData(imageData, "#ac6825", height - 3)
    horizontalLineOnImageData(imageData, "#ac6825", height - 4)
    horizontalLineOnImageData(imageData, "#000000", height - 5)

    verticalLineOnImageData(imageData, "#ac6825", 0)
    verticalLineOnImageData(imageData, "#d18f1d", 1)
    verticalLineOnImageData(imageData, "#ffcb33", 2)
    verticalLineOnImageData(imageData, "#ffcb33", 3)
    verticalLineOnImageData(imageData, "#d18f1d", 4)
    verticalLineOnImageData(imageData, "#000000", 5)

    verticalLineOnImageData(imageData, "#ac6825", width - 1)
    verticalLineOnImageData(imageData, "#d18f1d", width - 2)
    verticalLineOnImageData(imageData, "#ffcb33", width - 3)
    verticalLineOnImageData(imageData, "#ffcb33", width - 4)
    verticalLineOnImageData(imageData, "#d18f1d", width - 5)
    verticalLineOnImageData(imageData, "#000000", width - 6)
    
    ctx.putImageData(imageData, 0, 0);

    let corner = document.querySelector('img.corner-tile')
    ctx.drawImage(corner, 0, 0)
    let corner2 = document.querySelector('img.corner-tile2')
    ctx.drawImage(corner2, width-8, 0)
    let corner3 = document.querySelector('img.corner-tile3')
    ctx.drawImage(corner3, 0, height-8)
    let corner4 = document.querySelector('img.corner-tile4')
    ctx.drawImage(corner4, width-8, height-8)


    let fontSize = document.querySelector('input#font-size').value
    ctx.font = `${fontSize}px PixelEmulator`;
    ctx.fillStyle = "#ffffff";
    let text = document.querySelector('textarea.text-input').value
    let textXoffset = document.querySelector('input#text-x-offset').value
    let textYoffset = document.querySelector('input#text-y-offset').value
    ctx.fillText(text, textXoffset, textYoffset);

}

function verticalLineOnImageData(imageData, color, x) {
    let x2 = (4*width*(height-2)) + (x*4)
    let c = hexToRgb(color)
    for (let i = (x*4)+(width*4); i < x2; i+=(width*4)) {
        imageData.data[i] = c.r
        imageData.data[i+1] = c.g
        imageData.data[i+2] = c.b
        imageData.data[i+3] = 255
    }
}

function horizontalLineOnImageData(imageData, color, y) {
    let x1 = 1*4 + ((y-1)*width*4)
    let x2 = (width-1)*4 + ((y-1)*width*4)
    let c = hexToRgb(color)
    for (let i = x1; i < x2; i+=4) {
        imageData.data[i] = c.r
        imageData.data[i+1] = c.g
        imageData.data[i+2] = c.b
        imageData.data[i+3] = 255
    }
}

function horizontalLine(color, y) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(1, y);
    ctx.lineTo(width-1, y);
    ctx.closePath();
    ctx.stroke();
}

let imageLoad = 0
function handleImageLoad() {
    imageLoad++
    if (imageLoad >= 4) {
        setTimeout(draw, 500)
    }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
