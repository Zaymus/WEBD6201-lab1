/*
 *	Names (Student ID): Drew Cross (100659256), Carson Brown (100741210)
 *	Date Completed: February 10th 2022
 *  Description: In this lab we were tasked with demonstrating our knowledge of JavaScript thus far in the course. The focus of the lab structure was to display information on a page accessible via a nav bar. The information to be displayed was to be injected using the appropriate JavaScript code, we accomplished this by hard-coding the page content within a json file for ease of access and viewability while referencing the file later. Utilizing a json file. Also allowed us to conserve space and keep our JavaScript file free of additional clutter.

 */

// Declare Constants used for navbar nagivation and sections
const NAV_BAR = document.getElementsByTagName("nav")[0];
const NAV_CONTAINER = document.getElementById("sub-nav");
const SECTIONS = document.getElementsByTagName("section");

// Declare scroll magnitude value constant
const SCROLL_MAGNITUDE = 30;

// Process used to create the Human Resources Nav item
let hr = document.createElement("li");
hr.classList.add("sub-nav-item");
hr.setAttribute("data-selected", "false");
hr.setAttribute("data-section-num", "4");
hr.innerHTML = '<i class="fas fa-briefcase nav-icon"></i>Human Resources';

// In this function we insert the human resource nav item before inserting the contact nav item
NAV_CONTAINER.insertBefore(
	hr,
	document.getElementsByClassName("sub-nav-item")[4]
);

// Here we edit the Products Nav item to instead be Projects as instructed in Step 3
const NAV_ITEMS = document.getElementsByClassName("sub-nav-item");
NAV_ITEMS[1].innerHTML = '<i class="fas fa-th nav-icon"></i>Projects';

// Reading the content from the JSON file in accordance with the below function
// to display information to each tab accordingly
$.getJSON("./Content/content.json", readData);

// this function reads the JSON file while putting it on the page.
function readData(json) {
	var siteContent = json;
	let button_drew = document.getElementById("resume-drew");
	let button_carson = document.getElementById("resume-carson");

	// iterate through all sections
	for (let i = 0; i <= SECTIONS.length - 1; i++) {
		// set title of section
		let title = SECTIONS[i].childNodes[3].childNodes[1];
		// get section name from custom attribute
		let name = SECTIONS[i].getAttribute("data-name");
		// get the content segment of the section
		let content = SECTIONS[i].childNodes[3].childNodes[3];
		// check if the content contains the gallery class
		if (content != null) {
			if (content.classList.contains("gallery")) {
				// count the number of items for the json dictionary
				let count = 1;
				// iterate through all child nodes
				for (let k = 1; k < content.childNodes.length; k += 2) {
					// set title margins
					title.style.marginBottom = "0px";
					title.style.marginTop = "5px";
					// get image element
					let image = content.childNodes[k].childNodes[1];
					// set the image source the url in json file
					image.setAttribute("src", siteContent[name][`image-${count}`]);
					let caption = "";
					// check if the content has the about class
					if (content.classList.contains("about")) {
						// get caption element
						caption = content.childNodes[k].childNodes[5];
						// get resume button element
						let button1 = document.getElementById("resume-drew");
						let button2 = document.getElementById("resume-carson");

						// set the click event to open the resume file in a new tab
						button1.addEventListener("click", () => {
							window.open(`${siteContent[name][`resume-1`]}`, "_blank");
						});
						button2.addEventListener("click", () => {
							window.open(`${siteContent[name][`resume-2`]}`, "_blank");
						});
					} else {
						// get the caption element
						caption = content.childNodes[k].childNodes[3];
					}
					// assign the caption element to display json data
					caption.innerHTML = siteContent[name][`caption-${count}`];
					// increment count
					count++;
				}
			} else {
				// set content text
				content.innerHTML = siteContent[name]["content"];
			}
			// set title text
			title.innerHTML = siteContent[name]["title"];
		}
	}
}

function openResume(e) {
	console.log(e);
}

// Declare the global index value for the current section the user is on
var idx = 0;

// Updates the transition delay for each section based on its current state
function updateSections() {
	// iterate through all sections to ensure all sections have the proper transition delay
	Array.prototype.forEach.call(SECTIONS, (section) => {
		section.style.transitionDuration = "1000ms";
		if (section.getAttribute("data-visible") == "hide") {
			section.style.transitionDelay = "500ms";
		} else if (section.getAttribute("data-visible") == "show") {
			section.setAttribute("data-visible", "flip-up");
			section.style.transitionDelay = "0ms";
		} else if (section.getAttribute("data-visible") == "flip-up") {
			section.style.transitionDelay = "1300ms";
		}
	});
}

