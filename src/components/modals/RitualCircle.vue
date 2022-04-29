<template>
  <Modal label="Ritual circle">
    <div class="overflow-y-auto max-h-[85vh]">
      <h3 class="text-lg text-center font-semibold">
        Ritual Circle: Design Parameters
      </h3>
      <div class="overflow-x-auto">
        <Table :headers="headers" :rows="table" class="text-sm m-1 w-max md:w-auto" />
      </div>
      <Desc :desc="desc" />
    </div>
  </Modal>
</template>

<script lang='ts' setup>

const desc = `
<p>Binding incantations are simple, but require an entity with Will to speak them. The app provides an easy pronunciation guide. With constant incantation, chanting cannot stop for more than one minute or the circle will fail and all progress lost. An activation incantation takes ten minutes, at which point the circle will remain active for 1.5x the Requirement for binding. Extended Duration increases the time the circle remains active to 15x the Requirement, but requires an activation chant of one-tenth the Requirement or one hour, whichever is shorter. Indefinite Duration further increases the time the circle remains active, with no further effect on chant length. With App Trigger, the circle may be remotely activated or deactivated via your company smart device.</p>
<p>Affected waifu tiers are mostly self-explanatory. By default, an activated circle is obvious to waifus in the intended tier or above. A basic circle, with 0 points invested in Tier, glows brightly while active, but with one point is just lines on the ground, but still feels magically active. 2 points makes it more subtle, so that only silver-star waifus or higher can detect it. The higher the investment, the harder it is for the circle to be detected while active and the greater the maximum tier of people that it can affect.</p>
<p>Effect [duration] is only relevant for certain specialty circles. The standard binding circle’s effect is as permanent as any other non-Tempest binding. Network is only relevant for Teleportation Circles and not usable unless you can create them.</p>
`
const headers = ['Invested Points', 'Diameter', 'Requirement', 'Trigger', 'Tier', 'Effect*', 'Network']
const table = [
  [
    '0',
    '1 m',
    '243 hours (10 days)',
    'Constant Incantation',
    'Targets: Blue-star Hidden from: None',
    '10 minutes',
    'One-way only',
  ],

  [
    '1',
    '3 m',
    '81 hours',
    'Activation Incantation',
    'Targets: Copper-star Hidden: Blue-star',
    '1 hour',
    '2',
  ],

  [
    '2',
    '9 m',
    '27 hours',
    'Extended Duration',
    'Targets: Silver-star Hidden: Copper-star',
    '8 hours',
    '3',
  ],

  [
    '3',
    '27 m',
    '9 hours',
    'Indefinite Duration',
    'Targets: Gold-star Hidden: Silver-star',
    '24 hours',
    '4',
  ],

  [
    '4',
    '81 m',
    '3 hours',
    'Always On',
    'Targets: All Hidden: Gold-star',
    '1 week',
    '5',
  ],

  [
    '5',
    '243 m',
    '1 hour',
    'App Trigger',
    'Targets: All Hidden: All',
    '1 month',
    '6',
  ],

  [
    '6',
    '729 m',
    '20 minutes',
    'N/A',
    'N/A',
    '3 months',
    '7',
  ],

  [
    '7',
    '2187 m',
    '6:40 minutes',
    'N/A',
    'N/A',
    '1 year',
    '8',
  ],

  [
    '8',
    '6561 m',
    '2:13 minutes',
    'N/A',
    'N/A',
    'Indefinite',
    '9',
  ],

  [
    '9+',
    'x 3 each',
    'x 1/3 each',
    'N/A',
    'N/A',
    'N/A',
    '+1 each',
  ],
]
</script>
