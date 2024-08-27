const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let erasing = false;  // New variable to track erasing mode
let currentColor = 'black';  // Track the current drawing color

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    draw(event); // Draw or erase immediately when clicked
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Reset the path to stop drawing/erasing
}

function draw(event) {
    if (!drawing) return;

    // Get the canvas position relative to the viewport
    const rect = canvas.getBoundingClientRect();

    // Adjust the coordinates to get the correct position
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = document.getElementById('lineWidth').value; // Set the line width
    ctx.lineCap = 'round'; // Make the line ends rounded

    if (erasing) {
        ctx.strokeStyle = 'white'; // Erase by drawing in the background color (assuming white background)
    } else {
        ctx.strokeStyle = currentColor; // Set the line color
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor(color) {
    currentColor = color;  // Update the current color
    erasing = false;  // Turn off erasing when color is changed
}

function changeLineWidth(width) {
    ctx.lineWidth = width;
}

function toggleEraser() {
    erasing = !erasing;  // Toggle the erasing mode
}
