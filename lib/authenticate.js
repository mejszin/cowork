var token;
var project_id;
var user_id;

function assertToken(key = null, callback, err_callback = () => {}) {
    // Set token variable
    if (key == null) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('t');
    } else {
        token = key;
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
                user_id = data.id;
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

function assertProject(key, callback, err_callback) {
    // Set project_id variable
    if (key == null) {
        const urlParams = new URLSearchParams(window.location.search);
        project_id = urlParams.get('p');
    } else {
        project_id = key;
    }
    // Attempt to get project
    getProject(project_id).then(data => {
        if ('id' in data) {
            callback();
        } else {
            err_callback();
        }
    });
}

function redirect(path = '/') {
    window.location = path;
}