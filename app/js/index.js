import { makeNav } from './modules/nav.js';

makeNav();

// const nav = document.querySelector('.main-menu');
// const navList = document.createElement('ul');

// navItemsObject.forEach((item) => {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `<a href="${item.link}">${item.label}</a>`;
//     navList.appendChild(listItem);
// });

// nav.append(navList);
// //

// const nav = document.querySelector('.main-menu');
// const span = nav.querySelector('#main-nav');

// const markup = `
//     <ul>
//       ${navItemsObject
//           .map((item) => `<li><a href="${item.link}">${item.label}</a></li>`)
//           .join('')}
//     </ul>
//     `;

// console.log(markup);

// nav.querySelector('#main-nav').innerHTML = markup;
