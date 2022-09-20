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

  const getRepoCodeLanguages = repoUrl => {
    // const user = 'vuejs'
    // const repo = 'core'
    // const url = `https://api.github.com/repos/${user}/${repo}/languages`
    const url = repoUrl + '/languages'
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
          getRepoCodeLanguages(repo.url)
        })

        // let d = data[1]
        // console.clear()
        // console.log(d.description)
        // console.log(d.languages)
        // console.log('🍴' + d.forks_count)
        // console.log('⭐' + d.stargazers_count)
        // console.log('👀' + d.watchers_count)
        // console.log(d.homepage)
        // console.log(d.language)
        // console.log(d.languages_url)
        // console.log(d.name)
        // console.log(d.private === false)
        // console.log(d.visibility === 'public')
        // console.log(d.size)
        // console.log(d.topics)
      })
  }
</script>

<style>
  #userRepos {
    margin: 1rem;
    outline: 1px solid black;
  }

  #userRepos > p {
    outline: 1px solid black;
  }
</style>

<button on:click={getUserRepos}>get user repos</button>
<button on:click={getUser}>get user</button>
<input type="range" min={0} max={10} bind:value={limitRepos} />

<div id="userRepos">
  {#each userRepos as repo}
    <p>{repo.description}</p>
  {/each}
</div>
