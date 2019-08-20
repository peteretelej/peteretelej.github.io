/* NAVBAR BURGER */
document.addEventListener('DOMContentLoaded', function () {
	// Get all "navbar-burger" elements
	var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(function ($el) {
			$el.addEventListener('click', function () {

				// Get the target from the "data-target" attribute
				var target = $el.dataset.target;
				var $target = document.getElementById(target);

				// Toggle the class on both the "navbar-burger" and the "navbar-menu"
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}

});

function showBox(id){
	var el = document.getElementById(id);
	el.style.display="block";
	if (el.lastChild.id !== "close-"+el.id){
		var close=document.createElement("button");
		close.id="close-"+el.id;
		close.classList.add("button", "is-danger", "is-small");
		close.style.float="right";
		close.innerHTML="Minimize this section.";
		close.addEventListener("click",function(event){
			event.target.parentNode.style.display="none";
		});
		el.appendChild(close);
	}
}

pagemap(document.querySelector('#map'), {
    viewport: null,
    styles: {
        'header,footer,section,article': 'rgba(0,0,0,0.08)',
        'h1,a': 'rgba(0,0,0,0.10)',
        'h2,h3,h4': 'rgba(0,0,0,0.08)'
    },
    back: 'rgba(0,0,0,0.02)',
    view: 'rgba(0,0,0,0.05)',
    drag: 'rgba(0,0,0,0.10)',
    interval: null
});