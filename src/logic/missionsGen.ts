import { DBCharacter } from 'global'
import { sample, shuffle } from 'lodash-es'
import { allWorldsNoCondition, useAllChars } from '../data/constants'

const { allCharsComp } = useAllChars()

export class MissionGenerator {
  scope: 'Quick' | 'Standard' | 'Grand'
  title = 'Title'
  description = 'Description'
  conditions: { value: string }[] = []
  reward = '0 credits'
  loca = 'Generic'
  allChars = ref<DBCharacter[]>([])
  constructor(scope: MissionGenerator['scope'] = 'Quick') {
    this.scope = scope
    this.allChars = allCharsComp
  }

  targetCheck(targetWorld: string) {
    this.allChars = ref(allCharsComp.value.filter(char => char.w === targetWorld || char.d === targetWorld))
  }

  capture() {
    const conditions = [
      'Don\'t use any bindings',
      'Don\'t use any lures',
      'Don\'t use any lures or bindings',
      'You must capture them personally',
      'You can only use companions 1 tier lower than target',
      'Capture must be done only by 1 member of your retinue of the same or less tier than target',
      'You can only use "Confession Capture" without 3rd party mind-control',
      'You must use locals as an proxy to capture your target',
    ]

    const targets = this.allChars.value.filter(x => x.t >= 5 || (x.b && x.b.length >= 4))
    const target = sample(targets)
    if (target) {
      this.title = `Capture: <i>${target.n}</i>`
      this.description = `Capture [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b], mission in and out, just a 20 minute adventure.`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = `1 ticket for a T${target.t} companion`
    }
    return this
  }

  kill() {
    const conditions = [
      'You or your retinue member must do it in 1v1 battle',
      'Your companions must do it, do not help',
      'Use only native power/technology',
      'You must do it yourself',
      'You can only use companions 1 tier lower than target',
      'Do not get found out',
      'Replace filled individual with a puppet',
      'You must use locals as an proxy to kill your target',
    ]

    const targets = this.allChars.value.filter(x => x.b && x.b.some(x => ['ev', 'vn'].includes(x)) && x.t >= 4)
    const target = sample(targets)
    if (target) {
      this.scope = 'Quick'
      this.title = `Eliminate: <i>${target.n}</i>`
      this.description = `Eliminate [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b], they definitely deserve it, or not, who cares!`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = 'Half of the listed target cost'
    }
    // In case of no target generate a generic mission
    else {
      this.scope = 'Quick'
      this.title = 'Eliminate: Someone'
      this.description = 'Eliminate a target from your current world, their tier should be a one higher than highest in your retinue, they definitely deserve it, or not, who cares!'
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = 'Current world'
      this.reward = 'A fully programmable android with their powerset and maleable AI'
    }
    return this
  }

  conquer() {
    const conditions = [
      'Only companions with less than average or average tier for the world',
      'Your companions must do it, do not help',
      'Use only native power/technology',
      'You must do it yourself',
      'Do not be noticed by general population',
      'Use diplomacy, or copious amounts of mind-control',
      'Only war is the answer',
    ]

    const world = sample(allWorldsNoCondition.value)
    if (world) {
      this.scope = 'Grand'
      this.title = `Conquer: <i>${world.worldName}</i>`
      this.description = `Conquer [b]${world.worldName}(DR${world.rating})[/b], you need to became unquestionable ruler of this world. You need to stay on the throne for at least an year and have inheritor.`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = `${world.worldName}${world.condition ? ` - ${world.condition}` : ''}`
      this.reward = 'Double of the world budget'
    }
    return this
  }

  god() {
    const conditions = [
      'Only companions with less than average or average tier for the world',
      'Your companions must do it, do not help',
      'Hijack local cult or religion',
      'You must do it yourself',
      'Your religion should have a lewd theme',
      'Wage a holy war',
    ]

    const world = sample(allWorldsNoCondition.value)
    if (world) {
      this.scope = 'Grand'
      this.title = `Became a god in <i>${world.worldName}</i>`
      this.description = `Be considered a god in [b]${world.worldName}(DR${world.rating})[/b], you need to be worshipped by at least 51% (counted at the moment of arrival) of the non-retinue sentient population.`
      this.conditions = [{ value: 'Can\'t use 3rd party mind-control.' }, { value: sample(conditions) as string }]
      this.loca = `${world.worldName}${world.condition ? ` - ${world.condition}` : ''}`
      this.reward = '2 IMG tickets'
    }
    return this
  }

