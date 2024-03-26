import { makeNav } from "./modules/nav.js";
import navItemsObject from "./modules/navitems.js";

const root = document.querySelector(".site-wrap");
const nytapi = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM"; // note this should be your API key

makeNav();

const categories = navItemsObject.map((item) => item.link);
const navItems = document.querySelectorAll("nav li");

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => {
        fetchArticles(categories[i]);
    });
}

function fetchArticles(section) {
    section = section.substring(1);
    if (!localStorage.getItem(section)) {
        console.log("section not in local storage, fetching");
        fetch(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
        )
            .then((response) => response.json())
            .then((data) => setLocalStorage(section, data))
            .catch((error) => {
                console.warn(error);
            });
    } else {
        console.log("section in local storage");
        renderStories(section);
    }
}

function setLocalStorage(section, myJson) {
    console.log(myJson);
    localStorage.setItem(section, JSON.stringify(myJson));
    renderStories(section);
}

function setActiveTab(section) {
    const activeTab = document.querySelector("a.active");
    if (activeTab) {
        activeTab.classList.remove("active");
    }
    const tab = document.querySelector(`nav li a[href="#${section}"]`);
    tab.classList.add("active");
}

function sortAndFilter(items, section) {
    let results = items.filter(
        (item) => item.section && item.section == section,
    );
    // Sort Ascending
    //results.sort((a, b) => (a.title < b.title ? 1 : -1));
    // Sort Descending
    results.sort((a, b) => (a.title < b.title ? -1 : 1));
    return results;
}
function clearStoryElement() {
    while (root.childNodes[2]) {
        root.childNodes[2].remove();
    }
}

function appendStoryEntries(results) {
    results.forEach((story) => {
        let storyEl = document.createElement("div");
        storyEl.className = "entry";
        storyEl.innerHTML = `
            <img src="${story.multimedia ? story.multimedia[0].url : ""}" 
            alt="${story.title}" />
            <div>
              <h3><a target="_blank" href="${story.url}">${story.title}</a></h3>
              <p>${story.abstract}</p>
              <p>${story.section}</p>
            </div>
            `;
        root.insertBefore(storyEl, root.childNodes[2]);
    });
}

function renderStories(section) {
    setActiveTab(section);
    let data = JSON.parse(localStorage.getItem(section));

    if (data) {
        let results = data.results;
        let sortButton = document.querySelector("#request-sort");
        sortButton.setAttribute("style", "display: inline-block");
        sortButton.classList.add("visible");
        sortButton.addEventListener("click", () => {
            clearStoryElement();
            let sorted = sortAndFilter(results, section);
            appendStoryEntries(sorted);
        });
        // let results = data.results.filter(
        //     (item) => item.section && item.section == section,
        // );

        // Sort Ascending by default
        results.sort((a, b) => (a.title < b.title ? 1 : -1));
        appendStoryEntries(results);
    } else {
        console.log("data not ready yet");
    }
}

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
