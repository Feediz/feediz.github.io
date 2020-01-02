/******************************************
project 2 - List Filter and Pagination
******************************************/

// this will hold all the students info that's inside the ul element
const page = document.querySelector(".page");

// get list of all students on the page
let studentList_ul = document.querySelectorAll(".student-list li");

// this configures how many items to show per page
const itemsPerPage = 10;

// no results div
const noResultsDisplay = document.createElement("div");
noResultsDisplay.className = "noResults";
noResultsDisplay.textContent = "No Results";
noResultsDisplay.style.display = "none";
page.appendChild(noResultsDisplay);

/**
 * showPage()
 * @parameters list, page
 * @return will show the records that fall within the supplied page range
 */
const showPage = (list, page) => {
  // index of starting record to show
  let startIndex = page * itemsPerPage - itemsPerPage;

  // index of last record to show
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    }
  }
};

/**
 * appendPageLinks()
 * @return {div element} will set up pagination navigation and return it
 */
const appendPageLinks = list => {
  const createElement = (elementName, property, value, className = "") => {
    const element = document.createElement(elementName);
    if (value !== "") element[property] = value;

    if (className !== "") {
      element["className"] = className;
    }

    return element;
  };

  // remove/resetting pagination first
  let currentPagination = document.querySelector(".pagination");
  if (currentPagination) {
    let childLinkItems = currentPagination.lastElementChild;
    currentPagination.parentNode.removeChild(currentPagination);
  } else {
    list = studentList_ul;
  }

  // start setting up pagination links
  let numPages;
  if (list !== undefined && list.length > 0) {
    numPages = Math.ceil(list.length / itemsPerPage);
  } else {
    numPages = Math.ceil(studentList_ul.length / itemsPerPage);
  }

  // create div element
  const div = document.createElement("div");
  div.className = "pagination";
  page.appendChild(div);

  // creating ul element
  const ul = document.createElement("ul");
  div.appendChild(ul);

  // create pagination links
  for (let i = 0; i < numPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i + 1;
    if (i === 0) {
      a.className = "active";
    }
    li.appendChild(a);

    // handle page click event
    a.addEventListener("click", e => {
      // show/hide items on the page
      showPage(list, parseInt(e.target.textContent));

      // grab all anchor tags to modify class name
      const anchorTags = document.querySelectorAll("a");
      for (let i = 0; i < anchorTags.length; i++) {
        anchorTags[i].classList.remove("active");
      }
      e.target.className = "active";

      // update h2 title to show page number
      var h2Title = document.getElementsByTagName("h2")[0];
      h2Title.innerHTML = "STUDENTS (Page " + e.target.textContent + ")";
    });
  } // -/end for loop
};

/*
/**
 * addSearchFeature()
 * @return  will dynamically add a search box, and handle when user searches
 */
const addSearchFeature = () => {
  // access page header
  const pageHeader = document.querySelector(".page-header");

  // create div element
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  pageHeader.appendChild(searchDiv);

  // create input search box
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search by name and email..";
  searchDiv.appendChild(searchInput);

  // create search button
  // commenting this out as I made the search box filter as you type
  // const searchButton = document.createElement("button");
  //searchButton.textContent = "Search";
  //searchDiv.appendChild(searchButton);

  // handle when user searches in real time
  searchInput.addEventListener("input", e => {
    let searchedTerm = searchInput.value;
    let list = studentList_ul;
    let searchResultArray = new Array();

    //console.log("you typed: " + searchedTerm.length);
    if (searchedTerm.length === 0) {
      // filter items on page when loading first time
      showPage(list, 1);

      // update h2 title to show page number
      let h2Title = document.getElementsByTagName("h2")[0];
      h2Title.innerHTML = "STUDENTS (page 1)";

      // add links to the page
      appendPageLinks(list);
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].style.display = "none";
        let studentName = list[i].querySelector("h3").textContent;
        let studentEmail = list[i].querySelector("span").textContent;

        // check if the searched term exists in the list
        if (
          studentName.includes(searchedTerm) ||
          studentEmail.includes(searchedTerm)
        ) {
          // putting together an array to send to appendPageLinks later
          searchResultArray.push(list[i]);
          list[i].style.display = "block";
        } else if (searchedTerm.trim() == "") {
          // filter items on page when loading first time
          showPage(studentList_ul, 1);

          // add links to the page
          appendPageLinks(studentList_ul);
        }
      } // -//end for

      if (searchResultArray === undefined || searchResultArray.length == 0) {
        // show no results
        noResultsDisplay.textContent =
          "No results for the term: " + searchedTerm;
        noResultsDisplay.style.display = "block";

        showPage(searchResultArray, 1);
        appendPageLinks(searchResultArray);
      } else {
        // hide no results
        noResultsDisplay.style.display = "none";

        // after user types search keyword update pagination navigation
        appendPageLinks(searchResultArray);

        // after user types search keyword update search results
        showPage(searchResultArray, 1);
      }
    }
  });
};

// add search box to dom
addSearchFeature();

// filter items on page when loading first time
showPage(studentList_ul, 1);

// update h2 title to show page number
let h2Title = document.getElementsByTagName("h2")[0];
h2Title.innerHTML = "STUDENTS (page 1)";

// add links to the page
appendPageLinks(studentList_ul);
