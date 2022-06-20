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
    return new Promise(resolve => {
        (async () => {
            var url = `/api/project/items/add?token=${token}&project_id=${id}`;
            Object.keys(props).forEach(function(key) {
                url += `&${key}=${encodeURIComponent(props[key])}`
            });
            console.log(url);
            fetch(url).then(response => response.json()).then(data => {
                resolve(data);
            });
        })
    })
}