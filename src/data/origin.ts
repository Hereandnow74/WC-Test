export const desc = `Pick one and only one of these five options at the start of your build.This choice is permanent.
  With Extra and Substitute, any waifus that you purchase as part of your initial build will have
  valid documentation(as necessary) and a local backstory.Later purchases will not benefit from this,
  nor will you have such benefits in later worlds - unless you or your waifus make it yourselves.
  Like all company - supplied powers, abilities gained through Substitute, Possess, or Extra cannot be nullified,
  copied, or stolen.`

export interface Origin {
  title: string
  cost: number
  image: string
  desc: string
  blacklist?: string[]
  variants?: {
    title: string
    cost: number
  }[]
  character?: boolean
  max?: number
}

export const origin: Origin[] = []

origin.push({
  title: 'Drop-In',
  cost: 0,
  image: '/img/origin/dropin2.jpg',
  desc: `You are you. You have no documentation, no social advantages,
    nothing in your new world save the clothes on your back, your knowledge of
    fiction, personal skills, and of course any Company products you purchase.`,
  blacklist: [],
})

origin.push({
  title: 'Walk-In',
  cost: 0,
  image: '/img/origin/walkin2.jpg',
  character: true,
  desc: `You are not... you, not precisely. You are instead a canon character from some
    established work. This acts as a blend of Drop-In and Substitute: canon characters do
    not need to pay extra to be themselves, but their only knowledge of any world they
    might visit comes from any works they may have experienced personally and
    whatever spoilers they've encountered while browsing Company systems.`,
  blacklist: [],
})

origin.push({
  title: 'Extra',
  cost: 1,
  image: '/img/origin/extra2.jpg',
  variants: [{ title: 'T1-T3', cost: 1 }, { title: 'T4-T6', cost: 10 }, { title: 'T7-T9', cost: 100 }],
  desc: `You reincarnate into a non-canon "normie" character from
    your starting world, the equivalent of a tier 1 husbando or waifu,
    an alternate you who grew up in your starting world. (If you're
    naturally a T2 or T3 instead, your IRL skill set will not be removed
    or otherwise reduced.) Your original memories are downloaded
    into the new you's head at some point before the start of your
    story, but not before puberty. You can distinguish between the two
    sets of memories without difficulty.
    If your starting world is one where even the "normie"
    characters have in-born special abilities equivalent to a
    copper-star waifu, the local you will have some low-superhuman
    ability that fits the setting and this origin costs 10 credits. If the
    "normie" characters are instead equivalent to silver-star waifus,
    you will be equivalent to them and this origin will cost 100 credits.`,
  blacklist: [],
})

origin.push({
  title: 'Substitute',
  cost: 0,
  blacklist: ['Gauntlet PvP'],
  image: '/img/origin/substitute2.jpg',
  character: true,
  max: 20,
  desc: `You reincarnate into a canon character from your starting
    world, whether that's a waifu or husbando. You will be them, for
    all intents and purposes, with your original memories adding to
    theirs at some point before the start of your story, but not before
    puberty. You can distinguish between the two sets of memories
    without difficulty. Rule 63 variants of substitution targets require
    Universal Calibration, unless the target is androgynous or
    customizable. If the target is part of a set that are purchased
    together, choose one to insert into and take the others as free
    retinue members. If the target has any number of humanoid
    familiars, take them as free retinue members as well.
    You will keep all of your substitution target's skills,
    powers, and special traits, as they were at the point of
    substitution. A framework will guide you through learning
    whatever canon abilities are missing, just like what early
    captures get. Any crippling, categorical weakness that your
    target has will be eliminated when you/they first awaken, just as
    if you'd bound your target as a waifu or husbando.
    You must purchase your substitution target at their full
    price, adjusted according to their ability at the time you enter.
    This will often be lower than their listed price. You may not
    spend more than 20% of your starting budget, after drawbacks,
    on this perk`,
})

origin.push({
  title: 'Possess',
  cost: 0,
  image: '/img/origin/possess2.jpg',
  character: true,
  desc: `Be the waifu or husbando. Your self will be downloaded
    into the body of one a waifu or husbando, completely replacing
    theirs. Rule 63 variants are available for every choice imaginable.
    You must purchase the subject at their full price. Take this perk if
    you want to start in a world other than the one your target calls
    home. If you ever enter your target's homeworld, even as your first
    world, an original version of the character will be present. If the
    target is part of a set that are purchased together, choose one to
    insert into and take the others as free retinue members.
    Everything that your target would have if you bought them
    outright, you keep, except for their episodic memory and
    emotional connections - because the original personality was
    never present. Any crippling, categorical weaknesses that your
    target has will be eliminated when you take over, just as if you'd
    bound your target as a waifu or husbando. You must purchase the
    waifu or husbando you intend to possess at their normal price.`,
  blacklist: [],
})
