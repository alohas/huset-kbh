let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {

    mainNav.classList.toggle('active');
});



let current_page = document.getElementsByTagName("a")

for (i = 0; i < current_page.length; i++) {
    //console.log(current_page[i].href)
    var x = current_page[i].href.includes("#");
    if(x){
        current_page[i].classList.add("current-page");
    }
}






/////////////////////////////////////


let myLink = "http://mediakutka.com/srotas/wp-json/wp/v2/";
const template = document.querySelector("template").content;
const parent = document.querySelector("div.event-list");
const urlParms = new URLSearchParams(window.location.search);
const catID = urlParms.get("cat");
const catnav = document.querySelector(".navcat");


function loadData(link) {
    fetch(link + "event?_embed").then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(object => {
        console.log(object);
        //clone
        const clone = template.cloneNode(true);
        //populate
        clone.querySelector("a").href = "details.html?eventID=" + object.id;
        clone.querySelector("h3.event_name").textContent = object.title.rendered;
        clone.querySelector("img.thumbnail").src = object._embedded["wp:featuredmedia"][0].source_url;
        clone.querySelector("h4.date").textContent = "Date: " + object.event_date;
        console.log(object.event_date)

        parent.appendChild(clone);

    });
}



function loadCats() {
    fetch(myLink + "categories?per_page=15").then(e => e.json()).then(buildCatMenu);
}

function loadByCat(cat) {
    fetch(myLink + "event?categories=" + cat + "&_embed").then(e => e.json()).then(show);
}

function loadAll() {
    fetch(myLink + "event?_embed").then(e => e.json()).then(show);
}

loadCats();

if (catID) {
    loadByCat(catID)
} else {
    loadAll()
}

function buildCatMenu(data) {
    data.forEach(cat => {
        const newA = document.createElement("a");
        newA.textContent = cat.name;

        newA.href = "?cat=" + cat.id;
        catnav.appendChild(newA);
    })
}
