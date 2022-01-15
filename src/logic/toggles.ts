import { waifuTags } from '~/data/constants'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const [showSideMenu, toggleSideMenu] = useToggle(true)
export const [showAddWorld, toggleShowAddWorld] = useToggle()
export const [showAddCharacter, toggleShowAddCharacter] = useToggle()
export const [showAddRide, toggleShowAddRide] = useToggle()
export const [showFilterTags, toggleShowFilterTags] = useToggle()
export const [showAddPerk, toggleShowAddPerk] = useToggle()
export const [showAddMission, toggleShowAddMission] = useToggle()
export const [isDLC, toggleDLC] = useToggle(true)
export const [isNSFW, toggleNSFW] = useToggle(false)
export const [isSupport, toggleSupport] = useToggle(false)
export const [isRetinueEdit, toggleRetinueEdit] = useToggle(false)

export const userCharactersShown = ref(false)

export const promoteShown = useStorage('pr', false)

export const [appMode, toggleAppMode] = useToggle()
export const orientation = useStorage('ot', false)
export const activeTab = ref(0)

export const tagToggles = reactive(Object.values(waifuTags).reduce((a, x) => { a[x.short] = 0; return a }, {} as Record<string, number>))

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
