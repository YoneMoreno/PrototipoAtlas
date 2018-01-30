function createCanvas() {
    body = document.getElementsByTagName("BODY")[0];
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", "512");
    canvas.setAttribute("height", "512");
    canvas.setAttribute("id", "canvas");
    body.appendChild(canvas);
    return canvas;
}

createCanvas();

describe('canvasSpec', function () {
    it('should have a canvas with width and height ', function () {
        testCanvas = createCanvas();
        expect(testCanvas.nodeName).toEqual("CANVAS");
        expect(testCanvas.getAttribute("width")).toEqual("512");
        expect(testCanvas.getAttribute("height")).toEqual("512");
        expect(testCanvas.getAttribute("id")).toEqual("canvas");
    })

});
