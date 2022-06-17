function assertToken(key = null, callback, err_callback = () => {}) {
    // Get token
    var token = key;
    if (key == null) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('t');
    }
    // Authenticate user
    if ((token != undefined) && (token != null)) {
        console.log('token=', token);
        const url = `/api/user/get?token=${token}`;
        console.log('api_url=', url);
        fetch(url).then(response => {response.bodyUsed ? response.json() : {}}).then(data => {
            console.log('response_data=', data);
            if ((data != undefined) && ('id' in data)) {
                callback(token);
            } else {
                err_callback();
            }
        });
    } else {
        err_callback();
    }
}

function redirect(path) {
    window.location = path;
}