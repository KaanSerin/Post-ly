var makeNote = $("#makeNote");
var uploadImage = $("#uploadImage");
var textAreaDraggable = '<div class="draggable"><p>Note<span class="close" onclick="this.parentElement.parentElement.remove()">X</span></p><textarea classcols="30" rows="5"></textarea></div>';

makeNote.on("click", () => {
    $("body").append(textAreaDraggable);
    $(".draggable").draggable({ cursor: "move" });
});


$(".draggable").draggable({ cursor: "move" });

// drag method for interact.js
function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener;


uploadImage.on("change", (e) => {
    console.log(e.currentTarget.files);
    var src = URL.createObjectURL(e.currentTarget.files[0]);
    var $newImg = $('<img class="userImage" src=' + src + '>').appendTo($("body"));

    interact('.userImage')
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            listeners: {
                move(event) {
                    var target = event.target
                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                    // update the element's style
                    target.style.width = event.rect.width + 'px'
                    target.style.height = event.rect.height + 'px'

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left
                    y += event.deltaRect.top

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)'

                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                }
            },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),

                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 300, height: 200 }
                })
            ],

            inertia: false
        })
        .draggable({
            listeners: { move: window.dragMoveListener },
            inertia: false,
            modifiers: [
                // interact.modifiers.restrictRect({
                //     restriction: 'parent',
                //     endOnly: true
                // })
            ]
        })

});

