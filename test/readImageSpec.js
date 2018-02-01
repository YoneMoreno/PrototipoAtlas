function getDOM(){
    var fileUpload = document.getElementById('fileUpload');
    var canvas  = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    return [fileUpload, canvas, ctx]
}
DOM = getDOM();
fileUpload = DOM[0];
canvas = DOM[1];
ctx = DOM[2];

function fileReaderOnLoad(img) {
    return function (e) {
        img.src = e.target.result;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 512, 512);
        };
    };
}

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= getFileReader();
        var img = getImage();
        FR.onload = fileReaderOnLoad(img);
        FR.readAsDataURL( this.files[0] );
    }
    return [this.files, FR, img, ctx];
}

fileUpload.onchange = readImage;

canvas.onclick = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
};


function getFileReader() {
    const FR= new FileReader();
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
        const FR =  getFileReader();

        expect(FR instanceof FileReader).toBe(true);
    })
    it('should return an image', function(){
        const image = getImage();

        expect(image instanceof Image).toBe(true);
    })
    // it('should get at least one file ', function () {
    //
    //     spyOn(window, 'readImage');
    //
    //     fileUpload.onchange();
    //
    //     expect(window.readImage).toHaveBeenCalled();
    //
    // })

});