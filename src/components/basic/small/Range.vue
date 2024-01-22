<template>
  <div class="w-full transform scale-75 md:scale-100 md:w-[25em]">
    <div class="flex gap-2 items-center text-center text-lg uppercase tracking-wide font-mono font-semibold break-words">
      <span v-if="icon" class="iconify" :data-icon="icon" />{{ titles[value] }}
    </div>
    <div class="relative w-full">
      <input
        :id="idd"
        class="range-style w-full"
        type="range"
        :name="name"
        min="0"
        :max="list.length - 1"
        step="1"
        :value="value"
        list="ticks"
        @input="$emit('update:modelValue', list[+($event.target as HTMLInputElement).value]), value = +($event.target as HTMLInputElement).value"
      >
      <div class="range-inside flex justify-between py-5 px-9">
        <div v-for="n, i in list" :key="i">
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find } from 'lodash-es'
import { randomString } from '~/logic'
import { useStore } from '~/store/store'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'default',
  },
  idd: {
    type: String,
    default: () => randomString(5),
  },
  titles: {
    type: Array<String>,
    default: () => ['Title'],
  },
  list: {
    type: Array<number>,
    default: () => [1, 2, 3, 4, 5],
  },
  icon: {
    type: String,
    default: '',
  },
})

const { difficulties } = useStore()
const title = find(difficulties.value, { type: props.type })

const value = ref(title ? props.titles.findIndex(n => n === title.title) : props.list.findIndex((n, i) => n === 0))
const emit = defineEmits(['update:modelValue'])

</script>

<style>
.range-style {
    /* To remove default styles appplied by webkit browsers */
    appearance: none;
    background: transparent;
    position: relative;
}

.range-style:focus {
    /* To remove default (mostly blue) outline appplied by browsers on :focus */
    outline: 0;
}

/* SLIDER THUMB -> represented by the orange ball in the design */
/* Webkit based browsers (chrome, opera, ...) */
.range-style::-webkit-slider-thumb {
     /* Removes the default styling */
    -webkit-appearance: none;

    width: 3em;
    height: 3em;
    margin: .5em 0;
    background: hsl(219, 52%, 18%);
    border-radius: 100%;

    /* The inset shadow gives depth and makes the thumb look 3 dimensional and the other one shows a subtle effect of the shadow it creates because of the light source coming from the top left of the page */
    box-shadow:
                inset .8em .8em 5px -8px rgba(255, 255, 255, .4),
                inset -.4em -.4em 10px -3px rgba(0,0,0,.2),
                0.7em 0.5em 7px -0.5em rgba(0,0,0,.4);;

    cursor: pointer;
}

/*All the same stuff for firefox */
.range-style::-moz-range-thumb {
    width: 3em;
    height: 3em;
    margin: .5em 0;
    background: #181a3e;
    border-radius: 100%;
    box-shadow:
                inset .8em .8em 5px -8px rgba(255, 255, 255, .4),
                inset -.4em -.4em 10px -3px rgba(0,0,0,.2),
                0.7em 0.5em 7px -0.5em rgba(0,0,0,.4);
    cursor: pointer;
    border: 0;
}

/* RUNNABLE TRACK -> represented by the indented carve in which the ball (thumb) moves */
/* Webkit browsers */
.range-style::-webkit-slider-runnable-track {
    background: transparent;
    width: 100%;
    height: 4em;
    padding: 0 1em;
    border-radius: 2em;

    /* These shadow are what create the skeumorphic indent on the track. The first one is dark to show places in the indent that light don't reach and the second one shows places where light meets thereby creating the illusion of depth */
    box-shadow:
                inset .6em 1em 10px rgba(0,0,0,.15),
                inset -.6em -1em 10px rgba(255, 255, 255, .415);
}

.dark .range-style::-webkit-slider-runnable-track {
    box-shadow:
                inset .6em 1em 10px rgba(255, 255, 255, 0.422),
                inset -.6em -1em 10px rgba(255, 255, 255, 0.03);
}

/* For firefox */
.range-style::-moz-range-track {
    background: transparent;
    width: 100%;
    height: 4em;
    padding: 0 1em;
    border-radius: 2em;
    box-shadow:
                inset .6em 1em 10px rgba(0,0,0,.15),
                inset -.6em -1em 10px rgba(255, 255, 255, .415);
}

/* For the numbering in the range's design - doesn't show on firefox but shows on chrome and opera */
.range-inside {
    position: absolute;
    text-align: center;
    color: #c4c4c4;
    font-size: 1em;

    /*Serves to spread the letters to fit the whole width of the track */
    top: 0; bottom: 0;
    left: 0; right: 0;

    /* Makes the letters look embossed adding to the skeumorphic theme of the design */
    text-shadow: .5px .5px 0.9px rgba(0,0,0, .4);

    z-index: -1;
}
</style>
