function getDOM(){
    var fileUpload = document.getElementById('fileUpload');
    var canvas  = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    console.log(ctx);
    return [fileUpload, canvas, ctx]
}
getDOM();

describe('readImage', function () {
    it('should have fileUpload, canvas and context ', function () {
        DOM = getDOM();
        ctx = DOM[2];
        expect(ctx).not.toBeNull();
    })

});