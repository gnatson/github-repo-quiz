<script>
  import { spring } from 'svelte/motion'
  import { swipe } from './swipe.js'

  const coords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4,
    },
  )

  function handlePanStart() {
    coords.stiffness = coords.damping = 1
  }

  function handlePanMove(event) {
    coords.update(($coords) => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy,
    }))
  }

  function handlePanEnd(event) {
    coords.stiffness = 0.2
    coords.damping = 0.4
    coords.set({ x: 0, y: 0 })
  }
</script>

<style>
  .card {
    --width: 40vw;
    --height: 60vh;

    position: absolute;
    left: calc(50% - var(--width) / 2);
    top: calc(50% - var(--height) / 2);

    width: var(--width);
    height: var(--height);

    border-radius: 4px;
    background-color: burlywood;

    padding: 2rem;
    overflow: hidden;

    user-select: none;
  }
</style>

<div
  class="card"
  use:swipe
  on:panstart={handlePanStart}
  on:panmove={handlePanMove}
  on:panend={handlePanEnd}
  style="transform: translate({$coords.x}px,{$coords.y}px) rotate({$coords.x * 0.2}deg)">
  <slot>
    <!-- optional fallback -->
  </slot>
</div>
