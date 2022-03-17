<template>
  <div class="p-2 flex flex-col gap-2 h-full scrollbar overflow-y-auto">
    <div v-if="totalPoints" class="flex flex-col gap-2">
      <div class="flex justify-between">
        <div>
          Remaining / Total points:
          <span class="text-red-500 text-lg">{{ leftPoints }}</span>
          /
          <span class="text-green-500 text-lg">{{ totalPoints }}</span>
        </div>
        <Button label="Reset" size="Small" @click="resetPoints" />
      </div>
      <div class="flex flex-wrap gap-2 justify-between">
        <NumberInput
          v-model="investedSize"
          label="Diameter:"
          :min="0"
          :max="investedSize + leftPoints"
        />
        <NumberInput
          v-model="investedTrigger"
          label="Trigger:"
          :min="0"
          :max="Math.min(leftPoints + investedTrigger, 5)"
        />
        <NumberInput
          v-model="investedTier"
          label="Tier:"
          :min="0"
          :max="Math.min(leftPoints + investedTier, 5)"
        />
        <NumberInput
          v-model="investedRequirement"
          label="Requirement:"
          :min="0"
          :max="leftPoints + investedRequirement"
        />
        <NumberInput
          v-model="investedEffect"
          label="Effect:"
          :min="0"
          :max="Math.min(leftPoints + investedEffect, 8)"
        />
        <NumberInput
          v-model="investedNetwork"
          label="Network:"
          :min="0"
          :max="leftPoints + investedNetwork"
        />
      </div>
      <div>
        You can make circle
        <span class="text-green-500 text-lg">{{ diameter.toLocaleString() }}</span>m in diameter
        that need to be triggered by
        <span class="text-amber-500">{{ trigger }}</span> and
        will take
        <span class="text-green-500 text-lg">{{ toReadableTime(time) }}</span> to capture
        <span :class="tier.cl">{{ tier.val }}</span> targets and it will be undetectable to
        <span :class="hidden.cl">{{ hidden.val }}</span> characters.
      </div>
      <div>
        Specialty circles effect last
        <span class="text-green-500 text-lg">{{ effect }}</span>
      </div>
      <!-- <div class="circle-container mx-auto my-16">
        <div ref="circle" class="magic-circle"></div>
      </div> -->
    </div>
    <Desc v-else desc="You don't have a Ritual Circle perk, so no rituals for you buddy." />
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { toReadableTime } from '~/logic'
import { useStore } from '~/store/store'
import { usePlayStore } from '~/store/play'
const { binding } = useStore()

const {
  investedSize,
  investedRequirement,
  investedTrigger,
  investedTier,
  investedEffect,
  investedNetwork,
} = usePlayStore()

// const circle = ref<HTMLElement | null>(null)

const totalPoints = computed(() => {
  let points = 0
  if (findIndex(binding.value, { title: 'Ritual Circle' }) !== -1) points += 6
  const ind = findIndex(binding.value, { title: 'Greater Bandwidth' })
  if (ind !== -1) points += binding.value[ind].count || 0
  return points
})

const leftPoints = computed(() => totalPoints.value - investedSize.value - investedRequirement.value
  - investedTrigger.value - investedTier.value - investedEffect.value - investedNetwork.value)

const diameter = computed(() => Math.pow(3, investedSize.value) || 1)
const time = computed(() => {
  const tm = 10 * 24 * 60 * 60 * (Math.pow(3, -investedRequirement.value) || 1)
  if (tm > 1) return Math.round(tm)
  else return Math.round(tm * 1000) / 1000
})
const trigger = computed(() => {
  switch (investedTrigger.value) {
    case 0:
      return 'Constant Incantation'
    case 1:
      return 'Activation Incantation'
    case 2:
      return 'Extended Duration'
    case 3:
      return 'Indefinite Duration'
    case 4:
      return 'Always On'
    case 5:
      return 'App Trigger'

    default:
      return 'App Trigger'
  }
})
const tier = computed(() => {
  switch (investedTier.value) {
    case 0:
      return { val: 'Blue-star', cl: 'text-blue-400' }
    case 1:
      return { val: 'Copper-star', cl: 'text-red-400' }
    case 2:
      return { val: 'Silver-star', cl: 'text-gray-300' }
    case 3:
      return { val: 'Gold-star', cl: 'text-yellow-400' }
    case 4:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
    default:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
  }
})
const hidden = computed(() => {
  switch (investedTier.value) {
    case 0:
      return { val: 'None', cl: 'text-gray-400' }
    case 1:
      return { val: 'Blue-star', cl: 'text-blue-400' }
    case 2:
      return { val: 'Copper-star', cl: 'text-red-400' }
    case 3:
      return { val: 'Silver-star', cl: 'text-gray-300' }
    case 4:
      return { val: 'Gold-star', cl: 'text-yellow-400' }
    case 5:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
    default:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
  }
})