  matchmaker() {
    const conditions = [
      'No mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Do it by force',
      'They need to have a wedding',
      'Make them think it\'s their idea',
    ]

    const worldChars = shuffle(this.allChars.value)
    const target = worldChars[0]
    const target_2 = worldChars[1]
    if (target && target_2) {
      this.scope = 'Quick'
      this.title = `Ship: ${target.n} + ${target_2.n}`
      this.description = `Ensure that [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b] will enter into romantic relationship with [b]${target_2.n}[/b](T${target_2.t}) from [b]${target_2.w}[/b]`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = 'Sum of the target costs in credits'
    }
    else {
      this.scope = 'Quick'
      this.title = 'Ship: Someone + Someone'
      this.description = 'Ensure that 2 random people from your current world will enter into romantic relationship'
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = 'Current world'
      this.reward = 'Sum of the target costs in credits'
    }
    return this
  }

  impregnate() {
    const conditions = [
      'No lures / 3rd party mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Gain the approval of parents / society',
      'You target need to have quintuplets',
    ]

    const targets = this.allChars.value.filter(x => x.b && x.b.some(tag => ['an', 'gd', 'nn', 'sp', 'az', 'pc', 'rl'].includes(tag)) && x.b.includes('F'))
    const target = sample(targets)
    if (target) {
      this.scope = 'Quick'
      this.title = `Impregnate: <i>${target.n}</i>`
      this.description = `Impregnate [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b], target need to be aware and willing but not bound.`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = 'Half of the listed target cost, optional speed up of pregnancy to a minimum of 72 hours'
    }
    // In case of no target generate a generic mission
    else {
      this.scope = 'Quick'
      this.title = 'Impregnate: Someone'
      this.description = 'Impregnate a target from your current world, target need to be aware and willing but not bound.'
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = 'Current world'
      this.reward = 'Half of the listed target cost, optional speed up of pregnancy to a minimum of 72 hours'
    }
    return this
  }

  superHero() {
    const conditions = [
      'No lures / 3rd party mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Do not disclose any information about Catalog to the target',
      'Be a bound servant or summon for the target',
      'Be a shadow partner, no one can know that you\'re helping the target',
    ]

    const targets = allCharsComp.value.filter(x => x.b && x.b.includes('sp'))
    const target = sample(targets)
    if (target) {
      this.scope = 'Standard'
      this.title = `Heroics with <i>${target.n}</i>`
      this.description = `Become a hero and pair up with [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b], target cannot be bound until mission is complete.`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = '1 free Power Swap of the same tier as target'
    }
    return this
  }

  bodyjack() {
    const conditions = [
      'Last minimum a month',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Target should be alive and unbound during entire mission duration',
      'You need to organize live TV of your actions as them for your target to watch',
      'Convince closest to the target friend or family member to do something outrageously lewd.',
    ]

    const targets = allCharsComp.value.filter(x => x.b && x.b.includes('pr'))
    const target = sample(targets)
    if (target) {
      this.scope = 'Standard'
      this.title = `Replace <i>${target.n}</i>`
      this.description = `Become [b]${target.n}[/b](T${target.t}) from [b]${target.w}[/b] and stealthy replace them, no one should have any doubts that you are them.`
      this.conditions = [{ value: 'Can\'t capture or use mind-control on target family, friends and acquaintances' }, { value: sample(conditions) as string }]
      this.loca = target.w
      this.reward = '1 free Power Swap of the maximum tier of the fooled person (T10 is max)'
    }
    else {
      this.scope = 'Standard'
      this.title = 'Replace someone'
      this.description = 'Become a random person from your current world and stealthy replace them, no one should have any doubts that you are them.'
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = 'Current world'
      this.reward = '1 free Power Swap of the maximum tier of the fooled person (T10 is max)'
    }
    return this
  }

  createLife() {
    const conditions = [
      'Your companions must do it, do not help',
      'Locals need to have significant contribution to creation',
      'Do it yourself, with no help',
      'The lifeform need to be at least T7',
      'The lifeform need to be able to mate with humans',
    ]

    const world = sample(allWorldsNoCondition.value)
    if (world) {
      this.scope = 'Standard'
      this.title = `Be creative in <i>${world.worldName}</i>`
      this.description = `Create a new lifeform in [b]${world.worldName}(DR${world.rating})[/b]. The said lifeform need to be at least comparable to a human in size, capable of reproduction and strong enough to survive in ${world.worldName}`
      this.conditions = [{ value: sample(conditions) as string }]
      this.loca = `${world.worldName}${world.condition ? ` - ${world.condition}` : ''}`
      this.reward = `Hidden realm in ${world.worldName}, that have a entire ecosystem that your creation will fit in`
    }
    return this
  }

  generateRandom(world = '') {
    if (world)
      this.targetCheck(world)
    const methods = [this.conquer, this.createLife, this.god, this.superHero, this.bodyjack]
    if (this.allChars.value.length >= 3)
      methods.push(this.capture, this.kill, this.impregnate, this.matchmaker)
    const method = sample(methods) as () => typeof this
    method.apply(this)
    return this
  }

  getObject() {
    return {
      objectives: [],
      desc: this.description,
      title: this.title,
      scope: this.scope,
      loca: this.loca,
      conditions: this.conditions,
      reward: this.reward,
    }
  }
}
