<!-- 
  -------------- # 2 Section --------------
 -->
<!-- 
  ###### Exploring state with a simple counter  
 -->
<script>
  let count = 0;
  let countText = `Clicked ${count} times`;
  
  // This is a non-reactive variable
  console.log(`-- Non reactive variable: ${count}`);
  // This is a reactive variable
  $: console.log(`-- Reactive variable: ${count}`);

  // Defininng variable in the reactive block
  let string;
  $: {
    string = `Clicked ${count} times`;
  }

  function increment() {
    count += 1;
  }
 </script>

<!-- Inline function -->
<!-- <button on:click={() => count += 1}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button> -->

<!-- Function call -->
<button on:click={increment}> Clicks: {count}</button>
<h3>{string}</h3>

<style>
  button {
    padding: 10px;
    margin: 10px;
    font-size: 1.5em;
    background-color: coral;
    border-color: coral;
  }
</style>