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


/* VUE */
if (document.getElementById("qod")){
	var QOD = {
		template: '<div class="content" v-if="visible">'+
		'<br><h5 class="tag">Quote of the Day</h5>'+
		'<blockquote>{{quote}}'+
		'<br/>'+
		'<div style="display:block;text-align:right">'+
		'<cite>{{author}}</cite>'+
		'<p><a href="https://quotes.etelej.com" class="tag is-white is-rounded"><span class="icon has-text-info"><i class="fa fa-quote-right"></i></span></a></p>'+
		'</div>'+
		'</blockquote>'+
		'</div>',
		data: function(){
			return {
				visible:false,
				quote: "",
				author: "",
				date: "",
				url: ""
			}
		},
		created:function(){
			if (!axios) {
				console.log("no axios :-(")
				return
			}
			var vm = this

			axios.get("https://quotes.etelej.com/api/qod")
				.then(function(response){
					if (response.data.status !== "success"){
						console.log("QOD API failure",response.data)
						return
					}
					vm.quote = response.data.data.quote
					vm.author = response.data.data.author
					vm.date = response.data.data.date
					vm.url = response.data.data.url
					vm.visible=true
				}).catch(function(err){
					console.log("axios fail:",err)

				})
		}

	}
	var app = new Vue({
		el: "#qod",
		components: {"qod":QOD},
	})
}

