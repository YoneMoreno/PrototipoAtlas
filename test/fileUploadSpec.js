function createUploadInput() {
    body = document.getElementsByTagName("BODY")[0];
    upload = document.createElement("input");
    upload.setAttribute("type", "file");
    upload.setAttribute("id", "fileUpload");
    body.appendChild(upload);
    return upload;
}
createUploadInput();

describe('fileUpload', function () {
    it('should have a file upload input, with type  and id. ', function () {
        expect(createUploadInput().nodeName).toEqual("INPUT");
        expect(createUploadInput().getAttribute("type")).toEqual("file");
        expect(createUploadInput().getAttribute("id")).toEqual("fileUpload");
    })

});




