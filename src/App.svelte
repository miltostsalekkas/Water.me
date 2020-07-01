<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import Switch from "./Switch.svelte";
  import ToggleItem from './ToggleItem.svelte'

  import { db } from "./lib/firebase.js";

  let checked = false;
  let percentage = 50;

  let activeIndexes = [false, false, false, false]

  const toggleRef = db.ref("/P1");
  const humidityRef = db.ref("/Plant_Humidity");

  humidityRef.on(
    "value",
    function(snapshot) {
      percentage = snapshot.val();
    },
    function(errorObject) {
      console.log("Moisture Readings Failed");
    }
  );

  toggleRef.on(
    "value",
    function(snapshot) {
      checked = snapshot.val();
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  let val = 0;
  const switchesArray = ['P1','P2','P3','P4']
  const titleArray = ['🌿Monstera & co🌿', '🌱Small ones🌱', '☘️Medium sized☘️', '🌵Rest🌵']
  let activeIndex = '';

  const handleClick = (id) => {
    // console.log('clicked')
    activeIndex=id
    activeIndex=activeIndex
    val=id;
    // console.log(activeIndex)
  }

$:activeIndex =  val;


    function handleMessage(event) {
      const checked = event.detail.checked;
      const index = event.detail.index;
        console.log('in app', event.detail.checked, index);
        activeIndexes[index]=checked;
        activeIndexes=activeIndexes;
    }

</script>

<style>
 @import url("https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap");
  .main {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* grid-template-columns: auto auto auto; */
    justify-content: center;
    align-items: center;
    font-family: "Zilla Slab", serif;
    transition: 0.4s all ease-in-out;
    top: 0;
    left: 0;
  }

  .on {
    background: tomato; 
    color: white;
  }

  .off {
    background: white;
    color: tomato;
  }

  .title {
    font-weight: normal;
    font-size: 2.5rem;
        transition: 0.4s all ease-in-out;
        margin-bottom: 3rem;
  }

  .ton {
    color: white;
    opacity: 1;
  }

  .toff {
    color: tomato;
    opacity: 0 !important;
  }

.blink {
	-webkit-animation: blink 1.5s linear infinite;
	-moz-animation: blink 1.5s linear infinite;
	-ms-animation: blink 1.5s linear infinite;
	-o-animation: blink 1.5s linear infinite;
	 animation: blink 1.5s linear infinite;
}

@keyframes blink {
    0% {
       opacity: 1
    }
    25% {
      opacity: .5
    }
    50% {
      opacity: 0
    }
    75% {
      opacity: .5
    }
    100% {
       opacity: 1
    }
}
</style>



<div class={`main ${ activeIndexes.indexOf(true)>-1 ? 'on' :'off'}`}>
<div class={` ${ activeIndexes.indexOf(true)>-1 ? 'ton' :'toff'}`}>
<div class='title blink'>
  Watering...🌱🍀🌿🌵💦 
</div>
</div>
{#each switchesArray as item, i}
  <ToggleItem on:itemToggle={handleMessage} on:itemToggleI={handleMessage}  entryId={item} index={i} title={titleArray[i]}/>
{/each}
</div>



