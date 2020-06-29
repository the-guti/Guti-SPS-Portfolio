// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Adds a random greeting to the page.
function addRandomGreeting() {
    const greetings = ['Welcome', 'Bienvenido', '欢迎', 'Bienvenue', 'Willkommen', 'Benvenuto', 'Bem-vinda', 'желанный'];

    // Pick a random greeting.
    const greeting = randomPicker(greetings);

    // Add it to the page.
    const greetingContainer = document.getElementById('greeting-container');
    greetingContainer.innerText = greeting;
}

// Adds a random name to the page.
function getRandomNameUsingArrowFunctions() {
    fetch('/data')
    .then(response => response.text())
    .then((name) => {
        document.getElementById('name-container').innerText = name;
    });
}

// Create cards and fill with comment information, based on Dark card https://getbootstrap.com/docs/4.5/components/card/
function createCommentCard(comment){
    const cardElement = document.createElement('div');
    cardElement.className = 'card text-white bg-dark mb-3';
    cardElement.style.maxWidth = '18rem';

    // Create Header Element Card
    const cardHeaderElement = document.createElement('div');
    cardHeaderElement.className = 'card-header';

    // Convert timestamp to date
    var formattedDate = new Date(comment.timestamp).toLocaleDateString("en-US");
    cardHeaderElement.innerText = formattedDate; 

    cardElement.appendChild(cardHeaderElement);

    // Create Body Element Card
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';

    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.innerText  = comment.name;
    cardBodyElement.appendChild(cardTitleElement);

    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.innerText  = comment.comment;
    cardBodyElement.appendChild(cardTextElement);
    
    cardElement.appendChild(cardBodyElement);
    
    return cardElement;
}

// Chose a random image from array and place it in html
function randomizeImage() {
    // The images directory contains 11 images, so generate a random index between 0 - 10
    const mountains = ['cerro_negro', 'chichimeco', 'iztaccihuatl', 'malinche', 'nevado_de_colima', 'nevado_de_toluca', 
        'pico_de_orizaba', 'popocatepetl', 'teyotl', 'volcan_chichon', 'volcan_tacana'];

    const imgUrl = 'assets/images/mountains/' + randomPicker(mountains) + '.jpg';
    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    imgElement.className = "images";

    const imageContainer = document.getElementById('random-image-container');
    // Remove the previous image.
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imgElement);
}

// Returns a random item from the array
function randomPicker(items) {
    return items[Math.floor(Math.random() * items.length)];
}

// Get the comments by fetching to server and add them to html
function receiveComments() {
    fetch('/comments')
        .then(response => response.json()) 
        .then((comments) => {
            const commentsListElement = document.getElementById('comments-container');
            comments.forEach((comment) => {
                commentsListElement.appendChild(createCommentCard(comment));
            })
        }
    );
}

receiveComments();
setInterval(randomizeImage, 4000);
setInterval(addRandomGreeting, 4000);
setInterval(getRandomNameUsingArrowFunctions, 4000);
