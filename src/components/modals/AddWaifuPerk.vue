<template>
  <Modal label="Propose a Waifu Perk" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full">
      <div class="cursor-pointer hover:text-red-500 text-red-800 dark:text-red-300" @click="showRules = true">
        Specific Waifu Perk Submission Rules
      </div>
      <div class="flex gap-2">
        <Input v-model="title" class="flex-grow" placeholder="Perk title" :error-message="errors.title" />
        <Input v-model.number="cost" class="w-24" label="Cost" :error-message="errors.cost" />
        <Input v-if="costT" v-model.number="costT" class="w-24" label="IMG" :error-message="errors.costT" />
      </div>
      <div class="flex gap-2">
        <Input v-model="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="source" class="flex-grow" placeholder="Source link, like a google doc or forum post." :error-message="errors.source" />
      </div>
      <Tiers v-model="tier" class="whitespace-nowrap" label="Tier granted by Perk" :error-message="errors.tier" />
      <CharacterInput class="flex-grow" placeholder="Waifu" :error-message="errors.waifu" @onChar="(char) => (waifu.push(char.n), waifuUID.push(char.u), from = char.w, tempTier = char.t)" />
      <div v-for="w, i in waifu" :key="w" class="mx-2 flex gap-2">
        <div class="flex gap-1 items-center">
          <div><span class="text-orange-400">{{ w }} </span> from <span class="text-violet-400">{{ from }}</span></div>
          <div class="cursor-pointer text-gray-500 hover:text-red-500 flex gap-2 items-center" title="Share" @click="(waifu.pop(), waifuUID.pop())">
            <fluent:delete-20-filled />
          </div>
        </div>
      </div>
      <TextArea v-model="desc" placeholder="Perk description" :rows="'4'" :error-message="errors.desc" />
      <Input v-model="image" placeholder="Image link" :error-message="errors.image" />
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex gap-2">
        <Button v-if="localPerksExist" icon="fa-solid:clipboard-list" title="Local Perks Manager" bg-color="bg-blue-600" @click="togglePerksManager" />
        <Button label="Add Locally" class="flex-grow" bg-color="bg-orange-600" @click="addLocally" />
        <Button :disabled="!buttonActive" label="Send" class="flex-grow" bg-color="bg-red-700" @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'" />
      </div>
    </div>
    <LocalPerksManager v-if="showPerksManager" @click="showPerksManager = false" @sendDelete="deletePerk" @sendEdit="editPerk" />
    <Modal v-if="showRules" label="Rules" @click="showRules=false">
      <div class="p-2 flex flex-col gap-2 min-h-0 w-full">
        <p>Specific Waifu Perks are perks created to grant waifu access to abilities and forms that would be <b>unobtainable</b> to them <b>without external means</b>. This could be via an artifact that is not typically part of their iconic equipment, a powerup granted by a third party, an alternate form that does not qualify for a separate catalog entry or a fusion form that requires another waifu to be achieved. A powerup that can be unlocked through regular training is an example of an upgrade that <b>does not</b> qualify to be locked behind a Specific Waifu Perk.</p>
        <p>It is <b>highly recommended</b> to check the Setting Specific Rules of a world before submitting a specific or generic waifu perk. More often than not these rules cover the specifics of an alternate form or powerup of a waifu for which a perk can be made, making the submission of such a perk redundant. Perks submitted to unlock powerups or forms addressed by the Setting Specific Rules will be rejected. </p>
        <p>Low-effort perks of one or two sentences, as well as those written poorly, will have increasingly low chances of being accepted. Perks also require a good quality and meaningful image. </p>
      </div>
    </Modal>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { findIndex } from 'lodash-es'
import { randomString, showAddPerk, togglePerksManager, showPerksManager, proposeWaifuPerk } from '~/logic'
import { CHAR_COSTS, CHAR_COSTS_TICKET } from '~/data/constants'
import { localPerks } from '~/logic/localPerks'

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)
const showRules = ref(false)

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    source: zod.string(),
    cost: zod.number().min(-1000, 'Minimum cost is -1000'),
    costT: zod.number().min(-10, 'Minimum IMG cost is -10'),
    tier: zod.number().min(0, 'There is no tiers less than 0'),
    from: zod.string().min(1, 'World is required'),
    waifu: zod.string().min(1, 'Name is required').array().min(1, 'At least one companion is required'),
    waifuUID: zod.number().min(1, 'UID is required').array().min(1, 'At least one companion is required'),
    image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
    desc: zod.string().max(5000, 'Max length is 5000 chars').nonempty('Description is required'),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    author: '',
    source: '',
    cost: 0,
    costT: 0,
    tier: 0,
    desc: '',
    from: '',
    waifu: [],
    waifuUID: [],
    image: '',
    requires: [],
  },
})

const { value: title } = useField<string>('title')
const { value: source } = useField<string>('source')
const { value: author } = useField<string>('author')
const { value: cost } = useField<number>('cost')
const { value: costT } = useField<number>('costT')
const { value: desc } = useField<string>('desc')
const { value: image } = useField<string>('image')
const { value: waifu } = useField<string[]>('waifu')
const { value: waifuUID } = useField<string[] | number[]>('waifuUID')
const { value: from } = useField<string[]>('from')
const { value: tier } = useField<string[]>('tier')

const tempTier = ref(0)

const submittedPerk = computed(() => {
  return {
    uid: randomString(),
    title: title.value,
    dlc: author.value,
    cost: cost.value,
    costT: costT.value,
    desc: desc.value,
    image: image.value,
    from: from.value,
    waifu: waifu.value,
    waifuUID: waifuUID.value,
    tier: tier.value,
  }
})

const localPerksExist = computed(() => Object.values(localPerks.value).some(x => x.length))

watch([tier, () => waifu.value.length], () => {
  if (tier.value && waifuUID.value.length)
    cost.value = (CHAR_COSTS[+tier.value] || 0) - (CHAR_COSTS[tempTier.value] || 0)
  if (+tier.value > 10)
    costT.value = -CHAR_COSTS_TICKET[+tier.value] || 0
  if (tempTier.value > 10)
    costT.value = CHAR_COSTS_TICKET[tempTier.value] || 0
})

const addPerk = handleSubmit((values) => {
  proposeWaifuPerk({ ...values, date: new Date().toString() }, () => successMessage.value = 'Perk was sent successfully, await until I review and add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

function addLocally() {
  if (localPerks.value['Specific waifu perk'])
    localPerks.value['Specific waifu perk'].push(submittedPerk.value)
  else
    localPerks.value['Specific waifu perk'] = [submittedPerk.value]
  showAddPerk.value = false
}

function deletePerk(perk: any) {
  localPerks.value['Specific waifu perk'].splice(findIndex(localPerks.value['Specific waifu perk'], { uid: perk.uid }), 1)
}

function editPerk(perk: any) {
  title.value = perk.title
  cost.value = perk.cost
  desc.value = perk.desc
  author.value = perk.dlc
  image.value = perk.image
  tier.value = perk.tier
  cost.value = perk.cost
  costT.value = perk.costT
  waifu.value = perk.waifu
  waifuUID.value = perk.waifuUID
  from.value = perk.from
  togglePerksManager()
}

</script>
