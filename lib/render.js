function renderTextCard(props, is_to = false) {
    var card_list = document.getElementById('card-list');
    var card_div = document.createElement('div');
    card_div.classList.add('card', 'my-2', 'mx-4', is_to ? 'to' : 'from');
    card_list.appendChild(card_div);
    var card_content_div = document.createElement('div');
    card_content_div.classList.add('card-content', 'p-2');
    card_div.appendChild(card_content_div);
    var content_div = document.createElement('div');
    content_div.classList.add('content');
    card_content_div.appendChild(content_div);
    content_div.innerText = props.body;
}

function renderImageCard(props) {
    var card_list = document.getElementById('card-list');
    var card_div = document.createElement('div');
    card_div.classList.add('card', 'my-2', 'mx-4');
    card_list.appendChild(card_div);
    var card_image_div = document.createElement('div');
    card_image_div.classList.add('card-image');
    card_div.appendChild(card_image_div);
    var image_figure = document.createElement('figure');
    image_figure.classList.add('image');
    card_image_div.appendChild(image_figure);
    var image = document.createElement('img');
    image.src = props.src;
    image.alt = props.alt;
    image_figure.appendChild(image);
}