const effect = computed(() => {
  switch (investedEffect.value) {
    case 0:
      return '10 minutes'
    case 1:
      return '1 hour'
    case 2:
      return '8 hours'
    case 3:
      return '24 hours'
    case 4:
      return '1 week'
    case 5:
      return '1 month'
    case 6:
      return '3 months'
    case 7:
      return '1 year'
    case 8:
      return 'Indefinite'

    default:
      return 'Indefinite'
  }
})

function resetPoints() {
  investedSize.value = 0
  investedRequirement.value = 0
  investedTrigger.value = 0
  investedTier.value = 0
  investedEffect.value = 0
  investedNetwork.value = 0
}

// const maxChildsPerElements = 2
// const maxNumberOfFirstChilds = 4
// const minNumberOfFirstChilds = 2
// const minNumberOfSubcircles = 0
// const maxNumberOfSubcircles = 6
// const chanceForFormulas = 0.5

// const longformulas
//   = [
//     'Visita Interiora Terrae Rectificando Invenies Occultum Lapidem Veram Medicinam.',
//     'Caelum non animum mutant qui trans mare currunt',
//     'cessante ratione legis cessat ipsa lex',
//     'contra vim mortis non crescit herba in hortis',
//     'crescat scientia vita excolatur',
//     'cuius est solum eius est usque ad coelum et ad inferos',
//     'cuncti adsint meritaeque expectent praemia palmae',

//   ]
// const formulas
//   = [
//     'admirandum naturæ operationem',
//     'caput mortuum',
//     'carpe noctem',
//     'clavis aurea',
//     'camera obscura',
//     'capax infiniti',
//     'caput inter nubila',
//     'anima magica abscondita',
//     'causa mortis',
//     'ceteris paribus',
//     'compos mentis',
//     'concilio et labore',
//     'concordia cum veritate',
//     'concordia parvae res crescunt',
//     'condicio sine qua non',
//     'contemptus mundi',
//     'contraria contrariis curantur',
//     'cor ad cor loquitur',
//     'cor aut mors',
//     'cor unum',
//     'corpus vile',
//     'corruptio optimi pessima',
//     'corvus oculum corvi non eruit',
//     'crescente luce',
//     'cupio dissolvi',
//     'auctus ex dimicatione',
//     'voluntas vincit omnia',
//     'concordia magica',
//   ]
// const shortformulas
//   = [
//     'Creo',
//     'Rego',
//     'Perdo',
//     'Intellego',
//     'Muto',
//     'Ignem',
//     'Aqua',
//     'Terram',
//     'Auram',
//     'Herbam',
//     'Corpus',
//     'Mentem',
//     'Vim',
//     'Animal',
//     'Imagonem',
//     'Vitae',
//     'Nocte',
//     'Diem',
//   ]

// function addElementWithClass(container: HTMLElement, cls: string, content = '') {
//   const el = document.createElement('div')
//   el.classList.add(...cls.split(' '))
//   if (content) el.textContent = content
//   container.append(el)
//   return el
// }

// function getRandomLongFormula() {
//   const dice = Math.floor((Math.random() * longformulas.length))
//   return longformulas[dice]
// }

// function getRandomFormula() {
//   const dice = Math.floor((Math.random() * formulas.length))
//   return formulas[dice]
// }

// function getRandomShortFormula() {
//   const dice = Math.floor((Math.random() * shortformulas.length))
//   return shortformulas[dice]
// }

// function appendSymbol(element: HTMLElement) {
//   // symbols goes from 128768 to 128883
//   const code = (128768 + Math.floor((Math.random() * 114)))
//   const symbol = document.createElement('div')
//   symbol.classList.add('symbol')
//   symbol.innerHTML = `&#${code}`
//   element.append(symbol)

//   const dice = Math.floor((Math.random() * 3))
//   if (dice === 1) symbol?.classList.add('lighter')
//   else if (dice === 2) symbol?.classList.add('lighter')

//   return symbol
// }

