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

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

// Adds a random name to the page.
function getRandomNameUsingArrowFunctions() {
    fetch('/data')
    .then(response => response.text())
    .then((name) => {
        document.getElementById('name-container').innerText = name;
    });
}

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

// 
function receiveJson() {
    fetch('/json')
        .then(response => response.text()) 
        .then((json) => {
            const commentContainer = document.getElementById('comment');
            var commentsObj = JSON.parse(json);
            console.log(commentsObj);
            commentContainer.innerHTML = commentsObj;
        console.log(json);
    });
}

receiveJson();
setInterval(randomizeImage, 4000);
setInterval(addRandomGreeting, 4000);
setInterval(getRandomNameUsingArrowFunctions, 4000);
