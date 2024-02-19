<!-- 
  -------------- # 2 Section --------------
 -->
<!-- 
  ###### Svelte components: Basic structure and syntax 
-->
<!-- <script>
  let name = 'Svelte';
  let src = 'http://picsum.photos/200/200';
  let string = 'Some <strong>string</strong> with html';
</script>
<img src={src} alt="Svelte logo" /> -->

<!-- If the attribute name is the same as the variable name you can do this:
<img {src} alt="Some text {name}"/>  -->

<!-- Note that you can also use template strings like in JS (but withou '$'') -->
<!-- <img {src} alt={`Some text ${name}`}/>  -->


<!-- <h1>Hello {name.toLocaleLowerCase()}!</h1>
<p>{@html string}</p> -->

<!-- The styles declared here apply only to the components in this file -->
<!-- <style>
  h1 {
    color: lightcoral;
  }
</style>  -->

<!-- 
  ###### Exploring state with a simple counter  
 -->
<script>
  import Counter from './lib/Counter.svelte';
</script>

<Counter />

<style>
  h1 {
    color: lightcoral;
  }
</style>