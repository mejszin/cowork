function onKeyUp(event) {
    if ((event.keyCode == 13) && (event.shiftKey == false)) {
        document.getElementById('text-input').value = '';
    }
}

function onKeyDown(event, callback) {
    if ((event.keyCode == 13) && (event.shiftKey == false)) {
        var input = document.getElementById('text-input');
        if (input.value.indexOf('/image') == 0) {
            // Send image item
            var url = input.value.split(' ')[1];
            var props = { type: 'image', src: url };
            callback(props);
            return
        }
        // Send text item
        var props = { type: 'text', body: input.value };
        callback(props);
        return
    }
}