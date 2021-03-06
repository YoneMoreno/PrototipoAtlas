function getDOM() {
    var fileUpload = document.getElementById('fileUpload');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    return [fileUpload, canvas, ctx]
}

DOM = getDOM();
fileUpload = DOM[0];
canvas = DOM[1];
ctx = DOM[2];


function readImage() {
    if (isFileToRead(this)) {
        var FR = getFileReader();
        var img = getImage();
        FR.onload = fileReaderOnLoad(img);
        readBlobAsDataURLToManageItWithHtml(FR, this.files[0]);
    }
    return [this.files, FR, img, ctx];
}

function fileReaderOnLoad(img) {
    return function (e) {
        setImageSource(img, e);
        //console.log(img.src);
        img.onload = function () {
            drawImage(img, 0, 0, 512, 512);
        };
    };
}


fileUpload.onchange = readImage;


function canvasOnClick() {
    return function (e) {
        var {x, y} = getClickCoordinates(e);
        console.log("Window x: " + x + " window y: " + y);
        ctx.beginPath();
        ctx.fillStyle = 'black';
        drawPoint(x, y, 5, 0, Math.PI * 2, ctx);
        ctx.fill();
    };
}

canvas.onclick = canvasOnClick();

function drawPoint(x, y, width, height, diameter, ctx) {
    ctx.arc(x, y, width, height, diameter);
    return {x, y, width, height, diameter};
}

function readBlobAsDataURLToManageItWithHtml(FR, file) {
    return FR.readAsDataURL(file);
}

function isFileToRead(object) {
    return object.files && object.files[0];
}

function setImageSource(img, e) {
    img.src = e.target.result;
    return img;
}

function drawImage(img, xPos, yPos, width, height) {
    let where = img;

    ctx.drawImage(where, xPos, yPos, width, height);

    return {xPos, yPos, width, height};
}


function getClickCoordinates(e) {

    var x = e.offsetX;
    var y = e.offsetY;
    return {x, y};
}


function getFileReader() {
    const FR = new FileReader();
    return FR;
}

function getImage() {
    return new Image();
}

describe('readImage', function () {
    it('should get context ', function () {
        DOM = getDOM();
        ctx = DOM[2];
        expect(ctx).not.toBeNull();
    })
    it('should return a FileReader', function () {
        const FR = getFileReader();

        expect(FR instanceof FileReader).toBe(true);
    })
    it('should return an image', function () {
        const image = getImage();

        expect(image instanceof Image).toBe(true);
    })
    it('should return return mouse coordinates', function () {
        var e = {};
        e.offsetX = 100;
        e.offsetY = 100;
        const {x, y} = getClickCoordinates(e);

        expect(x).toBe(100);
        expect(y).toBe(100);
    })
    it('should draw point on coordinates', function () {
        img = new Image();
        xPos = yPos = 0;
        width = height = 512;

        const coordinatesOfDrawnImage = drawImage(img, xPos, yPos, width, height);

        expect(coordinatesOfDrawnImage.xPos).toBe(0);
        expect(coordinatesOfDrawnImage.yPos).toBe(0);
        expect(coordinatesOfDrawnImage.width).toBe(512);
        expect(coordinatesOfDrawnImage.height).toBe(512);

    })
    it('should prevent loading files when there are none', function () {
        let files = {};
        files.files = false;
        expect(isFileToRead(files)).toBe(false);

    })
    it('should accept loading files when there are none', function () {
        let files = [];
        files.files = [];
        files.files[0] = true;
        expect(isFileToRead(files)).toBe(true);

    })
    it('should read from fileReader to convert it into HTML URL data', function () {
        let file = new Blob;
        let FileR = new FileReader();
        readBlobAsDataURLToManageItWithHtml(FileR, file);
    })
    it('should draw a point in the given coordinates', function () {
        const x = y = height = 0;
        const width = 5;
        const diameter = Math.PI * 2;
        createCanvas();
        const newX = drawPoint(x, y, width, height, diameter, ctx);


        expect(newX.x).toBe(x);
        expect(newX.y).toBe(y);
        expect(newX.width).toBe(width);
        expect(newX.height).toBe(height);
        expect(newX.diameter).toBe(diameter);

    })
    it('should have a fileUpload input before call readImage ', function () {
        body = document.getElementsByTagName("BODY")[0];
        upload = document.createElement("input");
        upload.setAttribute("type", "file");
        upload.setAttribute("id", "fileUpload");
        body.appendChild(upload);

        readImage();
        currentFileUpload = document.getElementById('fileUpload');

        expect(currentFileUpload.toString()).toBe(upload.toString());

    })

});