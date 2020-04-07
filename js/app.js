/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sectionItemElements = document.querySelectorAll('[data-nav]');
const sectionTags = document.getElementsByTagName("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


//Helper function to find out which section is being viewed by the user at a given moment.
//Got this idea from an article online: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
const sectionInViewport = (elem) => {
  const vRect = elem.getBoundingClientRect();

  return (
    vRect.top >= 0 &&
    vRect.left >= 0 &&
    vRect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    vRect.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  );
};

//Helper function to make a menu item link active
const makeLinkActive = (secId) => {
  const navLink = document.querySelectorAll('[data-scroll]');
  for (const link of navLink) {
    if (secId === link.getAttribute('data-scroll')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const addMenus = () => {
  //Create li (menu-list items) and append it to the Ul (navabar-list)
  const ulContainer = document.getElementById('navbar__list');

  const liItem = document.createElement('li');
  //Set the text of the Menu List Items
  //TODO: Try to write an array for new Menu text items
  //liItem.innerHTML = '<a class="menu__link">Home</a>';
  //navMenu.appendChild(home);


  for(let elem of sectionTags){
    //create a list item
    let menuLi = document.createElement("li");
    //get the dat-nav attribute for the menu text name
    const menuTextName = elem.getAttribute("data-nav");

    const navItemLink = elem.getAttribute("id");
    menuLi.className = "menu__link";
    //using templates, set the liItem attributes like ahref+scrollId+data-nav
    menuLi.innerHTML = `<a href="#${elem.id}" data-scroll="${navItemLink}">${menuTextName}</a>`;

    //add menu item to the ul menubar
    ulContainer.appendChild(menuLi);
  }
};

//Scroll when clicking a menu items
const scrollToEachSection = () => {
    let anchorlinks = document.querySelectorAll('a[href^="#"]');

    for (let item of anchorlinks) {
        item.addEventListener('click', (e)=> {
            let attrVal = item.getAttribute('href');
            let target = document.querySelector(attrVal);
            target.scrollIntoView({
                behavior: 'smooth'
            })
            history.pushState(null, null, attrVal);
            e.preventDefault();
        })
    }
}

// Add class 'active' to section when near top of viewport

// This section code involves 3 steps and calls Helper Functions
//STEP 1: On Scroll event in the browser, iterate through every section
// and check if it is in the view-port. InViewport uses (getBoundingClientRect()) tp achieve this .
//STEP 2: If section on viewport, add CSS-active-section class to the current section
//and also add CSS-active-link class to the current link.else remove those active CSS classes
//STEP 3: Write CSS selector for active-link and active-section to make them appear accordingly.

const makeActive = () => {
  //window.onscroll = function () {
    for (const elem of sectionItemElements) {
      if (sectionInViewport(elem)) {
        elem.classList.add('section-current');
        makeLinkActive(elem.getAttribute('id'));
      } else {
        elem.classList.remove('section-current');
      }
    }
  //};
};


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menus and add anchor links

addMenus();

// Scroll to section on link click
scrollToEachSection();

// Set sections and menu links as Active on scrolling
document.addEventListener("scroll", function() {
  makeActive();
});
