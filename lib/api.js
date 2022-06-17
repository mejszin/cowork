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