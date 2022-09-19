<script>
  import { marked } from 'marked'
  export let markdownText
</script>

<style>
  main {
    outline: 5px solid black;
    transform: scale(.5) translateY(-50%);
  }
</style>

<main>
  {#if markdownText}
    {@html marked(markdownText)}
  {/if}
</main>
