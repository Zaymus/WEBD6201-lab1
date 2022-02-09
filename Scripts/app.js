const NAV_BAR = document.getElementsByTagName("nav")[0];
const NAV_CONTAINER = document.getElementById("sub-nav");
const SECTIONS = document.getElementsByTagName("section");

let hr = document.createElement("li");
hr.classList.add("sub-nav-item");
hr.setAttribute("data-selected", "false");
hr.setAttribute("data-section-num", "4");
hr.innerHTML = '<i class="fas fa-briefcase nav-icon"></i>Human Resources';

NAV_CONTAINER.insertBefore(
	hr,
	document.getElementsByClassName("sub-nav-item")[4]
);

const NAV_ITEMS = document.getElementsByClassName("sub-nav-item");

var idx = 0;

function updateSections() {
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

function showSection(e) {
	let target;
	if (e.target.nodeName == "I") {
		target = e.target.parentNode;
	} else {
		target = e.target;
	}
	idx = target.getAttribute("data-section-num");

	Array.prototype.forEach.call(NAV_ITEMS, (item) => {
		item.setAttribute("data-selected", "false");
	});

	target.setAttribute("data-selected", "true");

	updateSections();

	SECTIONS[idx].setAttribute("data-visible", "show");
}

function nextElement(event) {
	if (event.deltaY >= 20) {
		for (let i = 0; i < NAV_ITEMS.length; i++) {
			if (NAV_ITEMS[i].getAttribute("data-selected") == "true") {
				NAV_ITEMS[i].setAttribute("data-selected", "false");
				if (i < NAV_ITEMS.length - 1) {
					idx = NAV_ITEMS[i + 1].getAttribute("data-section-num");
				} else {
					idx = NAV_ITEMS[0].getAttribute("data-section-num");
				}
			}
		}
	} else if (event.deltaY <= -20) {
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

	if (Math.abs(event.deltaY) >= 20) {
		window.removeEventListener("wheel", nextElement);
		updateSections();
		SECTIONS[idx].setAttribute("data-visible", "show");
		NAV_ITEMS[idx].setAttribute("data-selected", "true");
		setTimeout(function () {
			window.addEventListener("wheel", nextElement);
		}, 600);
	}
}

function contactSubmit() {}

window.onload = () => {
	for (let i = 0; i < NAV_ITEMS.length; i++) {
		NAV_ITEMS[i].addEventListener("click", showSection);
	}
	SECTIONS[0].style.transitionDelay = "750ms";
	SECTIONS[0].style.transitionDuration = "1500ms";
	SECTIONS[0].setAttribute("data-visible", "show");
};

window.addEventListener("wheel", nextElement);