// function makeMagicCircle() {
//   /* generates random elements */
//   let dice = minNumberOfFirstChilds + Math.floor(Math.random() * (maxNumberOfFirstChilds - minNumberOfFirstChilds))
//   for (let i = 0; i < dice; i++)
//     appendRandomElement(circle.value, maxChildsPerElements)

//   /* generates subcircles */
//   dice = minNumberOfSubcircles + Math.floor(Math.random() * (maxNumberOfSubcircles - minNumberOfSubcircles))
//   for (let i = 0; i < dice; i++)
//     appendCircle(circle.value, 0)

//   if (Math.random() > 0.75) circle.value?.classList.add('doubled')

//   dice = Math.floor((Math.random() * 2))
//   if (dice === 1) circle.value?.classList.add('lighter')
//   else if (dice === 2) circle.value?.classList.add('lighter')

//   appendSymbol(circle.value)
// }

// function appendRandomElement(element: HTMLElement, maxChilds = 0) {
//   // Random type
//   let dice = Math.floor((Math.random() * 3))
//   let child = null

//   switch (dice) {
//     case 0: child = appendCircle(element, 2); break
//     case 1: child = appendSquare(element); break
//     case 2: child = appendTriangle(element); break
//   }

//   // Make childs
//   if (dice !== 3) {
//     dice = Math.floor((Math.random() * maxChilds))
//     if (dice > 0) {
//       for (let i = 0; i < dice; i++)
//         appendRandomElement(child, maxChilds)
//     }
//   }

//   // Random weight
//   dice = Math.floor((Math.random() * 3))
//   if (dice === 1) child?.classList.add('lighter')
//   else if (dice === 2) child?.classList.add('lighter')

//   // Random style
//   dice = Math.floor((Math.random() * 2))
//   if (dice === 1) child?.classList.add('dotted')
// }

// function appendCircle(element: HTMLElement, maxSubcircles: number) {
//   const circle = addElementWithClass(element, 'magic-circle')

//   // Random position
//   const dice = Math.random()
//   if (dice > 0.9) circle.classList.add('top')
//   else if (dice > 0.8) circle.classList.add('top-right')
//   else if (dice > 0.7) circle.classList.add('right')
//   else if (dice > 0.6) circle.classList.add('bottom-right')
//   else if (dice > 0.5) circle.classList.add('bottom')
//   else if (dice > 0.4) circle.classList.add('bottom-left')
//   else if (dice > 0.3) circle.classList.add('left')
//   else if (dice > 0.2) circle.classList.add('top-left')

//   // is doubled ?
//   if (Math.random() > 0.75) circle.classList.add('doubled')

//   // make an inner symbol ?
//   appendSymbol(circle)

//   // has formula ?
//   // if (Math.random() > chanceForFormulas)
//   //   addElementWithClass(element, 'formula', `${getRandomLongFormula()}`)

//   /* generates subcircles */
//   if (maxSubcircles > 0) {
//     const dice = Math.floor(Math.random() * (maxSubcircles))
//     for (let i = 0; i < dice; i++)
//       appendCircle(circle, maxSubcircles - 1)
//   }

//   return circle
// }

// function appendSquare(element: HTMLElement) {
//   const square = addElementWithClass(element, 'square')
//   // Has formulas ?
//   if (Math.random() > chanceForFormulas) {
//     const dice = Math.floor(Math.random() * 2)
//     // simple formula
//     if (dice === 0) {
//       addElementWithClass(square, 'formula', `${getRandomFormula()}`)
//     }
//     // side formulas
//     else if (dice === 1) {
//       addElementWithClass(square, 'formula up', `${getRandomShortFormula()}`)
//       addElementWithClass(square, 'formula right', `${getRandomShortFormula()}`)
//       addElementWithClass(square, 'formula down', `${getRandomShortFormula()}`)
//       addElementWithClass(square, 'formula left', `${getRandomShortFormula()}`)
//     }
//   }

//   return square
// }

// function appendTriangle(element: HTMLElement) {
//   const triangle = addElementWithClass(element, 'triangle')
//   if (Math.random() > 0.5)
//     triangle?.classList.add('reverse')

//   // Has formulas ?
//   if (Math.random() > chanceForFormulas) {
//     const dice = Math.floor(Math.random() * 2)
//     // simple formula
//     if (dice === 0) {
//       addElementWithClass(triangle, 'formula', `${getRandomFormula()}`)
//     }
//     // side formulas
//     else if (dice === 1) {
//       addElementWithClass(triangle, 'formula base', `${getRandomShortFormula()}`)
//       addElementWithClass(triangle, 'formula right', `${getRandomShortFormula()}`)
//       addElementWithClass(triangle, 'formula left', `${getRandomShortFormula()}`)
//     }
//   }

