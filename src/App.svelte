<script>
  const getUserRepos = () => {
    const user = 'gnatson'
    const limit = 5
    const url = `https://api.github.com/users/${user}/repos?per_page=${limit}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // const repos = data
        // repos.forEach((repo) => {
        //   console.log(repo.name)
        // })

        let d = data[1]
        console.log(d)
        // console.log(d.contents_url);
        // console.log(d.url);
        // console.log(d.name);
        // console.log(d.owner.login);
        // console.log(d.description);
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
      })
  }

  const getMarkdownReadme = () => {
    const user = 'gnatson'
    const repo = 'awesome-github-profile-readme '
    const url = `https://raw.githubusercontent.com/${user}/${repo}/master/README.md`
    fetch(url)
      .then((response) => response.text())
      .then((data) => console.log(data))
  }

  const getRepoCodeLanguages = () => {
    const user = 'vuejs'
    const repo = 'core'
    const url = `https://api.github.com/repos/${user}/${repo}/languages`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const sumObjectValues = (obj) =>
          Object.values(obj).reduce((a, b) => a + b)
        const sum = sumObjectValues(data)

        console.log(data)
        const percent = (value, sum) =>
          ((value / sum) * 100).toFixed(1)
        console.log(percent(+Object.values(data)[0], sum))

        Object.entries(data).forEach((entry) => {
          data[entry[0]] = { value: entry[1] }
          data[entry[0]].percent = +percent(data[entry[0]].value, sum)
        })

        console.log(data)
      })
  }
</script>

<input type="text" />

<button on:click={() => (console.clear(), getUserRepos())}>
  get user repos
</button>

<button on:click={() => (console.clear(), getMarkdownReadme())}>
  get repo markdown readme
</button>

<button on:click={() => (console.clear(), getRepoCodeLanguages())}>
  get repo code languages (%)
</button>
