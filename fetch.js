const getUserRepos = () => {
    const user = 'gnatson'

    fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[3].url);
            console.log(data[3].name);
            console.log(data[3].owner.login);
            // console.log(data[3].owner.avatar_url);

            // console.log(data.map(repo => repo.name));
            // console.log(data.map(repo => repo.description));

            // console.log(data.map(repo => repo.size));
            // console.log(data.map(repo => repo.stargazers_count));
            // console.log(data.map(repo => repo.topics));
            // console.log(data.map(repo => repo.watchers));
            // console.log(data.map(repo => repo.visibillity));
            // console.log(data.map(repo => repo.url));
            // console.log(data.map(repo => repo.));

        });
}



const getMarkdownReadme = () => {
    fetch(`https://raw.githubusercontent.com/facebook/react/master/README.md`)
        .then((response) => response.text())
        .then((data) => console.log(data))
}


getUserRepos()
// getMarkdownReadme()