//   return triangle
// }

// onMounted(() => makeMagicCircle())

</script>

<style>
.circle-container {
  --color: #454647;
  --bordercolor: #e74c3c;
  --lightcolor: #6c6c6d;
  --lightercolor: #828385;
  --lightestcolor: #b3b5b8;
  --bgcolor: #fafbfc;
  --circleradius: 250px;
}

@font-face {
  font-family: Quivira;
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/24822/Quivira.otf")
    format("opentype");
}

.magic-circle {
  display: block;
  position: relative;
  width: var(--circleradius);
  height: var(--circleradius);
  border: 1px solid var(--lightcolor);
  border-radius: calc(var(--circleradius) * 0.5);
}

.magic-circle.lighter {
  border: 1px solid var(--lightercolor);
}

.magic-circle.lightest {
  border: 1px solid var(--lightestcolor);
}

.magic-circle.dotted {
  border-style: dotted;
}

.magic-circle.doubled:after {
  display: block;
  content: "";
  width: 108%;
  height: 108%;
  border: 1px solid var(--lightcolor);
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.magic-circle.dotted:after {
  border-style: dotted;
}

.magic-circle .formula {
  font-family: Quivira;
  transform: translate(47%, 0);
  height: 100%;
  font-size: 0.8em;
  text-transform: uppercase;
  color: var(--lightcolor);
}

.magic-circle .formula span {
  height: 50%;
  position: absolute;
  width: 1em;
  padding-top: 0.25em;
  left: 0;
  top: 0;
  transform-origin: bottom center;
}

/* .generate-chars(72);

    .generate-chars(@n, @i: 1) when (@i =< @n) {
      .char@{i} {
        transform: rotate(@i * 5deg);
      }
      .generate-chars(@n, (@i + 1));
    } */

.magic-circle .magic-circle {
  width: 48%;
  height: 48%;
  position: absolute;
  left: 26%;
  top: 26%;
  font-size: 0.6em;
  border: 1px solid var(--lightcolor);
  border-radius: calc(var(--circleradius) * 0.5);
}

.magic-circle .magic-circle.top {
  top: -23%;
}
.magic-circle .magic-circle.bottom {
  top: 77%;
}
.magic-circle .magic-circle.left {
  left: -23%;
}
.magic-circle .magic-circle.right {
  left: 77%;
}
.magic-circle .magic-circle.top-left {
  top: -11%;
  left: -11%;
}
.magic-circle .magic-circle.top-right {
  top: -11%;
  left: 62%;
}
.magic-circle .magic-circle.bottom-left {
  top: 62%;
  left: -11%;
}
.magic-circle .magic-circle.bottom-right {
  top: 62%;
  left: 62%;
}

.symbol {
  position: absolute;
  font-family: Quivira;
  font-size: 3em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--lightcolor);
}
.symbol.lighter {
  color: var(--lightercolor);
}

.symbol.lightest {
  color: var(--lightestcolor);
}

