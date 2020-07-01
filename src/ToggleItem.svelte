<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import Switch from "./Switch.svelte";

  import { db } from "./lib/firebase.js";

  export let entryId;
  export let checked;
  export let title;
  export let index;

  let percentage = 50;

  const toggleRef = db.ref(`/${entryId}`);
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
      checked = snapshot.val() === 1 ? true : false;
      sendItemCheckedInitial(checked);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  const switchesArray = [0, 1, 2, 3];

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function sendItemChecked(event) {
    const checked = event.detail.checked;
    dispatch("itemToggle", {
      checked,
      index
    });
  }

  function sendItemCheckedInitial(checked) {
    console.log("initialize");
    dispatch("itemToggleI", {
      checked,
      index
    });
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap");

  .content {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    /* font-weight: bold; */
  }

  .percentage {
    font-size: 1.3;
    margin-top: 0.5rem;
  }
</style>

<div>
  <div>
    <div class="content">
      <div class="title">{title}</div>
      <Switch on:toggle={sendItemChecked} bind:checked {entryId} />
      <div class="percentage">{percentage} %</div>
    </div>
  </div>
</div>
