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

	// Fix comments syntax highlightling
	var comments = document.getElementsByClassName("c")
	for (var i=0;i<comments.length;i++){
		comments[i].innerHTML=comments[i].innerHTML.trim()
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
		'<p><a href="https://quotes.etelej.com" class="tag is-white is-rounded"><span class="icon has-text-info">'+
		'<svg fill="#3273dc" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M25 20c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7l0.031 1c0 7.732-6.268 14-14 14v-4c2.671 0 5.182-1.040 7.071-2.929 0.364-0.364 0.695-0.75 0.995-1.157-0.357 0.056-0.724 0.086-1.097 0.086zM7 20c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7l0.031 1c0 7.732-6.268 14-14 14v-4c2.671 0 5.182-1.040 7.071-2.929 0.364-0.364 0.695-0.75 0.995-1.157-0.357 0.056-0.724 0.086-1.097 0.086z"></path></svg>'+
		'</span></a></p>'+
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
