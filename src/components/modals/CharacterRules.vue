<template>
  <Modal label="Rules for submitting a character">
    <div class="max-h-[85vh] md:h-3/4 bg-gray-300 dark:bg-gray-800 overflow-y-auto min-h-0 flex flex-col gap-2 p-2 scrollbar">
      <Note type="info" title="Tier">
        If you don't know what Tier assign to a Character check out
        <router-link :to="{path:'/', hash:'#tierlist'}" class="text-teal-500 hover:underline">
          this
        </router-link>
      </Note>
      <Note type="info" title="Images">
        <div class="linkList">
          <span>If you want to add NSFW image there is a list of sites that were confirmed to work: </span>
          <!-- <a href="https://danbooru.donmai.us/" target="_blank" rel="noopener noreferrer">Danbooru</a> -->
          <a href="http://www.hentai-foundry.com/" target="_blank" rel="noopener noreferrer">HentaiFoundry</a>
          <a href="https://e621.net/" target="_blank" rel="noopener noreferrer">e621</a>
          <a href="https://safebooru.org/" target="_blank" rel="noopener noreferrer">Safebooru</a>
          <a href="http://paheal.net" target="_blank" rel="noopener noreferrer">Paheal</a>
          <a href="https://www.furaffinity.net/" target="_blank" rel="noopener noreferrer">Furaffinity</a>
          <a href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer">Reddit</a>
        </div>
      </Note>
      <Note type="warning" title="R63 images">
        Due to popular vote male characters with R63 images will not be accepted. NSFW R63 images are allowed though (they need to be NSFW still).
      </Note>
      <h3>
        Rules are <b>forbidding</b> in nature. Do note that these rules are purely on who gets added to Interactive's global database, and not a rules for actual WC, these are described in <router-link class="text-blue-800 dark:text-blue-400 hover:underline" :to="{path: '/', hash: '#captures'}">
          Extending Your Build: Captures
        </router-link> rules.
      </h3>
      <ul class="list-decimal list-inside leading-relaxed text-lg">
        <li>Real Life people born after 19th century, including the ones that play themselves in some work of fiction</li>
        <li>Kids without aged-up images, low tier kids without any abilities</li>
        <li>Duplicates / Gender Bender / Alternative looking ones of <b>already existing</b> characters</li>
        <li>Lolicon in NSFW images.</li>
        <li>Characters that use not <b>their own image.</b></li>
        <li>Characters with a <b>photo</b> where an <b>art</b> option is available. Photos of real people that did not reached 18 years old.</li>
        <li>Bad quality/low resolution images. While what is an 'bad image' is subjective, aim for at least a clear shot of the character that fits the companion's card, lacks any other distractions in the shot, and has a high enough resolution.</li>
        <li>Original Characters that didn't appeared anywhere or don't have <b>original art</b> (if you can't find them in google they don't exist). Using AI art to bypass this rule will not work.</li>
        <li>Alternative versions of same characters. If the tier and personality is close to original - its a duplicate.</li>
        <li>Tier 1-2 characters with no tags, mediocre image or from relatively <b>unpopular</b> works.</li>
        <li>NSFW images that not NSFW in nature. NSFW means nudity in this case, not porn, porn is not accepted.</li>
        <li>VTubers. They are too close to real people.</li>
        <li>Monsters or Generic beings without good image and some unique tags, or from unpopular worlds.</li>
        <li>Non-standard symbols used in naming, such as è, õ, ü, etc.  </li>
      </ul>

      <div class="flex flex-col gap-1 text-gray-800 dark:text-gray-300">
        <h4 class="text-lg text-center">
          <i>Important!</i>
        </h4>
        <p>
          <i>
            We appreciate your interest in submitting content to our platform, and we value the dedication and contributions of our community. While we have established guidelines and rules to govern the submission process, it is important to understand that adherence to these guidelines alone does not guarantee acceptance. The review and acceptance of submissions are subject to our discretion and evaluation process, which considers various factors, including but not limited to quality, relevance, audience fit, and overall alignment with our platform's objectives.
          </i>
        </p>
        <p>
          <i>
            Our aim is to maintain a high standard of content that resonates with our audience and serves the best interests of our community. As such, submissions that technically comply with our rules may still not be accepted if they do not meet our quality and relevance criteria.
          </i>
        </p>
        <p>
          <i>
            We encourage all contributors to submit their best attempt, and strive for excellence in their contributions.
          </i>
        </p>
        <p>
          <i>
            Please understand that our review process is designed to maintain the overall quality and integrity of our platform, and our decisions are made in good faith to provide the best experience for our audience.
          </i>
        </p>
        <p>
          <i>
            Thank you for your understanding, and we look forward to reviewing your submissions.
          </i>
        </p>
      </div>
    </div>
  </Modal>
</template>
