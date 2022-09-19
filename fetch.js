let user = 'gnatson'

fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then((response) => response.json())
    .then((data) => {
        const names = data.map(repo => repo.name)
        console.log(names);
    });