var makeNote = $("#makeNote");
var uploadImage = $("#uploadImage");
var textAreaDraggable = '<div class="draggable"><p>Note<span class="close" onclick="this.parentElement.parentElement.remove()">X</span></p><textarea classcols="30" rows="10"></textarea></div>';

makeNote.on("click", () => {
    $("body").append(textAreaDraggable);
    $(".draggable").draggable({ cursor: "move" });
});

uploadImage.on("change", (e) => {
    console.log(e.currentTarget.files);
    var src = URL.createObjectURL(e.currentTarget.files[0]);
    var img = '<img class="userImage draggable" src=' + src + '>';
    // $("body").append($(img).draggable({ cursor: "move" }));
    var $newImg = $('<img class="userImage draggable" src=' + src + '>').appendTo($("body")).draggable({ cursor: "move" });
});


function changeToRed() {
    alert("asdasd");
}

$(".draggable").draggable({ cursor: "move" });
