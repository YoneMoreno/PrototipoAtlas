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
        uploadInput = createUploadInput();

        expect(uploadInput.nodeName).toEqual("INPUT");
        expect(uploadInput.getAttribute("type")).toEqual("file");
        expect(uploadInput.getAttribute("id")).toEqual("fileUpload");
    })

});




