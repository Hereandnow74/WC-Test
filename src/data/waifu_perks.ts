export interface WaifuPerk {
  title: string
  waifu: string | string[]
  from: string
  tier?: number
  image: string
  discount?: any
  cost?: any
  desc: string
  requires?: string
}

export const waifu_perks: WaifuPerk[] = []

waifu_perks.push({
  title: 'My Foolish Self',
  waifu: 'Enoshima Junko',
  from: 'Danganronpa 1',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/yumiyokiak__b4456ec60622cb7fd3286fe74df3773f.jpg',
  discount: 8,
  desc: 'Enoshima Junko is instead Otonashi Ryouko, her amnesiac fake identity. Ryouko does not have her neurological disorder.',
})

waifu_perks.push({
  title: 'Just Monika',
  waifu: 'Monika',
  from: 'Doki Doki Literature Club',
  image: 'https://i.imgur.com/Iea8EN9.jpg?1',
  discount: 1,
  cost: 11111,
  desc: 'Monika has learned how to manipulate reality as if it were her game. She\'ll need training to master this ability. The more complicated the world, the more she\'ll have to work to implement any changes or modifications. Captured copies of Monika will never have this perk. She needs a senpai with admin access to a world\'s operating system to teach her the basics first. Potential senpai candidates include BB from the Nasuverse and the higher-ups from Ah My Goddess',
})
waifu_perks.push({
  title: 'November Rain',
  waifu: 'Ayanami Rei',
  from: 'Evangelion',
  image: 'https://cdn.donmai.us/original/ad/3e/__ayanami_rei_angel_and_lilith_neon_genesis_evangelion_and_1_more_drawn_by_ahi_tb__ad3eff86f9eb46f73a0ed76eecd508c6.jpg',
  discount: 20,
  cost: 11111,
  desc: 'Rei has merged with her universe\'s Lilith, as in End of Evangelion. In addition to the multiversal travel granted to all T11 s and what she did on-screen, her AT Field strength and manipulation are enhanced to divine levels. She can spawn the canon Angels, except Tabris, as her minions or implant them into your hosts in your retinue. Each host may have no more than one Angel and may not be above T5 before implantation. Israfel may be implanted into a pair of twins. Lilith/Rei qualifies for special Alterzclu Symbiote theming. Lilith/Rei and independent Angels can assume humanoid forms within the standard height range. You may only have one Lilith/Rei.',
})
waifu_perks.push({
  title: 'Shikinami-Type',
  waifu: 'Souryuu Asuka Langley',
  from: 'Evangelion',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/sample_932e9b4752b56439631bc5783f04de1f.jpg',
  cost: 45,
  desc: 'Asuka is instead Shikinami Asuka from Rebuild. Compared to Souryuu Asuka, she has greater piloting experience, her ground combat ability and personal Lance of Longinus from the Honkai Impact 3rd collaboration, and a remnant of Bardiel in her eye that gives her a greater talent for AT Field manipulation. She can also activate the remnant to enter a berserker mode that temporarily raises her tier rating at step 6. If Asuka\'s tier before activating this Angel Blood is T9 or below, it will add one tier to her rating; if she\'s already T10, it will double her power but not raise her tier any further Without practice, Angel Blood can only be activated for five minutes at at a time and has a cooldown of one week (168 hours).',
})
waifu_perks.push({
  title: 'Think Tank',
  waifu: 'Kusanagi Motoko',
  from: 'Ghost in the Shell',
  image: 'https://w0.peakpx.com/wallpaper/730/429/HD-wallpaper-teamwork-ghost-in-the-shell-gits-cyborg-guns-sparkle-mecha-future-team-shooting-motoko-tachikoma-machine-sexy-cute-cool-kusanagi-funny-major.jpg',
  cost: 10,
  desc: 'Motoko now has a Tachikoma tank as an Al familiar. Additional Tachikomas may be produced by a sufficiently-capable Al- and vehicles-engineer. Fuchikomas and Logicomas are also available. This perk may be purchased for any Section 9 operative, not just the Major.',
})
waifu_perks.push({
  title: 'Spiral Out',
  waifu: 'Nia Teppelin',
  from: 'Gurren Lagann',
  tier: 11,
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/_kiri_aoko__d7acff2a2c3deb94efb65d266de3fde0.jpg',
  discount: 10,
  cost: 11111,
  desc: 'Nia is instead the emotionless messenger of the Anti-Spirals, with all the power of her creator, including the ability to manifest Mugann units and seal targets in the Multiverse Labyrinth. Applying this perk to an existing Nia will not impact her personality.',
})
waifu_perks.push({
  title: 'Debauchery Tea Party',
  waifu: 'Kanami',
  from: 'Log Horizon',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/gou__sample_9396b99390d9d0abd42f1902cae2b9c1.jpg',
  cost: 50,
  desc: 'Instead of the LV90 Monk, this Kanami is the LV90 Swashbuckler from her time with the Debauchery Tea Party. The founding member of the legendary group regains her lost strength and prowess of one who led other legends of Log Horizon into battle to overcome impossible odds and one of the few who matched Shiroe in sheer competence and proficiency as a player.',
})
waifu_perks.push({
  title: 'Aimo',
  waifu: 'Ranka Lee',
  from: 'Macross Frontier',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/ore__sample_14a41a8c3d16c761657495452d5aefba.jpg',
  discount: 190,
  desc: 'Ranka\'s familiar Ai-kun is actually an infant member of the Vajra, the hostile bug race of her home series. This perk allows a purchased Ranka\'s Ai-kun to mature to adulthood and qualifies Ranka for special Alterzelu Symbiote theming. Captured or Substituted Rankas will earn this perk when Ai-kun fully matures.',
})
waifu_perks.push({
  title: 'Eye of the Tiger',
  waifu: 'Hanekawa Tsubasa',
  from: 'Monogatari',
  image: 'https://i.imgur.com/AQ74QBy.jpg?1',
  discount: 20,
  desc: 'Tsubasa can now summon the manifestation of her envy, Kako, a “Hysteria Tiger“ with a penchant for arson. This version of Kako is much better-controlled than the original, only burning what his master directs him to burn, and will disappear back into Tsubasa\'s mind when she no longer needs his services. Tsubasa\'s hair will also gain a natural black-and-white tiger-stripe pattern. If Tsubasa is captured after the events of Tsubasa Tiger, she will always have this perk',
})
waifu_perks.push({
  title: 'The Deeper the Love',
  waifu: 'Sengoku Nadeko ',
  from: 'Monogatari',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/wan__sample_9cdccef6679f0c34b6decd492ec832f8.jpg',
  discount: 49,
  desc: 'Nadeko has joined with the Kuchinawa of her delusions to become a snake goddess herself, freeing herself of her emotional burdens and allowing her true nature as a yandere to shine forth. If Nadeko is captured between the events of Nadeko Medusa and the finale of Hitagi End, she will always have this perk',
})
waifu_perks.push({
  title: 'Heart-Under-Blade',
  waifu: 'Oshino Shinobu',
  from: 'Monogatari',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/72ae265780e758cdd963e2adaa257f83.jpg',
  discount: 180,
  desc: 'Shinobu has returned to her full power as the vampire Kiss-Shot Acerola Orion Heart-Under-Blade, with extreme regenerative abilities even by vampire standards and the two swords Kokowatari and Yumewatari. Purchased versions of Shinobu will always have this perk, as well as versions captured before or after, but not during, the events of Koyomi Vamp.',
})
waifu_perks.push({
  title: 'Vogelchevalier',
  waifu: 'Selesia Upitiria',
  from: 'Re:Creators',
  image: '/img/waifu_perks/vogelchevalier.jpg',
  discount: 80,
  desc: 'Selesia has her personal mecha, Vogelchevalier. It may not be especially titanic like Gigas Machina, but she\'s not complete without it ',
})
waifu_perks.push({
  title: 'Dual',
  waifu: 'Ram & Rem',
  from: 'Re:Zero',
  image: 'https://i.pinimg.com/originals/59/7c/7d/597c7d30a8d88a4b45bf7340c2a49341.jpg',
  cost: 30,
  desc: 'Each oni sister has two horns, not just the one each they were born with.',
})
waifu_perks.push({
  title: 'Haja Magic Overhaul',
  waifu: 'Falfa and Shalsha',
  from: 'Slimes 300 Years',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/sample_101456f44816433d64efb98092ebb5c5.jpg',
  discount: 8,
  desc: 'Improves the efficiency of the slime twins\' Haja magic to a mere 1 hour of charging per second of usage, and allows them to change their targets once a month. This might not seem like much but, but is a significant improvement over the original ',
})
waifu_perks.push({
  title: 'Dea est Machina',
  waifu: 'Iwakura Lain',
  from: 'Serial Experiments Lain',
  image: 'https://i.imgur.com/9FUjNzR.gif?1',
  cost: 11111,
  discount: 10,
  desc: 'Lain has absorbed her shadow and ascended to become an omnipotent and omnipresent goddess of the internet and cyberspace. Without this perk. Lain will only be a skilled coder, hacker, and technopath, with significant psychic potential.',
})
waifu_perks.push({
  title: 'Unsealed Choushin',
  waifu: 'Hakubi Washuu',
  from: 'Tenchi Muyo!',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/f83799b02923d0a23008f94ca8d87e83.jpg',
  discount: 1000,
  cost: 11111,
  desc: 'The three Choushin are no longer limited by their seals and may use their full power. This must be purchased separately for each sister. Tokimi is only available in her unsealed form.',
})
waifu_perks.push({
  title: 'Starship Ryo-Ohki',
  waifu: 'Ryo-Ohki',
  from: 'Tenchi Muyo!',
  image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1467335939-80a894b6bbf202ed14b6f9416521651c.jpeg',
  cost: 900,
  desc: 'Ryo-Ohki can now call upon her crystalline ship-form that\'s capable of taking planet-busting attacks assuming they can even hit. Without this perk, Ryo-Ohki is restricted to her humanoid form. If you capture Ryo-Ohki in-setting, you will automatically receive this perk and the capture value of a T10.',
})
waifu_perks.push({
  title: 'Light Hawk Evolution',
  waifu: 'Hakubi Ryouko',
  from: 'Tenchi Muyo!',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/402fa07ba5334667ebe7c3c412e11be2.jpg',
  discount: 200,
  cost: 11111,
  requires: 'Must have Starship Ryo-Ohki',
  desc: 'Ryouko achieves her full potential, generating up to 10 Light Hawk Wings to become the equal of the Choushin deities. Ryo-Ohki is required as a mediator for this power and will be included for free if this version of Ryouko is purchased in a starting build. Ascension without this perk requires Starship Ryo-Ohki, access to Washuu\'s gems, and a few hundred years minimum.',
})
waifu_perks.push({
  title: 'Swaying One',
  waifu: 'Othinus',
  from: 'To Aru',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/sample_3b263dbfafe2296c1ebff38335ac287a.jpg',
  discount: 200,
  cost: 11111,
  desc: 'Othinus has Gungnir, granting her complete control of her power as a Magic God. A purchased Othinus will not have full control without either this perk or constructing her version of Gungnir manually.',
})
waifu_perks.push({
  title: 'Darkness',
  waifu: 'Konjiki no Yami',
  from: 'To Love-Ru',
  image: 'https://i.imgur.com/KsUMMAWm.jpg?1',
  cost: 950,
  desc: 'Konjiki no Yami was created as a transformation weapon, but her creators left a hidden Darkness transformation in her that would activate if she ever felt a sense of peace in her heart. This form is so powerful that it can slice planets in half and (allegedly) destroy the universe itself. The purchase of this perk enables Yami to change into this mode at will. This form may also be forcibly activated via the Company smart device, which will also result in the more hyperactive and perverted personality associated with this form coming to the fore. If you capture Yami in setting, you will automatically receive this perk and the capture value of a T10',
})
waifu_perks.push({
  title: 'Tower Access',
  waifu: ['Shurelia', 'Mir', 'Frelia', 'Tyria'],
  from: 'Ar tonelico',
  image: '/img/waifu_perks/tower.png',
  discount: 180,
  desc: 'Without their Towers, the Origins, and Mir through hacking Shurelia\'s tower Eoria, are limited in power and range. With this perk, you become a conduit to a Tower for them. If you have Life\'s a Beach, this Tower is physically present in your world, increasing her range to 3,200 km (measured from the last used portal site), and power to truly warp the reality around them with suitable Songs. Your entire pocket universe is always covered by this tower, regardless of its usual range. You may buy this perk up to four times, once for each girl. Each repurchase adds 3,200 km to the range of every girl who has the perk, up to 12,800 km total. This range is measured separately for each world you or any member of your retinue visits.',
})
waifu_perks.push({
  title: 'Prime Evil',
  waifu: 'Leah',
  from: 'Diablo',
  image: 'https://i.imgur.com/hPeeYdy.png',
  discount: 980,
  desc: 'Leah is possessed by Diablo, the Prime Evil from her home plane. Their personalities are fused together, creating a new Leah who is still recognizable but (without controls) just as powerful and evil as her father. Leah/Diablo qualifies for special Alterzelu Symbiote theming.',
})
waifu_perks.push({
  title: 'Giga-Graviton',
  waifu: 'Yunalesca',
  from: 'Final Fantasy X',
  image: '/img/waifu_perks/giga_graviton.jpg',
  cost: 1000,
  desc: 'The aeon summoner has one more aeon available to her: Sin, the whale-like beast that ravaged her homeworld for a millenium. Sin acts as a superheavy battlecarrier, capable of operating in all planetary and void environments, and can be sustained indefinitely without cost. Sin has all of its normal weaponry, including gravity and dream magic, and an uncountably high number of Sinscales, Sinspawn, and fiends that may be deployed in army-scale engagements or as anti-boarding defense and qualify Sin\'s summoner for special Alterzelu Symbiote theming. At least four layers of interior pocket universes serve as further protection and segregate the fiends from the customizable command and living spaces near the aeon’s core. An empathic link connects the summoner’s will to Sin and, in turn, the fiends that protect it. This link doubles as an IFF, preventing any deadly or otherwise unfortunate encounters between Sin’s guards and its guests or other inhabitants. You may only apply this perk to one of the two summoners. It does not affect their tier rating',
})
waifu_perks.push({
  title: 'The Word of the Mother',
  waifu: 'Minfilia Warde',
  from: 'Final Fantasy XIV',
  image: '/img/waifu_perks/mother_word.jpg',
  discount: 998,
  desc: 'Above and beyond her own power, Minfilia channels the existence of the Primal most ancient and famous - Hydaelyn. Bound together in body and spirit, what kind of person will this union create?',
})
waifu_perks.push({
  title: 'Mirror, Mirror',
  waifu: 'Yotsuyu goe Brutus',
  from: 'Final Fantasy XIV',
  image: 'https://cdnb.artstation.com/p/assets/images/images/012/267/989/large/anna-zemlina-dfdfdsg.jpg?1533906957',
  cost: 48,
  desc: 'Having reached the apex of her journey, Yotsuyu can now use the power and gain the appearance of mighty Tsukuyomi. Tsukuyomi may also be purchased separately, in her own body, for 50 credits.',
})
waifu_perks.push({
  title: 'The Bosom of Pure Black',
  waifu: 'Edda Pureheart',
  from: 'Final Fantasy XIV',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/daemz3h_d9e3a566_5bb5_4093_bdc7_721003453984.jpg',
  cost: 45,
  desc: 'A naive conjurer, turned to dark arts by circumstance and earnest grief. No longer interested in healing, Edda becomes a spirit of shadow and wicked power, completely fixated on you. Should you happen to die, she\'ll keep your head. ',
})
waifu_perks.push({
  title: 'Long Live the Queen!',
  waifu: 'Feo UI',
  from: 'Final Fantasy XIV',
  image: 'https://pibig.info/uploads/posts/2021-05/1620340011_24-pibig_info-p-lu-minfei-anime-krasivo-25.png',
  cost: 95,
  desc: 'The mantle of the Faerie Queen changes hands, bestowing upon Feo UI the full greatness of Titania in all of her splendor, influence, and unassailable might. Titania may also be purchased separately, in her own body, for 100 credits.',
})
waifu_perks.push({
  title: 'Dancing on Snow',
  waifu: 'Ysayle Darigoulain',
  from: 'Final Fantasy XIV',
  image: 'https://i.imgur.com/fviNHAf.jpg?1',
  discount: 40,
  desc: 'Through admiration and determined effort, Ysayle can now channel the spirit of Shiva by taking on her form. Shiva may also be purchased separately, in her own body and with any version’s appearance, for 50 credits.',
})
waifu_perks.push({
  title: 'Resonance',
  waifu: 'Fordola rem Lupis',
  from: 'Final Fantasy XIV',
  image: '',
  cost: 30,
  desc: 'Power undeserved, obtained by sacrifices unwilling, this facsimile of an Echo lets Fordola read her opponents\' movements before they begin making them, as well as view someone\'s past and resist most forms of mind control and soul invasion.',
})
waifu_perks.push({
  title: 'Memories of Light and Ice',
  waifu: 'Ryne',
  from: 'Final Fantasy XIV',
  image: 'https://pbs.twimg.com/media/ESEhywUUYAApJhX.jpg',
  cost: 80,
  desc: 'Ryne can access her Shiva and Oracle of Light forms without losing control.',
})
waifu_perks.push({
  title: 'Deus Ex',
  waifu: 'Nael van Darnus',
  from: 'Final Fantasy XIV',
  image: '',
  cost: 50,
  desc: 'Her humanity, sanity, and body all but stripped away, Nael is infused with the essence of the Dreadwyrm - Bahamut, one of the most infamous Primals. This particular Nael may still exist in a human form despite the obtained power, but her sanity rests on a knife\'s edge. ',
})
waifu_perks.push({
  title: 'Shepherd of the Stars',
  waifu: 'Warrior of Ligh',
  from: 'Final Fantasy XIV',
  image: '',
  cost: 400,
  desc: 'The Warrior of Light is now a Paragon, an Unsundered Ancient of Amaurot. Their soul has been reunified and they possess all the power and the memories of Azem, Shepherd of the Stars and Fourteenth Seat of the Convocation of Fourteen. A powerful sorcerer of Eld, their power in their home dimension is now only outmatched by the First Primals themselves, Zodiark and Hydaelyn.',
})
waifu_perks.push({
  title: 'Fell Vessel',
  waifu: 'Robin',
  from: 'Fire Emblem: Awakening',
  image: 'https://i.kym-cdn.com/photos/images/facebook/001/356/740/e51.jpg_large',
  cost: 180,
  desc: 'The Ylissean tactician is now the host to Grima, the Fell Dragon and big bad of their original story, with full access to the dragon\'s power and the ability to switch between dragon and human forms like any Manakete. Grima-Robin qualifies for a special Alterzelu Symbiote theme. Applying this perk to an existing Robin will not cause unwanted effects on their personality. Grima may instead be purchased separately, in a new body, for 200 credits. ',
})
waifu_perks.push({
  title: 'The Fodlan Star',
  waifu: 'Byleth',
  from: 'Fire Emblem: Three Houses',
  image: 'https://i.imgur.com/7kkfOTQ.png',
  cost: 180,
  desc: 'Byleth has come into her own as a vessel of the goddess Sothis. You and your retinue can sense and interact with Sothis normally at all times. The goddess may instead be purchased separately, in her own body, for 200 credits.',
})
waifu_perks.push({
  title: 'More than Emergency Food',
  waifu: 'Paimon',
  from: 'Genshin Impact',
  image: '',
  cost: 49,
  desc: 'Nobody knows why Paimon can still move while the rest of the world is paused, but it\'s still sufficient inspiration for a waifu perk. This allows Paimon to stop time for all beings within 1 AU. Anyone entering this sphere will also find themselves frozen. Furthermore, Paimon now has a personal Pocket Inventory. Unlike the one offered by the perk, its interior volume is roughly the same as the entire Grand Manor\'s. You and the rest of your retinue can access this storage space at any time. ',
})
waifu_perks.push({
  title: 'Fallen Angel',
  waifu: 'Azazel, the Curious Angel',
  from: 'Helltaker',
  image: 'http://img2.joyreactor.cc/pics/post/full/mugenjin-artist-Loremaster-%28Helltaker%29-Azazel-%28Helltaker%29-6706826.jpeg',
  cost: 80,
  desc: 'Azazel, after falling into demonhood, conquers Hell and becomes Loremaster, The Science Demon. She\'s become strong enough that even Lucifer has been forced into becoming her personal maid. While still just as curious, cheerful, and enthusiastic as she was as an angel, she\'s become merciless and sadistic after turning Hell into her personal research facility. Despite the thousands of years that it took to conquer hell, she still fully believes she\'s an angel, denying any evidence to the contrary. Loremaser qualifies for special Alterzelu Symbiote theming.',
})
waifu_perks.push({
  title: 'Millennial Gate',
  waifu: 'Peach',
  from: 'Mario series',
  image: 'https://torako.wakarimasen.moe/file/torako/v/image/1601/15/1601151378489.jpg',
  cost: 190,
  desc: 'Princess Peach is once again a vessel for the Shadow Queen, an ancient demonic entity that served as the true final boss of the second Paper Mario. The Shadow Queen may assume her true form, but will generally maintain her corrupted version of Peach\'s form. The Shadow Queen qualifies for special Alterzelu Symbiote theming.',
})
waifu_perks.push({
  title: 'Justin Bailey',
  waifu: 'Samus Aran',
  from: 'Metroid',
  image: 'https://static.zerochan.net/Samus.Aran.full.3031190.jpg',
  discount: 30,
  desc: 'Samus is instead a less experienced version from around the time of her first mission to Zebes. She still has her Power Suit and ship, but has not yet fabricated her Zero Suit or let her hair return to its natural blonde. If you already have Metroid Hybrid Samus, you may still buy this perk, pre-applied to a new Samus, for 20 credits. ',
})
waifu_perks.push({
  title: 'Metroid DNA',
  waifu: 'Samus Aran',
  from: 'Metroid',
  image: 'https://i.imgur.com/BPOzyIY.jpg?1',
  cost: 50,
  desc: 'The Metroid DNA from Fusion is active in Samus\'s system, turning her into a succuboid with incredible psychic potential. Lifeforce is a required part of her diet. She\'ll gradually mutate into a human-Metroid hybrid, then follow the SR-388 Metroids\' life-cycle into the queen stage... or perhaps beyond. Once she\'s become a Metroid queen, she may lay Metroid eggs, but only voluntarily and not without extreme persuasion. Her Metroid offspring will also follow the SR-388 life-cycle and are limited to stages lower than her own. Metroid Samus qualifies for special Alterzelu Symbiote theming. If you already have Justin Bailey, you may still buy this perk, pre-applied to a new Samus, for 100 credits. ',
})
waifu_perks.push({
  title: 'Spawning Pools',
  waifu: 'Sarah Kerrigan',
  from: 'Starcraft',
  image: '/img/waifu_perks/spawning_pools.jpg',
  cost: 50,
  desc: 'Kerrigan is instead one of her Zerg versions, whether the (Infested) Queen of Blades from late SC1 through Brood War and early WOL or the (Primal) Queen of the Swarm from late HOTS and most of LOTV. Non-canon Infested Zerg and Primal Zerg versions of Nova are also available through this perk. Zerg Kerrigan and Zerg Nova both qualify for special Alterzelu Symbiote theming. ',
})
waifu_perks.push({
  title: 'No One Runs From The Conqueror!',
  waifu: 'Lotara Sarrin',
  from: 'Warhammer 40K',
  image: '',
  cost: 500,
  desc: 'Lotara Sarrin is a captain, and what is a captain without her ship? Lotara once again has command of the Conqueror, the mighty Gloriana-class battleship that served as the flagship of Angron, Primarch of the World Eaters. This perk does not affect Lotara\'s tier rating.',
})
waifu_perks.push({
  title: 'The Storm Follows In Her Wake!',
  waifu: 'Kalena Maxus',
  from: 'Warhammer 40K',
  image: '',
  cost: 200,
  desc: 'Kalena Maxus may be a noblewoman, and she may be the lone survivor of the Knight Houses of Kamador, but even she is lesser without her steed, the mighty Dominus Castellan-type Imperial Knight known as Stormwalker. This six-story war-machine will lay waste to anything that opposes the will of its pilot. This perk does not affect Kalena\'s tier rating.',
})
waifu_perks.push({
  title: 'A Matriarch\'s Mount',
  waifu: 'Solaria Varlock',
  from: 'Warhammer 40K',
  image: '',
  cost: 200,
  desc: 'Lady Solaria, Matriarch of House Varlock, is not to be underestimated under any circumstance by anyone with half a brain in their heads. However, only the truly insane (or the Ork menace) would consider attacking her when she is astride the Questoris-type Imperial Knight Drakaina. A \'mere\' 12 meters tall, this war-machine helps define the phrase \'peace through superior firepower\'. This perk does not affect Solaria\'s tier rating. ',
})
waifu_perks.push({
  title: 'Machina',
  waifu: 'Fiora',
  from: 'Xenoblade Chronicles 1',
  image: 'https://i.imgur.com/g2pOTww.jpeg?1',
  cost: 180,
  desc: 'Fiora has been rebuilt: better, faster, stronger. Her half-Mechon body is also the host to Lady Meyneth, the goddess-avatar of the continent-sized kaiju known as Mechonis. Meyneth may instead be purchased separately, in her own body, for 200 credits.',
})
waifu_perks.push({
  title: 'Powered Panzer Inferno',
  waifu: 'Poppi',
  from: 'Xenoblade Chronicles 2',
  image: 'https://i.redd.it/1hpqt1yjvk511.png',
  cost: 30,
  desc: 'Poppi has the Poppibuster, a personal tank that she pilots remotely through her doppelganger, Poppi Mk. II. Who the hell do friend think Poppi is? This perk must be purchased separately if you Possess or Substitute into Tora, even if the Substitution is after Poppibuster\'s construction.',
})
waifu_perks.push({
  title: 'Master Driver',
  waifu: 'Pyra & Mythra',
  from: 'Xenoblade Chronicles 2',
  image: 'https://i.redd.it/6yvpn3qilje31.jpg',
  cost: 900,
  desc: 'Pyra and Mythra can now fuse into their true form, Pneuma. Pneuma can split off both Pyra and Mythra into their own bodies at will, maintain her own body while they\'re separated, and re-combine with the other two on contact. This perk must be purchased separately if you Possess or Substitute into Rex, even if the Substitution is after he\'s met Pneuma. If you capture Pyra & Mythra in-setting, you\'ll automatically receive this perk and the capture value of a T10, as if you had captured Pneuma as herself.',
})
waifu_perks.push({
  title: 'The Girl in the Tower',
  waifu: 'Salem',
  from: 'RWBY',
  image: 'https://i.imgur.com/KHe692N.png?1',
  discount: 100,
  desc: 'Instead of the Grimm-corrupted Salem of the canon era, your Salem is her younger self with strong immortality, magical talent, and no command over the nightmare creatures that plague her homeworld. Light Salem isn\'t necessarily any better of a person than Dark Salem, but at least you have a way to troll her ex-husband. ',
})
waifu_perks.push({
  title: 'Phoenix Force',
  waifu: 'Jean Grey, Madelyne Pryor',
  from: 'Marvel',
  image: 'https://comicvine1.cbsistatic.com/uploads/original/11/117763/2504269-madelyne_pryor_by_chadpatricksanders71.jpg',
  cost: 11111,
  discount: 200,
  desc: 'Jean or Madelyne has the Phoenix Force. Phoenix Jean or Phoenix Madelyne may be purchased at chargen on Danger 11, just like any other T11 waifu. A purchased Jean or Madelyne will not have the Phoenix Force without this. ',
})
waifu_perks.push({
  title: 'Herrscher of the Void',
  waifu: 'Kiana Kaslana',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/aZWHJsn.jpg?1',
  cost: 100,
  desc: 'Kiana has mastered the powers of the Void and is no longer haunted by the Herrscher personality of Sirin, her past life. Purchased versions of Kiana will always have this perk, as will any captured after the events of Chapter 25',
})
waifu_perks.push({
  title: 'Sirin Kaslana',
  waifu: 'Kiana Kaslana ',
  from: 'Honkai Impact',
  image: 'https://pixiv.cat/80489690.png',
  cost: 400,
  desc: 'As the reincarnation of Sirin. K-423/Kiana receives all 6 Herrscher cores that Sirin collected during the Second Honkai War, as well as the Fenghuang down feathers that she had nicked from Fu Hua. She may also call Benares to the battlefield once more as a familiar. Kiana\'s greater combat experience and lack of her predecessor\'s arrogance make her a more dangerous enemy than her predecessor.',
})
waifu_perks.push({
  title: 'See You in the Next World',
  waifu: 'Sirin Kaslana',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/7B4S9kk.png?1',
  cost: 11111,
  discount: 600,
  desc: 'Sirin Kaslana, or a Sirin with K423\'s body, has been given all the abilities she has displayed in Honkai Gakuen II: Guns Girl Z and its DLCs. In this case, she gets the abilities of God Kiana, an immensely powerful being empowered by the Honkai that destroyed and recreated the Guns Girl Z universe, before creating the Imaginary Tree and the Sea of Quanta - i.e. the Honkai, Genshin, and Bubble Universes. May or may not be the 14th Herrscher. You may only apply this perk to one of Kiana or Sirin at a time.',
})
waifu_perks.push({
  title: 'Captain Mei',
  waifu: 'Raiden Mei',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/F8Xgxj1.png?1',
  cost: 20,
  desc: 'Mei gets access to her combat experience and abilities from the APHO Bubble Universe. This does not increase Mei\'s tier rating. ',
})
waifu_perks.push({
  title: 'Dr. MEI',
  waifu: 'Raiden Mei',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/rTYff6g.png?1',
  cost: 100,
  desc: 'Mei gets access to her memories, experience and knowledge from her Previous Era self, Dr. MEI. This includes a complete database of Previous Era technology, the hollow armor Divine Key, and, as an additional bonus, the Previous Era Gem of Conquest and Serenity. Dr. MEI may instead be purchased in her own body, as a Tier 7, for 100 credits.',
})
waifu_perks.push({
  title: 'Bronie Zaychik: Haxxor Bunny',
  waifu: 'Bronya Zaychik',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/pvx4EEw.png?1',
  cost: 20,
  desc: 'Bronya gets access to her memories and experience from an alternate bubble universe where she is known as Bronie, a hacker that also uses the alias Haxxor Bunny. This does not increase Bronya\'s tier rating.',
})
waifu_perks.push({
  title: 'Super Al Prometheus',
  waifu: 'Bronya Zaychik',
  from: 'Honkai Impact',
  requires: 'Must have Dr. MEI (Honkai Impact, T8)',
  image: 'https://i.imgur.com/MtfgIBo.png?1',
  cost: 100,
  desc: 'While Bronya did not exist in the Previous Era, the Super Al known as Prometheus bears a stunning resemblance to the girl. As such the Company has deemed the similarity sufficient enough to model Prometheus in this way. This perk greatly increases Bronya’s computing ability and Haxxor Bunny\'s own skill (if that perk is also applied).',
})
waifu_perks.push({
  title: 'HUA: Wings of Origin',
  waifu: 'Fu Hua',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/dzYkNAa.png?1',
  cost: 100,
  desc: 'Fu Hua gets access to all her memories of the past without any negative effects or periodic cleaning with Fenghuang Down, as well as the physicals of her time as a MANTIS Warrior. May not be applied to the same Fu Hua as Herrscher of Sentience. If you already have the Herrscher of Sentience, you may still purchase this, pre-applied to a new Fu Hua, for 200 credits. Fu Hua will not have the battlesuits Phoenix or Azure Empyrea without this perk.',
})
waifu_perks.push({
  title: 'Herrscher of Sentience',
  waifu: 'Fu Hua',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/u93yj3H.png?1',
  cost: 400,
  desc: 'While rather child-like and immature, this nascent Herrscher is the strongest incarnation of Fu Hua to date, having bodied both Kevin and Durandal. May not be applied to the same Fu Hua as HUA: Wings of Origin. If you already have a Fu Hua with Wings of Origin, you may still purchase this, pre-applied to a new Fu Hua, for 500 credits.',
})
waifu_perks.push({
  title: 'Captain HIMEKO: Herrscher of Flame',
  waifu: 'Murata Himeko',
  from: 'Honkai Impact',
  image: 'https://i.redd.it/49a9n112o1121.png',
  cost: 100,
  desc: 'Himeko Murata gains access to her memories from 50,000 years ago as captain of a Fire Moth squad. She will not have the Gem of Haste without this perk.',
})
waifu_perks.push({
  title: 'Zhuge Kongming',
  waifu: 'Theresa Apocalypse',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/LFFM8xi.png?1',
  cost: 20,
  desc: 'Theresa gains access to her memories and abilities of Zhuge Kongming, an alternate self from the Captainverse/Cap’s Bizarre Adventure. She will not have the battlesuit Starlit Astrologos without this perk. This does not increase Theresa\'s tier rating.',
})
waifu_perks.push({
  title: 'SAKURA',
  waifu: 'Yae Sakura',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/yhfirE3.png?1',
  cost: 100,
  desc: 'Yae Sakura gains access to the memories and experiences of the previous era MANTIS Warrior SAKURA. Sakura will not have the battlesuit Goushinnso Memento without this perk.',
})
waifu_perks.push({
  title: 'Kasumi',
  waifu: 'Yae Sakura',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/JKBmpOE.png?1',
  cost: 20,
  desc: 'Yae Sakura gains the memories of her clone, Yae Kasumi. Sakura will not have the battlesuit Darkbolt Jonin without this perk.This does not increase Sakura\'s tier rating. Kasumi may instead be purchased separately, in her own body, for 100 credits.',
})
waifu_perks.push({
  title: 'Irene Adler',
  waifu: 'Rita Rossweisse',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/0Ev0XIY.jpg?1',
  cost: 20,
  desc: 'Rita gains access to her Captainverse counterpart, the detective known as Irene Adler. Rita will not have the battlesuit Fallen Rosemary without this perk. This does not increase Rita\'s tier rating. Irene may instead be purchased separately, in her own body, for 100 credits.',
})
waifu_perks.push({
  title: 'Rita Kaslana',
  waifu: 'Rita Rossweisse',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/4K3oU4Q.png?1',
  cost: 400,
  desc: 'Rita gets access to Kevin Kaslana\'s powers and abilities from the bubble universe/Su\'s illusion where she became Humanity\'s strongest warrior and took Kevin\'s place. This perk also gives Rita the Judgement of Shamash pistols.',
})
waifu_perks.push({
  title: 'Sumeru Durandal',
  waifu: 'Durandal',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/xjYR2Yy.png?1',
  cost: 20,
  desc: 'Durandal gains access to the memories and abilities of Sumeru. Kevin\'s friend who lived as an assistant to Doctor Mei. This perk also gives Durandal the Star of Eden pistols and the Second Divine Key, Interdimensional Locomotive. This does not increase Durendal\'s tier rating. ',
})
waifu_perks.push({
  title: 'Swallowtail Phantasm and Starchasm Nyx',
  waifu: 'Seele Vollerei',
  from: 'Honkai Impact',
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/890__sample_bf6d81bd98a260c66ee5709226ee3b0a.jpg',
  cost: 20,
  desc: 'With this perk, you can split Seele into her two halves: Seele herself and her dark side, Veliona. Seele uses her original battlesuit Swallowtail Phantasm, while Veliona uses the battlesuit Starchasm Nyx. This does not change Seele\'s tier rating. Starchasm Nyx is not available without this perk. ',
})
waifu_perks.push({
  title: 'SEELE: Herrscher of Death',
  waifu: 'Seele Vollerei',
  from: 'Honkai Impact',
  image: '',
  cost: 100,
  desc: 'With this perk, Seele gains the memories and experiences of her previous era self: the Herrscher of Death. Not much is known about this one, except for her cause of death.',
})
waifu_perks.push({
  title: 'Delta',
  waifu: 'Rozaliya Olenyeva',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/xfuY391.png?1',
  cost: 50,
  desc: 'Rozaliya gains access to the memories and abilities of her older, much more cynical self from another bubble universe, known as Delta. Rozaliya will not have the battlesuit Fervent Tempo without this perk.',
})
waifu_perks.push({
  title: 'Present Era Database',
  waifu: ['Lizelle Einstein', ' Frederika Tesla', 'Jackal'],
  from: 'Honkai Impact',
  image: '',
  cost: 100,
  desc: 'This hard drive contains all scientific and technological data of the Current Era of Civilization. This includes mechs, weaponry, battlesuits - those not locked behind Waifu Perks, at least - vehicle designs, and stigmata. This perk may only be purchased once and does not increase Lizelle and Frederika\'s or Jackal\'s tier ratings.',
})
waifu_perks.push({
  title: 'Rimestar',
  waifu: 'Ana Schariac',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/h1HSXoX.png?1',
  cost: 100,
  desc: 'Ana gains the abilities of the Herrscher of Rimestar, a form that combined her core with that of Owl\'s Herrscher of the Earth. Not only does she retain her Ice manipulation, she also gains gravity manipulation and black hole creation. This does not change Ana\'s tier rating. ',
})
waifu_perks.push({
  title: 'Ich Liebe Dich',
  waifu: 'Sirin',
  from: 'Honkai Impact',
  image: 'https://i.imgur.com/HyNKujz.jpg?1',
  cost: 20,
  desc: 'Bom from Sirin\'s wish to have another chance at life as Cecilia Schariac\'s daughter, Sirin instead awakens in the body of K423. Unlike what transpires originally, she retains her memories in full and the Herrscher personality that would normally develop within K423 - born of Sirin\'s hatred for humanity - is never created as a result. In addition, Sirin will obtain all equipment and signature outfits Kiana Kaslana (K423) would have if purchased at base, as well as any combative abilities she has - skills such as the Kaslana gun kata and the Edge of Taixuan. ',
})
waifu_perks.push({
  title: 'Fj',
  waifu: 'Ryougi Shiki',
  from: 'Fate Grand Order',
  image: 'https://i.imgur.com/ls7nSA3.png?1',
  cost: 400,
  desc: 'The personality in Shiki\'s body is neither the male one that sacrificed itself to save her life in high school, nor the female one that was in control for most of her adult life and guest-starred in FGO as an Assassin, but the technically-nameless embodiment of Void that guest-starred in FGO as a Saber. Without this perk, the only personality present in Shiki\'s body will be the female one. ',
})
waifu_perks.push({
  title: 'Sion TATARI',
  waifu: 'Sion Eltnam Atlasia',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/KfE5NMx.png?1',
  cost: 50,
  desc: 'Sion is fused with the 13th Dead Apostle Ancestor, the Night of Wallachia aka TATARI. She has White Len as a familiar, if you don\'t already have a White Len via Aozaki Aoko, and qualifies for special Alterzelu Symbiote theming. ',
})
waifu_perks.push({
  title: 'The Future King',
  waifu: 'Artoria Pendragon',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/9Pl5qiV.jpg?1',
  discount: 50,
  desc: 'Instead of the detached King of Knights, there is only Saber Lily. Artoria\'s personality now more accurately reflects the idealistic youth who first drew Caliburn and qualifies for special Alterzelu Symbiote (purification) theming. Her outfits, skills, and Noble Phantasms are changed accordingly. This perk may also be applied to the male Arthur Pendragon of Fate/Prototype, but not an Artoria or Arthur who already has The Everdistant Utopia. If you already have Avalon, you may still purchase this perk, pre-applied to a new Artoria or Arthur, for 50 credits. ',
})
waifu_perks.push({
  title: 'The Everdistant Utopia',
  waifu: 'Artoria Pendragon',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/4MKhpON.png?1',
  cost: 100,
  desc: 'Artoria has her sheath, Avalon, granting her enormous health regeneration and other lore effects. This perk may not be applied to the same Artoria as The Future King. If you already have Artoria Lily, you may still purchase this, pre-applied to a new Artoria, for 200 credits. The male Arthur Pendragon of Fate/Prototype is also eligible for this perk.',
})
waifu_perks.push({
  title: 'Swapped Vessel',
  waifu: 'Tohsaka Rin',
  from: 'Nasuverse',
  image: '',
  discount: 18,
  desc: 'Rin is instead the non-canon Matou Rin, a version of her who was traded to that family instead of her sister. If you already have Tohsaka Sakura alongside this Rin, they will recognize each other. This perk may not be applied to the same Rin as Nameless Red Devil, Mistress of Heaven, or Kaleidosick Magical Ruby. If you have any of those perks and want Matou Rin, you may still purchase this, pre-applied to a new Rin, for 2 credits.',
})
waifu_perks.push({
  title: 'Nameless Red Devil',
  waifu: ['Tohsaka Rin', 'Tohsaka Sakura'],
  from: 'Nasuverse',
  image: 'https://i.imgur.com/eyZuB9e.png?1',
  cost: 80,
  desc: 'Maybe it was a Demi-Servanting gone wrong. Maybe it was Class Card overuse. Either way, Rin - or a Sakura who would have owned the Jeweled Pendant - now has all the abilities of the Archer-class EMIYA or Nameless, albeit with a slightly... airier costume. You may only apply this perk to one of the two. This perk may not be applied to the same Rin as Mistress of Heaven. Swapped Vessel, or Kaleidostick Magical Ruby. If you have any of those perks and want Archer Rin, you may still purchase this, pre applied to a new Rin, for 100 credits. ',
})
waifu_perks.push({
  title: 'Mistress of Heaven',
  waifu: 'Tohsaka Rin',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/xWa5x3i.png?1',
  cost: 80,
  desc: 'Rin is instead the Archer-class Pseudo-Servant Ishtar, the Mesopotamian goddess of love and war, with additional access to Summer Ishtar\'s outfits, skills, and Noble Phantasms. If you purchase or capture Rin first and apply this perk later, Rin will gain Ishtar\'s memories and emotional connections; their two personalities are so alike that Ishtar can\'t even tell that Rm\'s better traits aren’t her own. if you purchase Rin and this perk simultaneously, you will only get Ishtar. If you capture Ishtar or Ereshkigal within the Babylonia Singularity while they share a body, the one who isn\'t in control at the time will be ejected and rendered vulnerable to an immediate Binding. This perk may not be applied to the same Rin as Swapped Vessel, Nameless Red Devil, or Kaleidostick Magical Ruby. If you already have any of those perks and want Ishtar, you may still purchase this, pre-applied to a new Rin, for 100 credits.',
})
waifu_perks.push({
  title: 'Bull of Heaven',
  waifu: 'Ishtar',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/haMwMjv.png?1',
  cost: 500,
  desc: 'Ishtar\'s familiar, Gugalanna. was the greatest of the Mesopotamian Divine Beasts. The bull the size of a mountain required Gilgamesh and Enkidu to work together to defeat it. Ordinarily. Gugalanna is only available for capture during the Snowfield Grail War, as the version of Ishtar at the Babylonian Singularity and Chaldea sheepishly admitted that she lost her pet - though she later manifested it as a diminutive mascot. This perk restores "Gugalanna Lily* to its full power, but does not raise Ishtar\'s tier. ',
})
waifu_perks.push({
  title: 'Tainted Vessel',
  waifu: ['Matou Sakura', 'Matou Rin '],
  from: 'Nasuverse',
  image: 'https://i.imgur.com/bDrHkOw.png?1',
  cost: 498,
  desc: 'The adopted daughter of the Matou, whether Sakura or Rin, has been corrupted by Angra Mainyu as per the events of Heaven\'s Feel. The subject of this perk only counts as directly captured if she\'s already experienced her gothic makeover. Otherwise, you\'ll still only have regular Matou Sakura or Matou Rin. Dark Sakura and Dark Rin both qualify for special Alterzelu Symbiote theming. If you already have Undivided, Knight of the Cherry Blossom, or Kouhai of Light and want Dark Sakura, you may still purchase this, pre-applied to a new Sakura, for 500 credits. If you already have Nameless Red Devil or Mistress of Heaven, or created Kaleido Ruby and want Dark Rin. you may still purchase this, pre-applied to a new Rin, for 500 credits. ',
})
waifu_perks.push({
  title: 'All the World\'s Evils',
  waifu: ['Dark Sakura', 'Dark Rin'],
  from: 'Nasuverse',
  image: 'https://i.imgur.com/db85iO2.png?1',
  cost: 500,
  desc: 'Dark Sakura or Dark Rin has fully merged with Angra Mainyu to become the Beast of Retribution. Even if you have both Dark Sakura and Dark Rin, you may only apply this perk to one of them. Beast Sakura and Beast Rin both qualify for special Alterzelu Symbiote theming. ',
})
waifu_perks.push({
  title: 'Undivided',
  waifu: 'Matou Sakura',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/lyLZeeR.png?1',
  cost: 18,
  desc: 'Sakura is instead the non-canon Tohsaka Sakura, a version who was trained in her Imaginary Numbers element and may or may not have separated from her sister. If you already have Matou Rin alongside this Sakura, they will recognize each other. This perk may not be applied to the same Sakura as Tainted Vessel, Knight of the Cherry Blossom, or Kouhai of Light. If you already have either of those perks and want Tohsaka Sakura, you may still purchase this, pre-applied to a new Sakura, for 20 credits.',
})
waifu_perks.push({
  title: 'Knight of the Cherry Blossom',
  waifu: 'Matou Sakura',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/xTfsODX.png?1',
  cost: 98,
  desc: 'Sakura (Matou) is grafted with the Berserker Class Card of Lancelot du Lac. She will see you as her Senpai at all times. When she has Lancelot\'s card equipped, her morality will recede until only your wants and safety are on her mind. If you capture the Miyuverse version of Sakura, even before the Ainsworth Grail War, she will already have this. This perk may not be applied to the same Sakura as Tainted Vessel, Kouhai of Light, or Undivided. If you already have any of those perks and want Berserker Sakura, you may still purchase this, pre-applied to a new Sakura, for 100 credits.',
})
waifu_perks.push({
  title: 'Kouhai of Light',
  waifu: 'Matou Sakura',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/xapAe6N.png?1',
  cost: 198,
  desc: 'Sakura or Tsubone is instead the Lancer-class Pseudo-Servant Parvati, the Hindu goddess and wife of Shiva as portrayed in Fate/Grand Order. If you purchase or capture the intended host first and apply this perk later, Parvati will keep her host\'s memories and a blend of both host and Servant\'s personalities, as if she had taken Substitute into her host\'s life; if you purchase the host and this perk simultaneously, you will only get Parvati. This perk may not be applied to the same Sakura as Tainted Vessel. Undivided, or Knight of the Cherry Blossom',
})
waifu_perks.push({
  title: 'Snow Fairy',
  waifu: 'lllyasviel von Einzbem',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/EC2avVn.jpg?1',
  cost: 50,
  desc: 'Iliya Is instead the Alter Ego-class Pseudo-Servant Sitonai, an amalgamation of herself, the Ainu Heroic Spirit, the Finnish witch-queen Louhi, and the Norse love goddess Freyja. She also has her pet polar bear, Shirou, as a familiar. If you purchase or capture Iliya first and apply this perk later, Sitonai will keep Iliya\'s memories, as if she had taken Substitute into her host\'s life; if you purchase Iliya and this perk simultaneously, you will only get Sitonai. This perk may not be applied to the same Iliya as Kaleidostick Magical Ruby. If you already have Prisma Iliya and want Sitonai. you may still purchase this, pre applied to a new Iliya, for 100 credits.',
})
waifu_perks.push({
  title: 'Jungle Beast',
  waifu: 'Fujimura Taiga',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/eTtImVQ.jpg?1',
  cost: 48,
  desc: 'Taiga is instead the Lancer-class Pseudo-Servant Jaguarman, an amalgamation of jaguar-related Mesoamerican deities. If you purchase or capture Taiga first and apply this perk later, Jaguarman will keep Taiga\'s memories, as if she had taken Substitute into her host’s life; if you purchase Taiga and this perk simultaneously, you will only get Jaguarman. If you have Quetzalcoatl or anyone else involved in the Babylonia singularity alongside Jaguarman, they will recognize each other. ',
})
waifu_perks.push({
  title: 'Scales of Justice',
  waifu: 'Luvia Edelfelt',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/QbDtkDu.png?1',
  cost: 80,
  desc: 'Luvia is instead the Ruler-class Pseudo-Servant Astraea, the Greek goddess of justice as portrayed in Fate/Grand Order. If you purchase or capture Luvia first and apply this perk later, Astraea will keep Luvia\'s memories, as if she had taken Substitute into her host\'s life; if you purchase Luvia and this perk simultaneously, you will only get Astraea. This perk may not be applied to the same Luvia as Kaleidostick Magical Sapphire. If you already have Kaleido Sapphire and want Astraea, you may still purchase this, pre-applied to a second Luvia, for 100 credits.',
})
waifu_perks.push({
  title: 'Calling Agape',
  waifu: 'Caren Hortensia',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/r32iuWY.png?1',
  cost: 98,
  desc: 'Caren is instead the host of Ruler-class Pseudo-Servant Amor, better known as Cupid, as portrayed in Fate/Grand Order. If you purchase or capture Caren first and apply this perk later, Amor will keep Caren\'s memories, as if she had taken Substitute into her host’s life; if you purchase Caren and this perk simultaneously, you will only get Amor.',
})
waifu_perks.push({
  title: 'La Pucelie',
  waifu: 'Laeticia',
  from: 'Nasuverse',
  tier: 6,
  image: 'https://i.imgur.com/Kz0Ra2K.jpg?1',
  cost: 49,
  desc: 'Laeticia is one again host to the Ruler-class Maiden of France, Jeanne d\'Arc. If you purchase or capture Laeticia first and apply this perk later, Jeanne will keep Laeticia\'s memories, as if she had taken Substitute into her host\'s life; if you purchase Laeticia and this perk simultaneously, you will only get Jeanne. If you have Mordred or anyone else involved in the Grand Holy Grail War, Marie Antoinette or anyone else involved in the Orleans singularity, or Altera or anyone else involved in the Extella timeline alongside Jeanne, they and Jeanne will recognize each other. ',
})
waifu_perks.push({
  title: 'Gardens of Vainglory',
  waifu: 'Semiramis',
  from: 'Nasuverse',
  tier: 7,
  image: 'https://i.imgur.com/Oiuc8yV.png?1',
  cost: 50,
  desc: 'Semiramis\'s Noble Phantasm, the Hanging Gardens of "Babylon/ normally requires genuine Mesopotamian materials in its construction. As such, it is impossible to construct in a world where Mesopotamia doesn\'t exist. This perk bypasses that restriction, allowing you to witness the power of the fully armed and operational battle station in any setting.',
})
waifu_perks.push({
  title: 'White Titan',
  waifu: 'Altera',
  from: 'Nasuverse',
  tier: 10,
  image: 'https://i.imgur.com/08F0QsU.png?1',
  cost: 800,
  desc: 'Altera may now access her original form, Velber 02, the White Titan Sefar. She will maintain her original mind and control her size while in this form, without any compulsion to destroy everything or self-destruct after doing so. If you have ten purchases of Bifurcation, Altera will benefit from that perk as well. If you have Demeter or any of the gods Altera killed in this form, or Hakuno or anyone else involved in the Extella timeline alongside Altera, they and Altera will recognize each other. If your Altera has this perk, you will also receive the T6 Servant Altera Larva for free. ',
})
waifu_perks.push({
  title: 'Breed of Calamity',
  waifu: ['Altrouge Brunestud', 'Mash Kyrielight'],
  tier: 10,
  from: 'Nasuverse',
  image: 'https://i.imgur.com/xgs8Ohe.png?1',
  cost: 1000,
  desc: 'Altrouge\'s or Mash\'s pet. known by the former as Primate Murder and the latter as just Fou, is no mere familiar, but the dormant form of Beast IV (Comparison). When either of its mistresses is purchased or captured, it will appear in its non-sapient, depowered form as their familiar; merely applying a binding will not bypass the purchase of this perk, even if you capture the real Primate Murder/Fou before it\'s depowered. This perk restores its intelligence and powers to their full potential and allows it to assume a humanoid form if desired. You may only have one Beast IV at a time, whether or not this perk is applied; if you have both Altrouge and Mash, they will both take care of it. This perk will not affect Altrouge\'s or Mash\'s own tier ratings.',
})
waifu_perks.push({
  title: 'Kaleidostick Magical Ruby',
  waifu: ['Tohsaka Rin', 'lllyasviel von Emzbern '],
  from: 'Nasuverse',
  tier: 7,
  image: 'https://i.imgur.com/D1P53XP.png?1',
  cost: 50,
  desc: 'The perverted and troublesome Mystical Code, capable of taking its user between worlds in the same local multiverse May be given to Rin to create Kaleido Ruby or Iliya to create Prisma Iliya, but not both. If you purchase or capture Rin or Iliya first and apply this perk later, the recipient will not receive any new memories from the Prisma Iliya timeline; if you purchase Rin or Ulya and this perk simultaneously, you will only get the version from the Prisma Iliya timeline. This perk may not be applied to the same Rin as Swapped Vessel, Nameless Red Devil, or Mistress of Heaven, or the same Iliya as Snow Fairy If you already have any of those perks for Rin and want Kaleido Ruby, or have Sitonai and want Prisma Ulya, you may still purchase this, pre-applied to a new Rin or Iliya as appropriate, for 100 credits.',
})
waifu_perks.push({
  title: 'Kaleidostick Magical Sapphire',
  waifu: 'Luvia Edelfelt',
  from: 'Nasuverse',
  tier: 7,
  image: 'https://i.imgur.com/oo2RCAH.png?1',
  cost: 80,
  desc: 'The perverted and troublesome Mystical Code, capable of taking its user between worlds in the same local multiverse. May be given to Luvia to create Kaleido Sapphire. If you purchase or capture Luvia first and apply this perk later, she will not receive any new memories from the Prisma Iliya timeline; if you purchase Luvia and this perk simultaneously, you will only get the version from the Prisma Iliya timeline. Miyu Edelfelt is assumed to always have Magical Sapphire, so this perk is not available if you have her. This perk may not be applied to the same Luvia as Scales of Justice. If you already have Astraea and want Kaleido Sapphire (but don\'t have Miyu), you may still purchase this, pre-applied to a second Luvia, for 100 credits.',
})
waifu_perks.push({
  title: 'Imperial Strategist',
  waifu: 'Reines El-Melloi Archisorte',
  from: 'Nasuverse',
  tier: 6,
  image: 'https://i.imgur.com/8tccdTz.png?1',
  cost: 30,
  desc: 'Reines is the host to the Rider-class Pseudo-Servant Sima Yi, a general of the Three Kingdoms era as portrayed in Fate/Grand Order. Unlike most other Pseudo-Servants, the two explicitly share her body in FGO canon.',
})
waifu_perks.push({
  title: 'Great Statue God',
  waifu: 'Jinako Carigiri',
  from: 'Nasuverse',
  tier: 7,
  image: 'https://i.imgur.com/ky2TFC6.jpg?1',
  cost: 90,
  desc: 'Jinako is instead the Moon Cancer-class Pseudo-Servant Ganesha, the Hindu god of beginnings and wisdom as portrayed in Fate/Grand Order - and yes, she really is that plump. It\'s canon. If you purchase or capture Jinako first and apply this perk later, Ganesha will keep Jinako\'s memories, as if she had taken Substitute into her host\'s life; if you purchase Jinako and this perk simultaneously, you will only get Ganesha. If you have Lakshmibai or anyone else involved in the fourth Lostbelt, Yuga Kshetra, they will recognize each other.',
})
waifu_perks.push({
  title: 'Ruyi Jingu Bang',
  waifu: 'Fujimaru Ritsuka ',
  from: 'Nasuverse',
  image: 'https://i.imgur.com/dBTgBkJ.jpg?1',
  cost: 480,
  desc: 'The Female Master of Chaldea has blended with the Monkey King, Sun Wukong, to become a Lancer-class Pseudo-Servant. We\'re not quite sure how it happened either • the Research Department\'s best guess is that it had something to do with the Journey to the West event and the pair’s extreme compatibility. The Male Master of Chaldea is not eligible for this perk',
})
waifu_perks.push({
  title: 'Lord Camelot',
  waifu: 'Mash Kyrielight',
  from: 'Nasuverse',
  image: '',
  cost: 150,
  desc: 'The Round Table, a gathering place for heroes: the round shape of Mash\'s shield and its direct connection to the original Round Table are the catalyst for Chaldea\'s FATE Servant-summoning system. This perk allows you to roll on Fate/Grand Order’s infamous gacha both in- and outside of the Nasuverse. Servants summoned using this perk are not automatically bound, but may be controlled using the same Command Seals that you acquired elsewhere in the Nasuverse or purchased in the Other Controls section. This perk does not alter Mash\'s tier rating. Individuals summoned through Lord Camelot will not award credits upon capture or sale. You get one free 10-roll when you purchase this perk and can earn additional Saint Quartz under the same rules as Exit Stage Left, at a rate of 1 SQ per 5% progression. Saint Quartz may also be purchased with company credits. The rates on offer may be found in the chart to the right. <h3 class="text-lg">Other Gachas</h3><p>If you have at least one character in your retinue who’s from a world that started as a mobile game, that gacha’s roll list will be added to Grand Order\'s. For example, having Eula Lawrence or Beidou will add the Genshin Impact roll list, having Enterprise or Zuikaku will add the Azur Lane roll list, and having Siege or Ch’en will add the Arknights roll list. </p>',
})
waifu_perks.push({
  title: 'Beautiful Journey',
  waifu: 'Leonardo da Vinci',
  from: 'Nasuverse',
  image: '/img/waifu_perks/journey.jpg',
  cost: 100,
  desc: 'This perk grants da Vinci an inexorable connection to the Shadow Border, the heavily-armored vehicle that served as Chaldea\'s mobile base during Cosmos in the Lostbelt. This version even has some slight improvements over the original. First, the condition of the vehicle is now tied to da Vinci\'s own health. As long as she is in top condition, the Shadow Border will self-repair from any damage taken. This only works one way, so da Vinci can\'t be injured by attacking the Shadow Border. Second, it can Zero Sail through Imaginary Number Space and into other universes. Much like traveling to Lostbelts, however, you must establish a connection with something or someone in the target universe so you can anchor yourself to that location. In your case, captured and yoinked waifus count for their respective universes of origin. Finally, Zero-Sailing is now 100% nonlethal. It still has a tendency to... misfire somewhat at times, but you\'ll always end up in a place where you needed to be, even if it isn\'t where you wanted to go. This perk does not affect da Vinci\'s tier rating. ',
})
waifu_perks.push({
  title: 'Mara Avaloda',
  waifu: 'Kama',
  from: 'Nasuverse',
  tier: 10,
  image: 'https://i.imgur.com/tfJAhlu.png?1',
  cost: 800,
  desc: 'Kama\'s other half, Mara, the true Demon King of the Sixth Heaven, has awakened as Beast 11 l/L (Lapse), an Evil of Humanity. Kama/Mara is the true counterpart to Beast lll/R (Rapture) Sessyoin Kiara and qualifies for special Alterzelu Symbiote theming. ',
})
waifu_perks.push({
  title: 'Star of Calamity',
  waifu: ['Tamamo Vitch', 'Koyanskaya'],
  from: 'Nasuverse',
  tier: 10,
  image: '/img/waifu_perks/calamity.jpg',
  cost: 900,
  desc: 'Koyanskaya\'s attempt to collect nine tails has succeeded, ascending her into an alternative Beast IV. She maintains her abilities as a Servant, but with power befitting a Tier 10, and can assume her Beast form at will. Like regular Koyanskaya, Treasured Beast Koyanskaya also qualifies for special Alterzelu Symbiote theming. ',
})
waifu_perks.push({
  title: 'Golden Arms Redemption',
  waifu: 'Olga Marie Animusphere',
  from: 'Nasuverse',
  tier: 11,
  image: 'https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/oto__sample_1d16e0ae1b004238de367d6bd940442d.jpg',
  cost: 11111,
  desc: '███████ █ ███████████ ██████████ ████████ ██ ███ ███████ ██████████████ ████████████████ █████████ ██████████ █████ VII: Alien God███████ ██ ██████ █████████ ███ ██████████ ██ █████████████ ████████████████ ███████████████ ███████████████ ████ █ ██████████ ███████',
})
waifu_perks.push({
  title: 'Reinforce Eins',
  waifu: 'Reinforce Zwei ',
  from: 'Magical Girl Lyrical Nanoha',
  tier: 8,
  image: 'https://i.imgur.com/arMoaPl.png?1',
  cost: 150,
  desc: 'Instead of the second Reinforce, you have the original. This upgrades the Tome of the Night Sky to its full power, including a non-rampant NachtWal. (NachtWal is not a waifu.) If you have Reinforce Zwei and all four Wolkenritter, this upgrade only costs 100. If you captured Reinforce Zwei or there was any amount of time between buying her and this upgrade, Zwei will gain the complete Tome, NachtWal, and Eins\' full-size adult form, costumes, and memories, but her personality will not be affected. ',
})
waifu_perks.push({
  title: 'Duotheism',
  waifu: 'Kaname Madoka & Akemi Homura',
  from: 'Madoka Magica',
  image: 'https://i.imgur.com/xBJElWv.png?1',
  cost: 11111,
  discount: 150,
  desc: 'The two lead magical girls have ascended into their goddess forms, becoming Ultimate Madoka ("Madokami") and Akuma Homura (“Homucifer”). You must have both Madoka and Homura to buy this perk as an upgrade; the single T11 ticket will pay for both. Madoka will usually be the sole queen of an Alterzelu Symbiote swarm, due to Homura\'s dedication to her partner, and qualifies for special theming. When this is purchased as an upgrade, the two will experience no changes to their personalities. If this is purchased outright, Akuma Homura may instead have her Original Series or "Moemura" personalities, depending on contractor preference. Madoka\'s divine ascension was the result of a wish to grant hope to all magical girls. A Madoka captured normally will already be a magical girl and thus cannot make a second wish, so some builds may find this perk impossible to earn. In that event, if you already have Homura in your retinue, and capture Madoka before or during Walpurgisnacht’s attack, this perk wil bel earned when Madoka joins the battle.',
})
waifu_perks.push({
  title: 'Mitama\'s Special Orb',
  waifu: 'Hozumi Shizuku ',
  from: 'Madoka Magica',
  tier: 8,
  image: '',
  cost: 150,
  desc: 'A duplicate of the Mirror\'s Cup prize Mitama crafted using energy from the Mirror Witch\'s Labyrinth, then stolen by one of her Familiars copying Shizuku and her magic. The original opened a portal that brought Nanoha, Fate, and Hayate to Kamihama City. With this orb, the size and range of the portals Shizuku can create are increased, enabling her to open portals to other worlds and travel the multiverse instead of just one planet. ',
})
waifu_perks.push({
  title: 'Uwasa Of Kamihamas Holy Maiden',
  waifu: 'Tomoe Mami ',
  from: 'Madoka Magica',
  tier: 8,
  image: 'https://i.imgur.com/FkgLJiC.png?1',
  cost: 150,
  desc: 'Mami is fused with the Uwasa Of Kamihama\'s Holy Maiden, greatly increasing her magical power and stamina. She can freely switch between it and her normal magical girl outfit, with the change being purely cosmetic. ',
})
waifu_perks.push({
  title: 'No Moon',
  waifu: 'Chibiusa',
  from: 'Sailor Moon',
  tier: 8,
  image: 'https://i.imgur.com/XnXrpIo.png?1',
  cost: 100,
  desc: 'Chibiusa is instead Black Lady, her brainwashed Black Moon alter-ego with massive parental issues. Black Lady qualifies for special Alterzelu Symbiote theming.lf you captured Chibiusa or there was any amount of time between buying her and this upgrade, she will gain Black Lady\'s form, costumes, and additional power, but her personality will not be affected. Strangely, Black Lady x Mistress 9 is a frequent ship in the Sailor Moon fanart community, despite the two never meeting or even appearing in the same seasons.',
})
waifu_perks.push({
  title: 'Pharaoh\'s Herald',
  waifu: 'Tomoe Hotaru',
  from: 'Sailor Moon',
  tier: 9,
  image: 'https://i.imgur.com/TyYQzwt.png?1',
  cost: 300,
  desc: 'Hotaru is instead the Messiah of Silence, Mistress 9, with the corresponding power boost and no connection to Pharaoh 90. Mistress 9 qualifies for special Alterzelu Symbiote theming. If you captured Hotaru or there was any amount of time between buying her and this upgrade, she will gain Mistress 9\'s form, costumes, and additional power, but her personality will not be affected. Strangely, Black Lady x Mistress 9 is a frequent ship in the Sailor Moon fanart community, despite the two never meeting or even appearing in the same seasons.',
})
waifu_perks.push({
  title: 'Eternal',
  waifu: 'Tsukino Usagi',
  from: 'Sailor Moon',
  tier: 11,
  image: 'https://i.imgur.com/6onERUp.png?1',
  cost: 11111,
  discount: 500,
  desc: 'deThe 90s anime made Sailor Moon popular worldwide, but its divergent narrative left out lore from the later manga arcs that made the title character even more potent than she already was. This perk elevates your anime version of Usagi to the same heights. If you capture the manga/Crystal version of Usagi, she will always have this perk. Both versions of Usagi qualify for special Alterzelu Symbiote theming.sc',
})
waifu_perks.push({
  title: 'XV',
  waifu: 'Kohinata Miku',
  from: 'Symphogear',
  tier: 9,
  image: 'https://i.imgur.com/eGO8M3L.png?1',
  cost: 300,
  desc: 'Miku is now the host to Shem-Ha Mephorash, the devil who betrayed her fellow Custodians, attempted to enslave humanity, and survived her defeat by embedding herself within human language. Shem-Ha may instead be purchased separately, in her own body, for 500 credits. Both versions of Shem-Ha qualify for special Alterzelu Symbiote theming. ',
})
