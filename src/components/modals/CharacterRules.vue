<template>
  <Modal label="Rules for submitting a character">
    <div class="max-h-[85vh] md:h-3/4 bg-gray-300 dark:bg-gray-800 overflow-y-auto min-h-0 flex flex-col gap-2 p-2">
      <Note type="info" title="Tier">
        If you don't know what Tier assign to a Character check out
        <router-link :to="{path:'/', hash:'#pandora'}" class="text-teal-500 hover:underline">
          this
        </router-link>
      </Note>
      <Note type="info" title="Images">
        <div class="linkList">
          <span>If you want to add NSFW image there is a list of sites that were confirmed to work: </span>
          <a href="https://danbooru.donmai.us/" target="_blank" rel="noopener noreferrer">Danbooru</a>
          <a href="http://www.hentai-foundry.com/" target="_blank" rel="noopener noreferrer">HentaiFoundry</a>
          <a href="https://e621.net/" target="_blank" rel="noopener noreferrer">e621</a>
          <a href="https://safebooru.org/" target="_blank" rel="noopener noreferrer">Safebooru</a>
          <a href="http://paheal.net" target="_blank" rel="noopener noreferrer">Paheal</a>
          <a href="https://www.furaffinity.net/" target="_blank" rel="noopener noreferrer">Furaffinity</a>
          <a href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer">Reddit</a>
          <a href="https://imgur.com" target="_blank" rel="noopener noreferrer">Imgur</a>
        </div>
      </Note>
      <Note type="warning" title="R63 images">
        Due to popular vote male characters with R63 images will not be accepted. NSFW R63 images are allowed though (they need to be NSFW still).
      </Note>
      <h3>Rules are sorted in order of importance and <b>forbidding</b> in nature. While breaking the lower ones can still be tolerated, it will increase the chance that your character won't be added. Tops one is a flat-out no.</h3>
      <ul class="list-decimal list-inside">
        <li>Duplicates / Gender Bender / Alternative looking ones of <b>already existing</b> characters</li>
        <li>Lolicon in NSFW images.</li>
        <li>Characters that use not <b>their own image.</b></li>
        <li>Characters with a <b>photo</b> where an <b>art</b> option is available. Photos of real people that did not reached 18 years old.</li>
        <li>Original Characters that didn't appeared anywhere or don't have <b>original art</b> (if you can't find them in google they don't exist).</li>
        <li>Alternative versions of same characters.</li>
        <li>Tier 1-2 characters with <b>bad images</b> or from relatively <b>unpopular</b> works.</li>
        <li>NSFW images that not NSFW in nature won't be accepted.</li>
        <li>Bad quality images.</li>
      </ul>
    </div>
  </Modal>
</template>
