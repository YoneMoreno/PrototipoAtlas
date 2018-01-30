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

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        var img = new Image();
        FR.onload = function(e) {
            img.src = e.target.result;
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 512, 512);
            };
        };
        FR.readAsDataURL( this.files[0] );
    }
    return [this.files, FR, img, ctx];
}

fileUpload.onchange = readImage;


describe('readImage', function () {
    it('should get context ', function () {
        DOM = getDOM();
        ctx = DOM[2];
        expect(ctx).not.toBeNull();
    })
    it('should get at least one file ', function () {

    })

});