.square {
  position: absolute;
  border: 1px solid var(--lightcolor);
  width: 70%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.square.lighter {
  border: 1px solid var(--lightercolor);
}

.square.lightest {
  border: 1px solid var(--lightestcolor);
}

.square.dotted {
  border-style: dotted;
}

.square .formula {
  font-family: Quivira;
  font-size: 0.8em;
  text-align: center;
  text-transform: uppercase;
  color: var(--lightcolor);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.square .formula.up {
  top: 0%;
  transform: translate(-50%, 0%);
}

.square .formula.down {
  top: 100%;
  margin-top: -1em;
  transform: translate(-50%, 0%) rotate(180deg);
}

.square .formula.right {
  left: 100%;
  transform: translate(-70%, -50%) rotate(90deg);
}

.square .formula.left {
  left: 0%;
  transform: translate(-35%, -50%) rotate(-90deg);
}

.square .magic-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.square .triangle {
  width: 100%;
  left: 0;
  top: 100%;
}
.square .triangle:before {
  width: 112%;
  transform: rotate(-63.3deg);
}

.square .triangle:after {
  width: 112%;
  transform: rotate(63.3deg);
  left: -11.5%;
}

.square .triangle.reverse {
  width: 100%;
  left: 0;
  top: -0.6%;
}
.square .triangle.reverse:before {
  width: 112%;
  transform: rotate(-63.3deg);
}

.square .triangle.reverse:after {
  width: 112%;
  transform: rotate(63.3deg);
  left: -11.5%;
}

.square .triangle .square {
  width: calc(var(--circleradius) * 0.353);
  height: calc(var(--circleradius) * 0.353);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  border: 1px solid var(--lightcolor);
}

.square .triangle .square .triangle {
  width: 100%;
  left: 0;
  top: 100%;
}
.square .triangle .square .triangle:before {
  width: 112%;
  transform: rotate(-63.3deg);
}

.square .triangle .square .triangle:after {
  width: 112%;
  transform: rotate(63.3deg);
  left: -11.5%;
}

.square .triangle .square .triangle.reverse {
  width: 100%;
  left: 0;
  top: 0%;
}
.square .triangle .square .triangle.reverse:before {
  width: 112%;
  transform: rotate(-63.3deg);
}

.square .triangle .square .triangle.reverse:after {
  width: 112%;
  transform: rotate(63.3deg);
  left: -11.5%;
}

.triangle {
  position: absolute;
  width: 88%;
  height: 0;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: var(--lightcolor);
  top: 75.5%;
  left: 6%;
}
.triangle.reverse {
  transform: rotate(180deg);
  top: 24.5%;
}

.triangle:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 0;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: var(--lightcolor);
  transform-origin: 0% 50%;
  transform: rotate(-60deg);
}

.triangle:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: var(--lightcolor);
  transform-origin: 100% 50%;
  transform: rotate(60deg);
}

.triangle.lighter {
  background: var(--lightercolor);
}
.triangle.lighter:before,
.triangle.lighter:after {
  background: var(--lightercolor);
}

.triangle.lightest {
  background: var(--lightestcolor);
}
.triangle.lightest:before,
.triangle.lightest:after {
  background: var(--lightestcolor);
}

.triangle.dotted {
  border-style: dotted;
}
.triangle.dotted:before,
.triangle.dotted:after {
  border-style: dotted;
}

.triangle .formula {
  font-family: Quivira;
  font-size: 0.8em;
  text-align: center;
  text-transform: uppercase;
  color: var(--lightcolor);
  position: absolute;
  top: -var(--circleradius) * 0.27;
  left: 50%;
  transform: translate(-50%, -50%);
}
.triangle .formula.base {
  top: 0%;
  margin-top: -1.5em;
  transform: translate(-50%, 0%);
}

.triangle .formula.right {
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  transform-origin: 100% 50%;
  transform: rotate(60deg) translate(0, 0.5em);
}

.triangle .formula.left {
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  transform-origin: 0% 50%;
  transform: rotate(-60deg) translate(0, 0.5em);
}

.triangle .symbol {
  transform: translate(-50%, -450%);
}

.triangle .square {
  width: calc(var(--circleradius) * 0.4);
  height: calc(var(--circleradius) * 0.4);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  border: 1px solid var(--lightcolor);
}

.triangle .magic-circle {
  width: calc(var(--circleradius) * 0.5);
  height: calc(var(--circleradius) * 0.5);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
}
.triangle .magic-circle .triangle .magic-circle {
  width: calc(var(--circleradius) * 0.25);
  height: calc(var(--circleradius) * 0.25);
}
 div.magic-circle.bottom.lighter.dotted > div.triangle.reverse.lighter > div.magic-circle.top-left.lighter
.triangle .magic-circle .triangle .magic-circle .triangle .magic-circle {
  width: calc(var(--circleradius) * 0.125);
  height: calc(var(--circleradius) * 0.125);
}

.triangle .triangle {
  width: calc(var(--circleradius) * 0.44);
  left: 50%;
  top: calc(-var(--circleradius) * 0.125);
  transform: translate(-50%, -50%);
}
.triangle .triangle.reverse {
  transform: translate(-50%, -50%) rotate(180deg);
  top: calc(-var(--circleradius) * 0.38);
}

.triangle .triangle .triangle {
  width: calc(var(--circleradius) * 0.21);
  left: 50%;
  top: calc(-var(--circleradius) * 0.07);
  transform: translate(-50%, -50%);
}
.triangle .triangle .triangle.reverse {
  transform: translate(-50%, -50%) rotate(180deg);
  top: calc(-var(--circleradius) * 0.19);
}
</style>
