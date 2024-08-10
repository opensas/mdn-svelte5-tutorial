<script>
  let name = $state('world');

  function toggleName() {
    if (name === 'world') {
      name = 'svelte'
    } else {
      name = 'world'
    }
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <button onclick={toggleName}>Toggle name</button>
  <p>Visit the <a href="https://svelte-5-preview.vercel.app/">Svelte 5 preview site</a> to learn more about Svelte 5.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>