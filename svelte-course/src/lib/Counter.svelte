<!-- 
  -------------- # 3 Section --------------
 -->
 



<!-- 
  -------------- # 2 Section --------------
 -->
<!-- 
  ###### Exploring state with a simple counter  
 -->
<!-- <script>
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
 </script> -->

<!-- Inline function -->
<!-- <button on:click={() => count += 1}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button> -->

<!-- Function call -->
<!-- <button on:click={increment}> Clicks: {count}</button>
<h3>{string}</h3>

<style>
  button {
    padding: 10px;
    margin: 10px;
    font-size: 1.5em;
    background-color: coral;
    border-color: coral;
  }
</style> -->

<!-- 
  ###### 🚨 Reactive Statements GOTCHAS
 -->
<!-- <script>
  let count1 = 0;
  let count2 = 0;

  let count3Bad = 0;
  let count3Good = 0;

  /*
    🚨 In order for the statement to be reactive, it needs a direct (explicit) 
    reference (dependency) to the variables that are being used inside of it.
  */
  // ❌ not going to work
  // function getTotal() {
  //   return count1 + count2;
  // }
  // $: string = `Clicked ${getTotal} times in total`;

  // ✅ going to work
  function getTotal(arg1, arg2) {
    return arg1 + arg2;
  }
  $: string = `Clicked ${getTotal(count1, count2)} times in total`;

  /*
    🚨 The order of the reactive statements matter
  */
 // the value of count3 is set to the value of the parameter x
 function setCount3Bad(x) {
  count3Bad = x;
 }
 function setCount3Good(x) {
  count3Good = x;
 }
 // ❌ This won't work - The state is updated after the count3 is updated
 $: anotherStringBad = `Count3 is ${count3Bad} and should be equal to Count1: ${count1}`;
 $: setCount3Bad(count1); // will update the count3Bad but one step later
 // ✅ This will work - The state is updated before the count3 is updated
 $: setCount3Good(count1);
 $: anotherStringGood = `Count3 is ${count3Good} and should be equal to Count1: ${count1}`;

  function increment1(){
    count1 += 1;
  };
  function increment2() {
    count2 += 1;
  };
</script>

<button on:click={increment1}>Clicks {count1}</button>
<button on:click={increment2}>Clicks {count2}</button>
<h3>{string}</h3>
<h3>❌ Bad: {anotherStringBad}</h3>
<h3>✅ Good: {anotherStringGood}</h3>

<style>
  button {
    padding: 10px;
    margin: 10px;
    font-size: 1.5em;
    background-color: coral;
    border-color: coral;
  }
</style> -->

<!-- 
  ###### Component props
 -->
<!-- <script>
  export let initialCount = 0; // default value
  export let maxCount = 10; // default value
  // 🟡 the warning if prop is omitted is in the picture below
  // export let maxCount;
  // to stop the warnings being displayed we'd need to assign SOME value
  // export let maxCount = undefined; // can be even undefined

  console.log('$$props');
  console.log($$props);
  console.log('$$restProps');
  console.log($$restProps)

  let count = initialCount;

  function increment() {
    if (count < maxCount) {
      count += 1;
    }
  }
</script>

<button on:click={increment}>Clicks: {count}</button>

<style>
  button {
    padding: 10px;
    margin: 10px;
    font-size: 1.5em;
    background-color: coral;
    border-color: coral;
  }
</style> -->