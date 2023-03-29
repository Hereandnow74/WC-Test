export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const showSideMenu = useStorage('showSideMenu', true)
export const [showAddWorld, toggleShowAddWorld] = useToggle()
export const [showAddCharacter, toggleShowAddCharacter] = useToggle()
export const [showAddRide, toggleShowAddRide] = useToggle()
export const [showFilterTags, toggleShowFilterTags] = useToggle()
export const [showAddPerk, toggleShowAddPerk] = useToggle()
export const [showAddWaifuPerk, toggleShowAddWaifuPerk] = useToggle()
export const [showAddMission, toggleShowAddMission] = useToggle()
export const [isRetinueEdit, toggleRetinueEdit] = useToggle(false)
export const [showSettings, toggleShowSettings] = useToggle(false)
export const [showReport, toggleShowReport] = useToggle(false)
export const [showSmartMenu, toggleSmartMenu] = useToggle(false)
export const [showSearchSettings, toggleSearchSetting] = useToggle(false)
export const [showPerksManager, togglePerksManager] = useToggle(false)
export const [showCodeEditor, toggleCodeEditor] = useToggle(false)
export const [showImpExpChars, toggleImpExpChars] = useToggle(false)

export const [showAddFic, toggleAddFic] = useToggle(false)
export const currentFic = ref({})

export const userCharactersShown = ref(false)

export const showFilters = ref(false)

export const showSaveLoad = ref(false)
export const showShare = ref(false)
export const isBuildImage = ref(false)
export const showIntro = ref(false)
export const showBuildImageSettings = ref(false)
export const [visible, toggleFull] = useToggle()

export const blackWhite = useStorage('blackWhite', false)
export const blackWhiteDisabled = useStorage('blackWhiteDisabled', false)

export const [appMode, toggleAppMode] = useToggle()
export const orientation = useStorage('ot', false)
export const buildLayout = useStorage('buildLayout', false)
export const activeTab = ref(0)

export const andOr = ref(false)
export const showDefenseTags = ref(false)

export const tagToggles = useStorage('tagToggles', {})

export function threeToggle(val: number) {
  switch (val) {
    case 0:
      val = 1
      break
    case 1:
      val = -1
      break
    case -1:
      val = 0
      break
  }
  return val
}
