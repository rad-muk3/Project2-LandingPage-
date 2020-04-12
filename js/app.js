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
const divElem = document.getElementById("topBtn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description sectionInViewport
 * @description Helper function to find out which section is being viewed by the user at a given moment.
 * @description Got this idea from an article online: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 * @param {elem} sectionId
 * @returns {vRect} the viewport of the section element
 */
const sectionInViewport = (elem) => {

  const vRect = elem.getBoundingClientRect();
  return (
    vRect.top >= -200 &&
    vRect.left >= 0 &&
    vRect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    vRect.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * @description makeLinkActive
 * @description Helper function to make a menu item link active for the current-section on viewport
 * @param {secId} sectionId
 */
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
 * @description scrollToViewBtn
 * @description When the user scrolls down 20px from the top of the document, show the button
 *
 */
const scrollToViewBtn = () => {
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      divElem.style.display = "block";
    } else {
      divElem.style.display = "none";
    }


  };
};

/**
 * @description scrolltoTop
 * @description When the user clicks the button scroll to the top of the page
 *
 */
const scrolltoTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description Add Menu Items to the Navigation Bar
 *
 */

const addMenus = () => {

  //Create li (menu-list items) and append it to the Ul (navabar-list)
  const ulContainer = document.getElementById('navbar__list');

  const liItem = document.createElement('li');

  // TODO: Write an array for new Menu Text Item to be appended to the Navbar

  for (let elem of sectionTags) {

    //get the dat-nav attribute for the menu text name
    const menuTextName = elem.getAttribute("data-nav");
    const navItemLink = elem.getAttribute('id');
    //create a list item
    let menuLi = document.createElement('li');
    menuLi.className = 'menu__link';
    //using templates, set the liItem attributes like ahref+scrollId+data-nav
    menuLi.innerHTML = `<a href="#${elem.id}" data-scroll="${navItemLink}">${menuTextName}</a>`;
    //add menu item to the ul menubar
    ulContainer.appendChild(menuLi);
  }
};

/**
 * @description Scroll to the corresponding section on top of viewport when clicking a menu items
 *
 */
const scrollToEachSection = () => {

  let anchorlinks = document.querySelectorAll('a[href^="#"]');

  for (let item of anchorlinks) {

    item.addEventListener('click', (e) => {

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

/**
 * @description Add class 'active' to section when near top of viewport
 * @description This section code involves 3 steps and calls Helper Functions
 * @description STEP 1: On Scroll event in the browser, iterate through every section.and check if it is in the view-port. InViewport uses (getBoundingClientRect()) tp achieve this .
 * @description STEP 2: If section on viewport, add CSS-active-section class to the current section and also add CSS-active-link class to the current link.else remove those active CSS classes
 * @description STEP 3:  Write CSS selector for active-link and active-section to make them appear accordingly.
 */

const makeActive = () => {

  for (const elem of sectionItemElements) {

    if (sectionInViewport(elem)) {

      elem.classList.add('section-current');
      makeLinkActive(elem.getAttribute('id'));

    } else {

      elem.classList.remove('section-current');
    }
  }


};

/**
 * @description collapseSection
 * @description Makes Section Collapsible
 *
 */
const collapseSection = () => {
  const coll = document.getElementsByClassName("collapsible");

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("current");
      let content = this.nextElementSibling;
      if (content.style.display === "none") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  }
};

/**
 * @description showTopBtn
 * @description Create a Button and set its text.
 * @description Append this button the div element inside the Footer Section.
 * @description Style the button and position it on the right corner of the Footer.
 * @description Used W3Schools Tutorial for this functionality
 */
const showTopBtn = () => {

  const btn = document.createElement('BUTTON');
  const btnText = document.createTextNode("TOP");

  btn.appendChild(btnText);
  divElem.appendChild(btn);

  // Scroll from top down to view the button
  scrollToViewBtn();

  // When the user clicks on the button, scroll to the top of the document
  btn.onclick = () => {
    scrolltoTop();

  }

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

//Collapse Each Section
collapseSection();

//Add a scrollTotop button on the page
showTopBtn();
