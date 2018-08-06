function trigger(){
    let form = document.querySelector('form').addEventListener('submit', function(e){
	  e.preventDefault();
	  var textOfTarget = e.target.elements.username.value;
	  if (textOfTarget !== "") {
	  	getApi(textOfTarget);
	  }
    });
	
}

function getApi(username) {

	const request = superagent;
 	let API_URL = `https://api.github.com/users/${username}?access_token=${githubApiKey}`;
  
    request
    	.get(API_URL)
		.then(getData)
		.then(getRepos);
}

function getData(response) {

	let imageData = document.querySelector(".grid__first-image");
	let nameData = document.querySelector(".grid__avatar-name");
	let loginData = document.querySelector(".grid__avatar-login");
	let btn = document.querySelector(".grid__btn");
	let link = document.querySelector(".grid__link");
	let line = document.querySelector(".grid__line");
	let dataCompany = document.querySelector(".grid__first-two");
	let data = response.body;
	let template = "";

	dataCompany.innerHTML = "";
	imageData.innerHTML = '<img src="' + data.avatar_url + '" class="photo">';
	nameData.innerText = data.name;
	loginData.innerText = data.login.toLowerCase();
	btn.style.display = "block";
	link.style.display = "block";
	line.style.display = "block";
	template = `<p class="grid__company">${data.company}</p>
                <p class="grid__location">${data.location}</p>
                <a href="#" class="grid__email">${data.email}</a>
                <p><a href="#" class="grid__link2">${data.blog}</a><p>
			   `;
	dataCompany.innerHTML += template;

    return data.login;
}

function getRepos(username) {
	
	const request = superagent;
	let repoList = document.querySelector(".grid__second");
	let API_URL = `https://api.github.com/users/${username}/repos?access_token=${githubApiKey}`;
	
	request
		.get(API_URL)
		.then(function(response){
			let repos = response.body;
			let template = "";
			repoList.innerHTML = "";
			repos.forEach(function(repo){
				console.log(repo);
				if (repo.description !== null) {
					template = `<div class="grid__repo">
	            				<h2>${repo.name}</h2>
	            				<p>${repo.description}</p>
	            				<p>${repo.language}<span> | ${repo.forks_count} | </spa>${repo.created_at}</p>
	          					</div>
	                   		   `;
                } else {
 					template = `<div class="grid__repo">
	            				<h2>${repo.name}</h2>
	            				<p>${repo.language}<span> | ${repo.forks_count} | </spa>${repo.created_at}</p>
	          					</div>
	                   		   `;
                }
				repoList.innerHTML += template;
			})
		})

}

getApi('herdez');
trigger();