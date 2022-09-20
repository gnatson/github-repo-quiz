<script>
  let user = 'gnatson'

  let userRepos = []
  let limitRepos = 3

  const getUser = () => {
    const url = `https://api.github.com/users/${user}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.clear()
        console.log(data.name)
        console.log(data.avatar_url)
        console.log(data.login)
        console.log(data.bio)
        console.log(data.type)
        console.log(data.public_repos)
      })
  }

  const getRepoCodeLanguages = (repoLanguagesUrl) => {
    const url = repoLanguagesUrl
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }

  const getUserRepos = () => {
    const user = 'gnatson'
    const limit = limitRepos
    const url = `https://api.github.com/users/${user}/repos?per_page=${limit}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userRepos = data

        console.clear()

        data.forEach((repo) => {
          console.log(repo.description)
          console.log(repo.url)
          getRepoCodeLanguages(repo.languages_url)
        })

        // console.log(d.homepage)
        // console.log(d.language)
        // console.log(d.languages_url)
        // console.log(d.private === false)
        // console.log(d.size)
        // console.log(d.topics)
      })
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
</script>

<style>
  #userRepos {
    margin: 1rem;
    outline: 1px solid black;
  }

  #userRepos > .repo {
    outline: 1px solid black;
  }
</style>

<button on:click={getUserRepos}>get user repos</button>
<button on:click={getUser}>get user</button>
<input type="range" min={0} max={10} bind:value={limitRepos} />

<div id="userRepos">
  {#each userRepos as repo}
    <div class="repo">
      <p>{repo.name}</p>
      {repo.description} 🍴 {repo.forks_count} ⭐ {repo.stargazers_count} 👀 {repo.watchers_count}
      {repo.visibility} {repo.private ? '🔐' : '🔓'}
      {formatBytes(repo.size * 1024)}
    </div>
  {/each}
</div>
