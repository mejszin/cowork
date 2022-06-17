const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 84;

const VERSION = 'v0.0.1';

const fs = require('fs');
const project_data_path = './data/projects.json';
const user_data_path = './data/users.json';
var project_data = fs.existsSync(project_data_path) ? JSON.parse(fs.readFileSync(project_data_path)) : {};
var user_data = fs.existsSync(user_data_path) ? JSON.parse(fs.readFileSync(user_data_path)) : {};

const methods = {};

methods.randomString = (length = 8) => {
    var char_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < length; i++) {
        id += char_set.charAt(
            Math.floor(Math.random() * char_set.length)
        );
    }
    return id;
}

methods.writeUsers = () => {
    fs.writeFileSync(user_data_path, JSON.stringify(user_data));
}

methods.writeProjects = () => {
    fs.writeFileSync(project_data_path, JSON.stringify(project_data));
}

methods.isToken = (token) => {
    return (token in user_data);
}

methods.isUser = (user_id) => {
    // TODO:
    return true;
}

methods.isProject = (project_id) => {
    return (project_id in project_data);
}

methods.isProjectUser = (token, project_id) => {
    return (
        methods.isToken(token)
        && methods.isProject(project_id)
        && (user_data[token].id in project_data[project_id].users)
        && (project_id in user_data[token].projects)
    );
}

methods.createUser = (alias) => {
    var token = methods.randomString();
    var user_id = methods.randomString();
    user_data[token] = {
        id: user_id,
        alias: alias,
        projects: []
    }
    return token;
}

methods.createProject = (alias) => {
    var project_id = methods.randomString();
    project_data[project_id] = {
        id: project_id,
        alias: alias,
        users: [],
        items: []
    }
    return project_id;
}

methods.createItem = (token, project_id, props) => {
    var item_id = methods.randomString();
    project_data[project_id].items[item_id] = {
        id: item_id,
        props: props,
        author: {
            id: user_data[token].id,
            alias: user_data[token].alias
        }
    }
    return item_id;
}

methods.addProjectUser = (token, project_id) => {
    if (methods.inToken(token) && (project_id in project_data)) {
        user_data[token].projects.add(project_id);
        project_data[project_id].users.add(user_data[token].id);
        return true;
    } else {
        return false;
    }
}

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

app.get('/user/new', (req, res) => {
    const { alias } = req.query;
    if (alias != undefined) {
        var token = methods.createUser(alias);
        methods.writeUsers();
        // Success
        res.status(200).send({ token: token });
    } else {
        // Bad request
        res.status(400).send();
    }
});

app.get('/user/projects/add', (req, res) => {
    const { token, project_id } = req.query;
    if (methods.isToken(token)) {
        var success = methods.addProjectUser(token, project_id);
        if (success) {
            methods.writeUsers();
            methods.writeProjects();
            // Success
            res.status(200).send({ success: true });
        } else {
            // Bad request
            res.status(400).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/user/projects/list', (req, res) => {
    const { token } = req.query;
    if (methods.isToken(token)) {
        // Success
        res.status(200).send(user_data[token].projects);
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/project/new', (req, res) => {
    const { token, alias } = req.query;
    if (methods.isToken(token)) {
        if (alias != undefined) {
            var project_id = methods.createProject(alias);
            methods.addProjectUser(token, project_id);
            methods.writeProjects();
            methods.writeUsers();
            // Success
            res.status(200).send({ id: project_id });
        } else {
            // Bad request
            res.status(400).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/project/items/add', (req, res) => {
    const { token, project_id } = req.query;
    var props = req.query;
    delete props[token];
    delete props[project_id];
    if (methods.isToken(token)) {
        if (project_id in project_data) {
            var item_id = methods.createItem(token, project_id, props);
            methods.writeProjects();
            // Success
            res.status(200).send({ id: item_id });
        } else {
            // Bad request
            res.status(400).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/project/items/list', (req, res) => {
    const { token, project_id } = req.query;
    if (methods.isToken(token)) {
        if (project_id in project_data) {
            // Success
            res.status(200).send(project_data[project_id].items);
        } else {
            // Bad request
            res.status(400).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));