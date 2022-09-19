const getUserRepos = () => {
    const user = 'gnatson'
    const url = `https://api.github.com/users/${user}/repos?per_page=100`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let d = data[1]
            console.log(d.url);
            console.log(d.name);
            console.log(d.owner.login);
            console.log(d.description);
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
    const user = 'gnatson'
    const repo = 'awesome-github-profile-readme '
    const url = `https://raw.githubusercontent.com/${user}/${repo}/master/README.md`
    fetch(url)
        .then((response) => response.text())
        .then((data) => console.log(data))
}


getUserRepos()
// getMarkdownReadme()