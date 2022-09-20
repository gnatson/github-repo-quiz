<script>
 const getUserRepos = () => {
    const user = 'gnatson'
    const limit = 3
    const url = `https://api.github.com/users/${user}/repos?per_page=${limit}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        console.clear()

        
        data.forEach(repo => {
            console.log(repo.description)
        });


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

<button on:click={getUserRepos}>get user repos</button>