// This function changes the state of the nav items in sections based on what nav item was clicked
function showSection(e) {
	let target;
	// check if the node is an icon
	if (e.target.nodeName == "I") {
		// asign the target to the parent element of the i element
		target = e.target.parentNode;
	} else {
		// assign the target to the target object of the event trigger
		target = e.target;
	}
	// set idx to the custom atribute value
	idx = target.getAttribute("data-section-num");

	// iterate through all nav items
	Array.prototype.forEach.call(NAV_ITEMS, (item) => {
		// set custom attribute to false
		item.setAttribute("data-selected", "false");
	});

	// set custom attribute to true to display the selected nav item
	target.setAttribute("data-selected", "true");

	updateSections();
	// sets a custom attribute to trigger the show animation
	SECTIONS[idx].setAttribute("data-visible", "show");
}

// This function handles scrolling with the mousewheel. It gets the next section in sequence
// and hides the previous section so the new one can be displayed.
function nextElement(event) {
	// ensures a proper scroll amount before triggering
	if (event.deltaY >= SCROLL_MAGNITUDE) {
		// iterate through  all nav items
		for (let i = 0; i < NAV_ITEMS.length; i++) {
			// if the item is selected, set it to false, then activate the next section
			if (NAV_ITEMS[i].getAttribute("data-selected") == "true") {
				NAV_ITEMS[i].setAttribute("data-selected", "false");
				if (i < NAV_ITEMS.length - 1) {
					idx = NAV_ITEMS[i + 1].getAttribute("data-section-num");
				} else {
					idx = NAV_ITEMS[0].getAttribute("data-section-num");
				}
			}
		}
	} else if (event.deltaY <= -SCROLL_MAGNITUDE) {
		// if the item is selected, set it to false, then activate the next section
		for (let i = 0; i < NAV_ITEMS.length; i++) {
			if (NAV_ITEMS[i].getAttribute("data-selected") == "true") {
				NAV_ITEMS[i].setAttribute("data-selected", "false");
				if (i > 0) {
					idx = NAV_ITEMS[i - 1].getAttribute("data-section-num");
				} else {
					idx =
						NAV_ITEMS[NAV_ITEMS.length - 1].getAttribute("data-section-num");
				}
			}
		}
	}

	// removes the wheel event listener to allow the animation to start and so that an overscroll is not possible unless intended
	if (Math.abs(event.deltaY) >= SCROLL_MAGNITUDE) {
		window.removeEventListener("wheel", nextElement);
		updateSections();
		SECTIONS[idx].setAttribute("data-visible", "show");
		NAV_ITEMS[idx].setAttribute("data-selected", "true");
		// activates the scroll event after 600ms
		setTimeout(function () {
			window.addEventListener("wheel", nextElement);
		}, 750);
	}
}

// This function allows us to re-route the user back to the home section of the page
// When contact information is input into the form. As per the instructions in Step 4 of the
// Lab the information is logged to the console before taking the user back to the start.
function contactSubmit() {
	// Vars to get form attributes
	var name = $("#name-input");
	var phone = $("#phone-input");
	var email = $("#email-input");
	var message = $("#message-input");

	// Info to log
	var log = `Name: ${name.val()}\nPhone: ${phone.val()}\nE-mail: ${email.val()}\nMessage: ${message.val()}`;
	console.log(log);

	$("#thank-you").css("visibility", "visible");

	// Return to home after 3 seconds
	setTimeout(() => {
		NAV_ITEMS[0].setAttribute("data-selected", "true");
		NAV_ITEMS[5].setAttribute("data-selected", "false");
		updateSections();
		SECTIONS[0].setAttribute("data-visible", "show");
		// Re-hide thank you message
		$("#thank-you").css("visibility", "hidden");
		// Reset Values
		name.val("");
		phone.val("");
		email.val("");
		message.val("");
	}, 3000);
}

// event that triggers when the webpage has loaded
window.onload = () => {
	// iterate through all nav items and assign click events
	for (let i = 0; i < NAV_ITEMS.length; i++) {
		NAV_ITEMS[i].addEventListener("click", showSection);
	}
	// set default values for the opening section
	SECTIONS[0].style.transitionDelay = "750ms";
	SECTIONS[0].style.transitionDuration = "1500ms";
	SECTIONS[0].setAttribute("data-visible", "show");
};
// add wheel event listener to scroll inputs
window.addEventListener("wheel", nextElement);
