var images = [
    //"IMG2_5156",
    "IMG2_5157",
    //"IMG2_5167",
    "IMG2_5190",
    "IMG2_5195",
    //"IMG2_5196",
    "IMG2_5197",
    //"IMG2_5198",
    "IMG2_5220",
    "IMG2_5222",
    "IMG2_5226",
    //"IMG2_5228",
    //"IMG2_5234",
];

var imageIndex = 0;

function mod(number, divisor) {
    return ((number % divisor) + divisor) % divisor;
}

function showImage(index) {
    var photoHtml = "<img src=\"images/gallery/" + images[index] + ".jpg\">";
    $("#photo").html(photoHtml);

    var counterHtml = (index + 1) + " / " + images.length;
    $("#counter").html(counterHtml);
}

$(document).ready(function() {
    $("#bck").on('click', function() {
        imageIndex = mod(imageIndex - 1, images.length);
        showImage(imageIndex);
    });
    $("#fwd").on('click', function() {
        imageIndex = mod(imageIndex + 1, images.length);
        showImage(imageIndex);
    });

    showImage(imageIndex);
});
