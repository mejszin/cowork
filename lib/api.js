function getUserProjects() {
    return new Promise(resolve => {
        (async () => {
            const url = `/api/user/projects/list?token=${token}`;
            fetch(url).then(response => response.json()).then(data => {
                resolve(data);
            });
        })()
    });
}

function getProject(id) {
    return new Promise(resolve => {
        (async () => {
            const url = `/api/project/get?token=${token}&project_id=${id}`;
            fetch(url).then(response => response.json()).then(data => {
                resolve(data);
            });
        })()
    });
}

function getProjectItems(id) {
    return new Promise(resolve => {
        (async () => {
            const url = `/api/project/items/list?token=${token}&project_id=${id}`;
            fetch(url).then(response => response.json()).then(data => {
                resolve(data);
            });
        })()
    });
}

function setProjectItem(props) {
    console.log(props);
    const promise = new Promise(resolve => {
        (async () => {
            var url = `/api/project/items/add?token=${token}&project_id=${id}`;
            console.log(url);
            console.log(Object.keys(props));
            Object.keys(props).forEach(key => {
                url += `&${key}=${encodeURIComponent(props[key])}`
            });
            console.log(url);
            fetch(url).then(response => response.json()).then(data => {
                resolve(data);
            });
        })
    })
    promise.catch((error) => {
        console.error(error)
    })
    return promise;
}