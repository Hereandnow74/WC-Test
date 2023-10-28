<template>
  <div class="perspect-[1000px] flex-grow w-full" @click="deleteOrAccept">
    <div
      v-if="char.n"
      class="h-full transform transition-transform duration-[0s] preserve-3d relative ease-in border border-gray-700"
      :class="isRolling ? 'animate-spin' : ''"
    >
      <CompanionCard
        :font-size="text === 'xs' ? 'text-xs' : 'text-lg'"
        :show-tags="showTags"
        :text="text"
        :char="char"
        :lazy="false"
        class="absolute w-full h-full border border-gray-700 backface-hidden"
      />
      <div
        class="absolute rounded w-full h-full transition-opacity ease-in duration-75 flex flex-wrap justify-center items-center text-opacity-30 text-2xl"
        :class="[isRevealing ? '!opacity-5 !duration-[2s]' : '', tierColor[char.t - 1]]"
      >
        <ant-design:star-filled v-for="n in stars[char.t - 1]" :key="n" />
      </div>
      <div
        class="absolute rounded w-full h-full box--gradient silver backface-hidden transform rotate-y-180 flex  flex-wrap justify-center items-center text-opacity-30  text-gray-200 text-2xl"
        :class="tierColor[char.t - 1]"
      >
        <ant-design:star-filled v-for="n in stars[char.t - 1]" :key="n" />
      </div>
      <div
        class=" opacity-0 absolute rounded w-full h-full flex  flex-wrap justify-center items-center text-4xl"
        :class="[deleteOrAcceptMode ? 'text-green-500 bg-gray-600' : 'text-red-500 bg-gray-600', tookAction ? 'opacity-80' : 'hover:opacity-60']"
      >
        <fa-solid:check v-if="deleteOrAcceptMode" />
        <fluent:delete-20-filled v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const props = defineProps({
  char: {
    type: Object,
    default: () => ({}),
  },
  isRolling: {
    type: Boolean,
    default: false,
  },
  isRevealing: {
    type: Boolean,
    default: false,
  },
  showTags: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: 'base',
  },
})

const { companions } = useStore()

const tookAction = ref(false)

const tierColor = [
  'box--gradient blue text-gray-200',
  'box--gradient blue text-gray-200',
  'box--gradient blue text-gray-200',
  'box--gradient red text-gray-200',
  'box--gradient red text-gray-200',
  'box--gradient red text-gray-200',
  'box--gradient silver text-gray-700',
  'box--gradient silver text-gray-700',
  'box--gradient silver text-gray-700',
  'box--gradient gold text-gray-200',
  'box--gradient dark-gold text-gray-200',
  'box--gradient dark-gold text-gray-200',
  'box--gradient dark-gold text-gray-200',
]

const stars = [
  1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 7,
]

const deleteOrAcceptMode = computed(() => props.char.u === 999999)

function deleteOrAccept() {
  if (tookAction.value) return
  if (deleteOrAcceptMode.value)
    companions.value.push({ uid: Math.floor(Math.random() * 1000000), name: props.char.n, world: props.char.w, tier: props.char.t, priceTier: 0, method: 'buy', tags: props.char.b })
  else
    companions.value.splice(companions.value.findIndex(c => c.uid === props.char.u), 1)
  tookAction.value = true
}

</script>

<style>
@keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}
.animate-spin {
  -webkit-animation: spin 0.7s linear infinite;
  animation: spin 0.7s linear infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(30deg);
  }
  80% {
    transform: translateX(-100%) translateY(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(30deg);
  }
}

.wrapper {
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
}

.box--gradient {
  display: flex;
  overflow: hidden;
}
.box--gradient:after {
  content: "";
  top: 0;
  transform: translateX(100%) rotate(30deg);
  width: 300%;
  height: 300%;
  position: absolute;
  z-index: 1;
  animation: shine 3s infinite ease-in;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(128, 186, 232, 0) 100%
  );
}
.box--gradient.silver {
  background: linear-gradient(to bottom, #bcc6cc, #eee, #bcc6cc);
}
.box--gradient.gold {
  background: linear-gradient(to bottom, #c39738, #deb761, #c39738);
}
.box--gradient.platinum {
  background: linear-gradient(to bottom, #d5d7e5, #eee, #d5d7e5);
}
.box--gradient.blue {
  background: linear-gradient(to bottom, #4d61f7, rgb(28, 49, 243), #4d61f7);
}
.box--gradient.red {
  background: linear-gradient(to bottom, #ce0f0f, rgb(180, 48, 48), #ce0f0f);
}
.box--gradient.dark-gold {
  background: linear-gradient(to bottom, rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%,
        rgba(255, 0, 0, 1) 100%);
}
</style>
