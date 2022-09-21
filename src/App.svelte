<script>
  import { onMount } from 'svelte'
  import Card from './Card.svelte'

  let user = 'freecodecamp'
  let userData = null

  // filter out repos without: description
  // filter out repos without: code languages
  let userRepos = null
  let limitRepos = 10

  let curRepoKeyID = 0
  let score = 0

  let curRepo = null

  let selectedQuestion = 0
  let questions = {}
  let question = null
  let answer = null

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  $: {
    if (userRepos) {
      curRepo = userRepos[Object.keys(userRepos)[curRepoKeyID]]
    }

    if (curRepo) {
      questions.size = {
        html: `💪 <b>${curRepo.full_name}</b> is heavier than 1MB?`,
        value: formatBytes(curRepo.size * 1024),
        answer: curRepo.size > 1024 ? 'Yes' : 'No',
      }

      questions.stars = {
        html: `⭐ <b>${curRepo.full_name}</b> has any stars?`,
        value: curRepo.stargazers_count,
        answer: curRepo.stargazers_count > 0 ? 'Yes' : 'No',
      }

      questions.languages = {
        html: `👨‍💻 Does <b>${curRepo.full_name}</b> contains any programming languages?`,
        // value: Object.keys(curRepo.languages).join(),
        // answer: Object.keys(curRepo.languages).length > 0 ? 'Yes' : 'No',
        answer: 'erorr :)',
      }

      question = questions[Object.keys(questions)[selectedQuestion]].html

      answer = questions[Object.keys(questions)[selectedQuestion]].answer
    }
  }

  const nextQuestion = () => {
    if (curRepoKeyID < Object.keys(userRepos).length - 1) {
      curRepoKeyID++
    }

    selectedQuestion = getRandomInt(0, 3)
  }
  const answerYes = () => {
    nextQuestion()
  }
  const answerNo = () => {
    nextQuestion()
  }

  const getUser = () => {
    const url = `https://api.github.com/users/${user}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userData = {}
        userData.name = data.name
        userData.avatar_url = data.avatar_url
        userData.login = data.login
        userData.bio = data.bio
        userData.type = data.type
        userData.public_repos = data.public_repos
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

  const testQuiz = () => {
    const key = Object.keys(userRepos)[1]
    const repoData = userRepos[key]

    console.log(
      '⭐ Repo has any stars?',
      repoData.stargazers_count > 0 ? 'Yes' : 'No',
    )

    console.log(
      '💪 Repo is heavier than 1MB?',
      repoData.size > 1024 ? 'Yes' : 'No',
    )

    console.log(repoData.languages)
  }

  const randomAvailableQuestion = () => {}

  onMount(() => {
    getUser()
    getUserRepos()
  })
</script>

<style>
  #user > img {
    width: 100px;
    border-radius: 100%;
    position: absolute;
    right: 0px;
    bottom: 0px;
    /* transform: translateX(10px); */
    z-index: 4;

    padding: 1rem;

    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

    user-select: none;
    pointer-events: none;
  }

  #userRepos {
    margin: 1rem;
    outline: 1px solid black;
  }

  #userRepos > .repo {
    outline: 1px solid black;
  }

  #warning {
    color: white;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    right: 0px;
  }
</style>

<!-- <button on:click={getUserRepos}>get user repos</button>
<button on:click={getUser}>get user</button>
<button on:click={testQuiz}>⚡ test quiz</button> -->
<!-- <input type="range" min={0} max={10} bind:value={limitRepos} /> -->

<!-- {#if userData}
  <div id="user">
    <img src={userData.avatar_url} alt={userData.name} />
    {userData.name} @{userData.login} {userData.bio} {userData.type}
    {userData.public_repos}
  </div>
{/if} -->

<!-- {#if userRepos}
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
{/if} -->

<Card>
  <div id="quiz">
    <div id="user">
      {#if userData}
        <img src={userData.avatar_url} alt={userData.name} />
        <!-- {userData.name} -->
      {/if}
    </div>
    {#if curRepo}
      <div class="repo">
        {#if question}
          <div class="question">
            {@html question}
          </div>
        {/if}

        {#if answer}
          <div class="answer">({answer})</div>
        {/if}

        <button on:click={answerYes}>yes</button>
        <button on:click={answerNo}>no</button>
      </div>
    {/if}

    <p>Score: {score}</p>

    {#if userRepos}Repo: {curRepoKeyID + 1}/{Object.keys(userRepos).length}{/if}
  </div>

</Card>

<div id="warning">
  <b>Warning:</b>
  App in development 🧙‍♂️
</div>
