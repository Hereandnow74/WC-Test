export const XBBCODE = (function() {
  const me = {}
  const colorCodePattern = /^#?[a-fA-F0-9]{6}$/
  let tagList
  const tagsNoParseList = []
  let bbRegExp
  let pbbRegExp
  let pbbRegExp2
  let openTags
  let closeTags

  const tags = {
    'b': {
      openTag: () => '<b>',
      closeTag: () => '</b>',
    },
    'br': {
      openTag: () => '<br>',
    },
    'center': {
      openTag: () => '<div style="text-align: center;">',
      closeTag: () => '</div>',
    },
    'color': {
      openTag: (params) => {
        const colorCode = params.get('color') || 'black'
        return `<span style="color:${colorCode}">`
      },
      closeTag: () => '</span>',
    },
    'font': {
      openTag: (params) => {
        const font = params.get('font')?.replace(/'/g, '') || 'inherit'
        return `<span style="font-family:${font};">`
      },
      closeTag: () => '</span>',
    },
    'hr': {
      openTag: () => '<hr>',
      singleTag: true,
    },
    'i': {
      openTag: () => '<i>',
      closeTag: () => '</i>',
    },
    'justify': {
      openTag: () => '<div style="text-align: justify;">',
      closeTag: () => '</div>',
    },
    'list': {
      openTag: (params) => {
        const type = parseInt(params.get('list')) || 0

        if (type === 1)
          return '<ol>'

        else
          return '<ul>'
      },
      closeTag: (params) => {
        const type = parseInt(params.get('list')) || 0

        if (type === 1)
          return '</ol>'

        else
          return '</ul>'
      },
      restrictChildrenTo: ['*', 'br'],
    },
    'pre': {
      openTag: () => '<pre>',
      closeTag: () => '</pre>',
      noParse: true,
    },
    'right': {
      openTag: () => '<div style="text-align: right;">',
      closeTag: () => '</div>',
    },
    's': {
      openTag: () => '<span style="text-decoration:line-through;">',
      closeTag: () => '</span>',
    },
    'size': {
      openTag: (params) => {
        const size = params.get('size')
        return `<span style="font-size:${size}%;">`
      },
      closeTag: () => '</span>',
    },
    'sub': {
      openTag: () => '<sub>',
      closeTag: () => '</sub>',
    },
    'sup': {
      openTag: () => '<sup>',
      closeTag: () => '</sup>',
    },
    'u': {
      openTag: () => '<u>',
      closeTag: () => '</u>',
    },
    /*
                The [*] tag is special since the user does not define a closing [/*] tag when writing their bbcode.
                Instead this module parses the code and adds the closing [/*] tag in for them. None of the tags you
                add will act like this and this tag is an exception to the others.
            */
    '*': {
      openTag: () => '<li>',
      closeTag: () => '</li>',
      restrictParentsTo: ['list'],
    },
  }

  // create tag list and lookup fields
  function initTags() {
    tagList = []
    let prop,
      ii,
      len
    for (prop of Object.keys(tags)) {
      if (Object.prototype.hasOwnProperty.call(tags, prop)) {
        if (prop === '*') {
          tagList.push(`\\${prop}`)
        }
        else {
          tagList.push(prop)
          if (tags[prop].noParse)
            tagsNoParseList.push(prop)
        }

        tags[prop].validChildLookup = {}
        tags[prop].validParentLookup = {}
        tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || []
        tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || []

        len = tags[prop].restrictChildrenTo.length
        for (ii = 0; ii < len; ii++)
          tags[prop].validChildLookup[tags[prop].restrictChildrenTo[ii]] = true

        len = tags[prop].restrictParentsTo.length
        for (ii = 0; ii < len; ii++)
          tags[prop].validParentLookup[tags[prop].restrictParentsTo[ii]] = true
      }
    }

    bbRegExp = new RegExp(`<bbcl=([0-9]+) (${tagList.join('|')})([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>`, 'gi')
    pbbRegExp = new RegExp(`\\[(${tagList.join('|')})([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]`, 'gi')
    pbbRegExp2 = new RegExp(`\\[(${tagsNoParseList.join('|')})([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]`, 'gi');

    // create the regex for escaping ['s that aren't apart of tags
    (function() {
      const closeTagList = []
      for (let ii = 0; ii < tagList.length; ii++) {
        if (tagList[ii] !== '\\*') { // the * tag doesn't have an offical closing tag
          closeTagList.push(`/${tagList[ii]}`)
        }
      }

      openTags = new RegExp(`(\\[)((?:${tagList.join('|')})(?:[ =][^\\]]*?)?)(\\])`, 'gi')
      closeTags = new RegExp(`(\\[)(${closeTagList.join('|')})(\\])`, 'gi')
    })()
  }
  initTags()

  // -----------------------------------------------------------------------------
  // private functions
  // -----------------------------------------------------------------------------

  function checkParentChildRestrictions(parentTag, _bbcode, bbcodeLevel, _tagName, _tagParams, tagContents, errQueue) {
    errQueue = errQueue || []
    bbcodeLevel++

    // get a list of all of the child tags to this tag
    const reTagNames = new RegExp(`(<bbcl=${bbcodeLevel} )(${tagList.join('|')})([ =>])`, 'gi')
    const reTagNamesParts = new RegExp(`(<bbcl=${bbcodeLevel} )(${tagList.join('|')})([ =>])`, 'i')
    const matchingTags = tagContents.match(reTagNames) || []
    let cInfo
    let errStr
    let ii
    let childTag
    const pInfo = tags[parentTag] || {}

    reTagNames.lastIndex = 0

    if (!matchingTags)
      tagContents = ''

    for (ii = 0; ii < matchingTags.length; ii++) {
      reTagNamesParts.lastIndex = 0
      childTag = (matchingTags[ii].match(reTagNamesParts))[2].toLowerCase()

      if (pInfo && pInfo.restrictChildrenTo && pInfo.restrictChildrenTo.length > 0) {
        if (!pInfo.validChildLookup[childTag]) {
          errStr = `The tag "${childTag}" is not allowed as a child of the tag "${parentTag}".`
          errQueue.push(errStr)
        }
      }
      cInfo = tags[childTag] || {}
      if (cInfo.restrictParentsTo.length > 0) {
        if (!cInfo.validParentLookup[parentTag]) {
          errStr = `The tag "${parentTag}" is not allowed as a parent of the tag "${childTag}".`
          errQueue.push(errStr)
        }
      }
    }

    tagContents = tagContents.replace(bbRegExp, (matchStr, bbcodeLevel, tagName, tagParams, tagContents) => {
      errQueue = checkParentChildRestrictions(tagName.toLowerCase(), matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue)
      return matchStr
    })
    return errQueue
  }

  /*
          This function updates or adds a piece of metadata to each tag called "bbcl" which
          indicates how deeply nested a particular tag was in the bbcode. This property is removed
          from the HTML code tags at the end of the processing.
      */
  function updateTagDepths(tagContents) {
    tagContents = tagContents.replace(/<([^>][^>]*?)>/gi, (_matchStr, subMatchStr) => {
      const bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /)
      if (bbCodeLevel === null)
        return `<bbcl=0 ${subMatchStr}>`

      else
        return `<${subMatchStr.replace(/^(bbcl=)([0-9]+)/, (_matchStr, m1, m2) => m1 + (parseInt(m2, 10) + 1))}>`
    })
    return tagContents
  }

  /*
          This function removes the metadata added by the updateTagDepths function
      */
  function unprocess(tagContent) {
    return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi, '').replace(/<bbcl=[0-9]+ /gi, '&#91;').replace(/>/gi, '&#93;')
  }

  function parseParameters(tagName, tagParams) {
    const result = new Map()

    if (!tagParams) return result

    tagParams = tagParams.replaceAll('&#39;', '"')
    tagParams = tagParams.replaceAll('&quot;', '"')
    const paramList = tagParams.trim().match(/((?:[^\s"]+|"[^"]*")+)/g)

    for (const param of paramList) {
      let [key, ...value] = param.split('=')

      key = key?.toLowerCase() || tagName
      value = value.join('=').replace(/^"+|"+$/g, '')

      if (value.includes('"'))
        return null

      result.set(key, value)
    }

    return result
  }

  const replaceFunc = (matchStr, _bbcodeLevel, tagName, tagParams, tagContents) => {
    tagName = tagName.toLowerCase()

    const parsedParameters = parseParameters(tagName, tagParams)
    if (parsedParameters === null)
      return unprocess(matchStr)

    const tag = tags[tagName]
    let processedContent = tag.noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunc)
    const openTag = (tag.openTag) ? tag.openTag(parsedParameters, processedContent) : ''
    const closeTag = (tag.closeTag) ? tag.closeTag(parsedParameters, processedContent) : ''

    if (tag.displayContent === false)
      processedContent = ''

    return openTag + processedContent + closeTag
  }

  function parse(config) {
    let output = config.text
    output = output.replace(bbRegExp, replaceFunc)
    return output
  }

  function parseSingleTags(text) {
    for (const tag in tags) {
      if (tags[tag].singleTag)
        text = text.replaceAll(`[${tag}]`, tags[tag].openTag())
    }
    return text
  }

  /*
          The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
          tag, we must pre-process the input and add in closing tags [/*] for the star tag.
          We have a little leverage in that we know the text we're processing wont contain the <> characters (they have been
          changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
          help us define boundaries and figure out where to place the [/*] tags.
      */
  function fixStarTag(text) {
    text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, '<')
    text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, '>')

    while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, (matchStr) => {
      let innerListTxt = matchStr

      while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^[]*?)(\[\*\]|>\/list])/i, (_matchStr, contents, endTag) => {
        if (endTag.toLowerCase() === '>/list]')
          endTag = '</*]</list]'

        else
          endTag = '</*][*]'

        return `<*]${contents}${endTag}`
      })));

      innerListTxt = innerListTxt.replace(/>/g, '<')
      return innerListTxt
    })));

    // add ['s for our tags back in
    text = text.replace(/</g, '[')
    return text
  }

  function securityFixes(text) {
    return text
      .replaceAll(';', '&#59;')
      .replaceAll('\'', '&#39;')
      .replaceAll('"', '&quot;')
  }

  function addBbcodeLevels(text) {
    while (text !== (text = text.replace(pbbRegExp, (matchStr) => {
      matchStr = matchStr.replace(/\[/g, '<')
      matchStr = matchStr.replace(/\]/g, '>')
      return updateTagDepths(matchStr)
    })));
    return text
  }

  // -----------------------------------------------------------------------------
  // public functions
  // -----------------------------------------------------------------------------

  // API, Expose all available tags
  me.tags = () => tags

  // API
  me.addTags = (newtags) => {
    let tag
    for (tag in newtags)
      tags[tag] = newtags[tag]

    initTags()
  }

  me.process = (config) => {
    const ret = { html: '', error: false }; let errQueue = []

    config.text = securityFixes(config.text)

    if (config.convertLineBreaksToBbcode)
      config.text = config.text.replace(/(?:\r\n|\r|\n)/g, '[br][/br]\n')

    config.text = config.text.replace(/</g, '&lt;') // escape HTML tag brackets
    config.text = config.text.replace(/>/g, '&gt;') // escape HTML tag brackets

    config.text = config.text.replace(openTags, (_matchStr, _openB, contents) => `<${contents}>`)
    config.text = config.text.replace(closeTags, (_matchStr, _openB, contents) => `<${contents}>`)

    config.text = config.text.replace(/\[/g, '&#91;') // escape ['s that aren't apart of tags
    config.text = config.text.replace(/\]/g, '&#93;') // escape ]'s that aren't apart of tags
    config.text = config.text.replace(/</g, '[') // replace <'s that aren't apart of tags
    config.text = config.text.replace(/>/g, ']') // replace >'s that aren't apart of tags

    // process tags that don't have their content parsed
    while (config.text !== (config.text = config.text.replace(pbbRegExp2, (_matchStr, tagName, tagParams, tagContents) => {
      // Newlines should not be converted to [br] in tags that don't have their content parsed
      if (config.convertLineBreaksToBbcode)
        tagContents = tagContents.replaceAll('[br][/br]', '')

      tagContents = tagContents.replace(/\[/g, '&#91;')
      tagContents = tagContents.replace(/\]/g, '&#93;')
      tagParams = tagParams || ''
      tagContents = tagContents || ''

      return `[${tagName}${tagParams}]${tagContents}[/${tagName}]`
    })));

    config.text = fixStarTag(config.text) // add in closing tags for the [*] tag
    config.text = addBbcodeLevels(config.text) // add in level metadata

    errQueue = checkParentChildRestrictions('bbcode', config.text, -1, '', '', config.text, [])

    ret.html = parse(config)
    ret.html = parseSingleTags(ret.html)

    if (ret.html.includes('[') || ret.html.includes(']'))
      errQueue.push('Some tags appear to be misaligned.')

    if (config.removeMisalignedTags)
      ret.html = ret.html.replace(/\[.*?\]/g, '')

    if (config.addInLineBreaks)
      ret.html = `<div style="white-space:pre-wrap;">${ret.html}</div>`

    if (config.wrapper)
      ret.html = `<div id="word-break">${ret.html}</div>`

    if (!config.escapeHtml) {
      ret.html = ret.html.replace(/&#91;/g, '[') // put ['s back in
      ret.html = ret.html.replace(/&#93;/g, ']') // put ]'s back in
    }

    ret.error = errQueue.length !== 0
    ret.errorQueue = errQueue

    console.assert(!ret.error, ret.errorQueue)

    return ret
  }

  return me
})()
