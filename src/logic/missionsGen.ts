import { DBCharacter } from 'global'
import { groupBy, sample, shuffle } from 'lodash-es'
import { getAllChars, allWorldsNoCondition } from '~/data/constants'

export class MissionGenerator {
  scope: 'Quick' | 'Standard' | 'Grand'
  title = 'Title'
  description = 'Description'
  conditions: {value: string}[] = []
  reward = '0 credits'
  loca = 'Generic'
  chars: DBCharacter[]
  constructor(scope: MissionGenerator['scope'] = 'Quick') {
    this.scope = scope
    this.chars = []
  }

  randomCaptureCondition() {
    const conditions = [
      'Don\'t use any bindings',
      'Don\'t use any lures',
      'Don\'t use any lures or bindings',
      'You must capture them personally',
      'You can only use companions 1 tier lower than target',
      'Capture must be done only by 1 member of your retinue of the same or less tier than target',
    ]
    return sample(conditions) as string
  }

  randomKillCondition() {
    const conditions = [
      'You or your retinue member must do it in 1v1 battle',
      'Your companions must do it, do not help',
      'Use only native power/technology',
      'You must do it yourself',
      'You can only use companions 1 tier lower than target',
      'Do not get found out',
      'Replace filled individual with a puppet',
    ]
    return sample(conditions) as string
  }

  randomConquerCondition() {
    const conditions = [
      'Only companions with less than average or average tier for the world',
      'Your companions must do it, do not help',
      'Use only native power/technology',
      'You must do it yourself',
      'Do not be noticed by general population',
    ]
    return sample(conditions) as string
  }

  randomImpregnateCondition() {
    const conditions = [
      'No lures / 3rd party mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Gain the approval of parents / society',
    ]
    return sample(conditions) as string
  }

  randomHeroCondition() {
    const conditions = [
      'No lures / 3rd party mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Do not disclose any information about Catalog to the target',
    ]
    return sample(conditions) as string
  }

  randomMatchCondition() {
    const conditions = [
      'No mind control',
      'You must do it in a week',
      'Use only native power / technology',
      'You must do it yourself with no retinue help',
      'Do it by force',
      'THey need to have a wedding',
    ]
    return sample(conditions) as string
  }

  capture() {
    const targets = this.chars.filter(x => x.t >= 5 || (x.b && x.b.length >= 4))
    const target = sample(targets)
    if (target) {
      this.title = `Capture: ${target.n}`
      this.description = `Capture <b>${target.n}</b>(T${target.t}) from <b>${target.w}</b> `
      this.conditions = [{ value: this.randomCaptureCondition() }]
      this.loca = target.w
      this.reward = `1 ticket for a T${target.t} companion`
    }
    return this
  }

  kill() {
    const targets = this.chars.filter(x => x.b && x.b.includes('ev'))
    const target = sample(targets)
    if (target) {
      this.title = `Eliminate: ${target.n}`
      this.description = `Eliminate <b>${target.n}</b>(T${target.t}) from <b>${target.w}</b> `
      this.conditions = [{ value: this.randomKillCondition() }]
      this.loca = target.w
      this.reward = 'Half of the listed target cost'
    }
    return this
  }

  conquer() {
    const world = sample(allWorldsNoCondition.value)
    if (world) {
      this.scope = 'Grand'
      this.title = `Conquer: ${world.worldName}`
      this.description = `Conquer <b>${world.worldName}(DR${world.rating})</b>, you need to became unquestionable ruler of this world.`
      this.conditions = [{ value: this.randomConquerCondition() }]
      this.loca = `${world.worldName}${world.condition ? ` - ${world.condition}` : ''}`
      this.reward = 'Double of the world budget'
    }
    return this
  }

  matchmaker() {
    const byWorld = Object.values(groupBy(this.chars, 'w')).filter(w => w.length >= 2)
    const worldChars = shuffle(sample(byWorld))
    const target = worldChars[0]
    const target_2 = worldChars[1]
    if (target && target_2) {
      this.title = `Ship: ${target.n} + ${target_2.n}`
      this.description = `Ensure that <b>${target.n}</b>(T${target.t}) from <b>${target.w}</b> will enter into romantic relationship with <b>${target_2.n}</b>(T${target_2.t}) from <b>${target_2.w}</b>`
      this.conditions = [{ value: this.randomMatchCondition() }]
      this.loca = target.w
      this.reward = 'Sum of the target costs in credits'
    }
    return this
  }

  impregnate() {
    const targets = this.chars.filter(x => x.b && x.b.some(tag => ['an', 'gd', 'nn', 'sp', 'az', 'pc', 'rl'].includes(tag)) && x.b.includes('F'))
    const target = sample(targets)
    if (target) {
      this.title = `Impregnate: ${target.n}`
      this.description = `Impregnate <b>${target.n}</b>(T${target.t}) from <b>${target.w}</b>, target need to be aware and willing but not bound.`
      this.conditions = [{ value: this.randomImpregnateCondition() }]
      this.loca = target.w
      this.reward = 'Half of the listed target cost, optional speed up of pregnancy to a minimum of 72 hours'
    }
    return this
  }

  superHero() {
    const targets = this.chars.filter(x => x.b && x.b.includes('sp'))
    const target = sample(targets)
    if (target) {
      this.title = `Heroics with ${target.n}`
      this.description = `Become a hero and pair up with <b>${target.n}</b>(T${target.t}) from <b>${target.w}</b>, target cannot be bound until mission is complete.`
      this.conditions = [{ value: this.randomHeroCondition() }]
      this.loca = target.w
      this.reward = '1 free Power Swap of the same tier as target'
    }
    return this
  }

  generateRandom() {
    this.scope = 'Quick'
    const methods = [this.capture, this.kill, this.conquer, this.impregnate, this.superHero, this.matchmaker]
    const method = sample(methods) as () => typeof this
    return method.apply(this)
  }

  async prepareGeneration() {
    this.chars = await getAllChars()
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
