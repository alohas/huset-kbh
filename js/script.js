let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {

    mainNav.classList.toggle('active');
});



let current_page = document.getElementsByTagName("a")

for (i = 0; i < current_page.length; i++) {
    console.log(current_page[i].href)
    var x = current_page[i].href.includes("#");
    if(x){
        current_page[i].classList.add("current-page");
    }
}
