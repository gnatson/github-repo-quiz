<script>
  import { marked } from 'marked'
  export let markdownText
</script>

<main>
  {#if markdownText}
    {@html marked(markdownText)}
  {/if}
</main>
