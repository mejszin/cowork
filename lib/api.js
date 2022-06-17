function getUserProjects(token) {
    // Authenticate user
    if ((token != undefined) && (token != null)) {
        console.log('token=', token);
        const url = `/api/user/projects/list?token=${token}`;
        console.log('api_url=', url);
        fetch(url).then(response => {
            console.log('response=', response);
            return (response.status == 200) ? response.json() : {};
        }).then(data => {
            console.log('response_data=', data);
            return data;
        });
    } else {
        return [];
    }
}

function redirect(path) {
    window.location = path;
}