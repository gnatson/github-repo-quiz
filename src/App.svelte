<script>
  let user = 'gnatson'

  let userRepos = {}
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

  const getRepoCodeLanguages = (repoFullName, repoLanguagesUrl) => {
    const url = repoLanguagesUrl
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userRepos[repoFullName].languages = data
      })
  }

  const getUserRepos = () => {
    const user = 'gnatson'
    const limit = limitRepos
    const url = `https://api.github.com/users/${user}/repos?per_page=${limit}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userRepos = {}
        // todo: sort out repos without code languages === {}
        data.forEach((repo) => {
          userRepos[repo.full_name] = repo
          getRepoCodeLanguages(repo.full_name, repo.languages_url)
        })
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
  {#each Object.keys(userRepos) as repo}
    <div class="repo">
      {userRepos[repo].homepage} {userRepos[repo].url}
      <a href={userRepos[repo].html_url}>{userRepos[repo].full_name}</a>
      {userRepos[repo].description} 🍴 {userRepos[repo].forks_count} ⭐ {userRepos[repo].stargazers_count}
      👀 {userRepos[repo].watchers_count} {userRepos[repo].visibility}
      {userRepos[repo].private ? '🔐' : '🔓'}
      {formatBytes(userRepos[repo].size * 1024)} 📝{userRepos[repo].license ? userRepos[repo].license.name : ''}
      {JSON.stringify(userRepos[repo].languages)}
    </div>
  {/each}
</div>
