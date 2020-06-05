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

/**Generates a URL for a random image in the images directory and adds an img
 * element with that URL to the page. */
function randomizeImage() {
  // The images directory contains 11 images, so generate a random index between 1 - 11
    const mountains = ['cerro_negro', 'chichimeco', 'iztaccihuatl', 'malinche', 'nevado_de_colima', 'nevado_de_toluca', 
  'pico_de_orizaba', 'popocatepetl', 'teyotl', 'volcan_chichon', 'volcan_tacana'];
    const imageIndex = Math.floor(Math.random() * mountains.length);
    const imgUrl = 'assets/images/mountains/' + mountains[imageIndex] + '.jpg';

  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('random-image-container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
}

// Adds a random greeting to the page.
function addRandomGreeting() {
  const greetings =
      ['Welcome', 'Bienvenido', '欢迎', 'Bienvenue', 'Willkommen', 'Benvenuto', 'Bem-vinda', 'желанный'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

setInterval(randomizeImage, 4000);
setInterval(addRandomGreeting, 4000);