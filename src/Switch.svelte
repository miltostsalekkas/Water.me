<script>
  export let checked = false;
  export let color = "#2196F3";
  export let entryId;

  import firebase from "firebase/app";
  import { db } from "./lib/firebase.js";

  const updateDbValue = checked => {
    const toggleRef = db.ref("/");
    toggleRef.update({

      // here you set the value you need to update
      // LED_Status: checked ? 1 : 0
      [entryId]: checked ? 1 : 0
    });
  };

  const handleToggle = (checked) => {
    updateDbValue(checked)
    sayHello()
  }

  import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function sayHello() {
        dispatch('toggle', {
            checked
        });
    }
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 60px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 60px;
    -webkit-tap-highlight-color: transparent;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 50px;
    width: 50px;
    left: 5px;
    bottom: 5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    border: 0px transparent;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(58px);
    -ms-transform: translateX(58px);
    transform: translateX(58px);
  }
</style>

<label class="switch">
  <input
    type="checkbox"
    bind:checked
    on:change={() => handleToggle(checked)} />
  <span class="slider" />
</label>
