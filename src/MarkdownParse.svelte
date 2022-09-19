<script>
  import { marked } from 'marked'
  export let markdownText
</script>

<style>
  main {
    outline: 5px solid black;
  }
</style>

<main>
  {#if markdownText}
    {@html marked(markdownText)}
  {/if}
</main>
