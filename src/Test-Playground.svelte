<script>
  import MarkdownParse from './MarkdownParse.svelte'

  const users = ['gnatson']
  
  const sampleRepos = [
    {
      user: 'vuejs',
      repo: 'core',
    },
    { user: 'gnatson', repo: 'gnatson' },
  ]

  let userData = null

  let user = 'gnatson'
  let repo = 'gnatson'
  let markdownReadme = null

  const getUserAvatar = () => {
    const url = `https://api.github.com/users/${user}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userData = {
          name: data.name,
          avatar: data.avatar_url,
          login: data.login,
          bio: data.bio,
          type: data.type,
          publicReposCount: data.public_repos,
        }

        // console.log(data.starred_url)
      })
  }

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
        console.log(d.description)
        console.log(d.languages)
        console.log('🍴' + d.forks_count)
        console.log('⭐' + d.stargazers_count)
        console.log('👀' + d.watchers_count)
        console.log(d.homepage)
        console.log(d.language)
        console.log(d.languages_url)
        console.log(d.name)
        console.log(d.private === false)
        console.log(d.visibility === 'public')
        console.log(d.size)
        console.log(d.topics)

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
    const url = `https://raw.githubusercontent.com/${user}/${repo}/master/README.md`
    fetch(url)
      .then((response) => response.text())
      .then((data) => (markdownReadme = data))
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
        const percent = (value, sum) => ((value / sum) * 100).toFixed(1)
        console.log(percent(+Object.values(data)[0], sum))

        Object.entries(data).forEach((entry) => {
          // data[entry[0]] = { value: entry[1] }
          // data[entry[0]].percent = +percent(data[entry[0]].value, sum)
          data[entry[0]] = +percent(data[entry[0]], sum)
        })

        console.log(data)

        // is repo contains language >50%?? >30%? 90%? <quiz>
      })
  }
</script>

<style>
  #user {
    outline: 1px solid black;
    margin: 1rem;
    padding: 1rem;
  }

  #user > img {
    width: 100px;
    border-radius: 100%;
  }
</style>

<div id="user">
    <div id="name">{userData.name}</div>
    <div id="login">@{userData.login}</div>
    <div id="bio">{userData.bio || '📝 No bio.'}</div>
    <div id="type">{userData.type}</div>
    <div id="reposNumber">
      Has {userData.publicReposCount}
      <b>public</b>
      repositories.
    </div>
    <img src={userData.avatar} alt={userData.name} />
</div>

<input type="text" bind:value={user} placeholder="user..." />
<input type="text" bind:value={repo} placeholder="repo..." />

<br />
<br />

{#each sampleRepos as data}
  <button on:click={() => ((user = data.user), (repo = data.repo))}>
    {data.user}/{data.repo}
  </button>
{/each}

<br />
<br />

<button on:click={() => (console.clear(), getUserRepos())}>
  get user repos
</button>

<button on:click={() => (console.clear(), getMarkdownReadme())}>
  get repo markdown readme
</button>

<button on:click={() => (console.clear(), getRepoCodeLanguages())}>
  get repo code languages (%)
</button>

<button on:click={() => (console.clear(), getUserAvatar())}>
  🤳 user avatar
</button>

<h2>quiz</h2>
<p>
  let's guess... this repo (repo.description) is written in (mostly)...
  TypeScript? True/False
</p>
<p>⭐ Score: 0</p>

<!-- svelte.swipe card right/left true/false (fact) -->

<MarkdownParse markdownText={markdownReadme} />
<!-- <MarkdownParse /> -->
