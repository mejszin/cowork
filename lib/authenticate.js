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
        fetch(url).then(response => {
            console.log('response=', response);
            return (response.status == 200) ? response.json() : {};
        }).then(data => {
            console.log('response_data=', data);
            if ('id' in data) {
                callback(token);
                return true;
            } else {
                err_callback();
                return false;
            }
        });
    } else {
        err_callback();
        return false;
    }
}

function redirect(path = '/') {
    window.location = path;
}