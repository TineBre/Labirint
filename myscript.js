
//starts playing sound
function playAudio() {
    var x = document.getElementById("myAudio");
    x.play();
}
// Set up canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//disable button start
function disableButton() {
    document.getElementById("startBtn").disabled = true;
}

var motionPath = [
    { x: 234, y: 2 },
    { x: 234, y: 10 },
    { x: 250, y: 10 },
    { x: 250, y: 26 },
    { x: 282, y: 26 },
    { x: 282, y: 42 },
    { x: 298, y: 42 },
    { x: 298, y: 58 },
    { x: 282, y: 58 },
    { x: 282, y: 74 },
    { x: 314, y: 74 },
    { x: 314, y: 90 },
    { x: 346, y: 90 },
    { x: 346, y: 122 },
    { x: 330, y: 122 },
    { x: 330, y: 138 },
    { x: 282, y: 138 },
    { x: 282, y: 154 },
    { x: 298, y: 154 },
    { x: 298, y: 170 },
    { x: 250, y: 170 },
    { x: 250, y: 202 },
    { x: 234, y: 202 },
    { x: 234, y: 250 },
    { x: 218, y: 250 },
    { x: 218, y: 266 },
    { x: 202, y: 266 },
    { x: 202, y: 250 },
    { x: 154, y: 250 },
    { x: 154, y: 202 },
    { x: 138, y: 202 },
    { x: 138, y: 234 },
    { x: 122, y: 234 },
    { x: 122, y: 266 },
    { x: 170, y: 266 },
    { x: 170, y: 298 },
    { x: 138, y: 298 },
    { x: 138, y: 314 },
    { x: 154, y: 314 },
    { x: 154, y: 362 },
    { x: 218, y: 362 },
    { x: 218, y: 378 },
    { x: 250, y: 378 },
    { x: 250, y: 410 },
    { x: 234, y: 410 },
    { x: 234, y: 442 },
    { x: 266, y: 442 },
    { x: 266, y: 458 },
    { x: 250, y: 458 },
    { x: 250, y: 500 },
    { x: 234, y: 500 }
];
window.onload = function () {
    Swal.fire({
        title: 'WELCOME TO THE SPACE MAZE!',
        html: 'Click "START" and get to the air lock!',
        imageUrl: 'slike/airlock.gif',
        imageWidth: 400,
        imageHeight: 280,
    })
};
var object = {
    x: motionPath[0].x,
    y: motionPath[0].y,
    speed: 0.8,
    currentTarget: 1,
    direction: "back"
};
function startAnimation() {

    function drawObject() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        motionPath.splice(object.currentTarget, 0, { x: object.x, y: object.y });

        ctx.beginPath();
        ctx.moveTo(motionPath[0].x, motionPath[0].y);
        for (var i = 1; i <= object.currentTarget + 1; i++) {
            ctx.lineTo(motionPath[i - 1].x, motionPath[i - 1].y);
        }
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.drawImage(img, object.x - 8, object.y - 8, 15, 15);

        motionPath.splice(object.currentTarget, 1);

    }


    function updatePosition() {
        var target = motionPath[object.currentTarget];
        var dx = target.x - object.x;
        var dy = target.y - object.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (dx >= 0 && dy == 0) {
            object.direction = "right";
        } else if (dx <= 0 && dy == 0) {
            object.direction = "left";
        } else if (dy >= 0 && dx == 0) {
            object.direction = "front";
        }
        else {
            object.direction = "back";
        }
        if (distance < object.speed) {
            object.x = target.x;
            object.y = target.y;
            object.currentTarget = (object.currentTarget + 1) % motionPath.length;
        } else {
            object.x += dx / distance * object.speed;
            object.y += dy / distance * object.speed;
        }
        // Stop the animation if the object has reached a certain point
        if (object.x >= 234 && object.y >= 500) {

            let timerInterval
            Swal.fire({
                title: 'He made it',
                html: 'The maze will automatically relode in <b></b> seconds.',
                timer: 5000,
                timerProgressBar: true,
                imageUrl: 'slike/image.jpg',
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Math.ceil(Swal.getTimerLeft() / 1000)
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
            cancelAnimationFrame(animationID);
        }
    }

    // Define a function to animate your object
    function animate() {
        updatePosition();
        drawObject();
        requestAnimationFrame(animate);
    }
    // Start the animation loop
    animate();

}

var img = new Image();
var imageIndex = 1;
function changeImage() {
    switch (object.direction) {
        case "front":
            img.src = 'slike/front' + imageIndex + '.png';
            break;
        case "left":
            img.src = 'slike/left' + imageIndex + '.png';
            break;
        case "back":
            img.src = 'slike/back' + imageIndex + '.png';
            break;
        case "right":
            img.src = 'slike/right' + imageIndex + '.png';
            break;
    }
    window.imageIndex = (imageIndex % 3) + 1;
}
setInterval(changeImage, 120);

var startButton = document.getElementById('startBtn');
startButton.addEventListener('click', startAnimation);

