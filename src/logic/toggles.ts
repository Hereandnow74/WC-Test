export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const [showSideMenu, toggleSideMenu] = useToggle()
export const [showAddWorld, toggleShowAddWorld] = useToggle()
export const [showAddCharacter, toggleShowAddCharacter] = useToggle()
export const [showAddRide, toggleShowAddRide] = useToggle()

export const [appMode, toggleAppMode] = useToggle()
export const orientation = ref(false)

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
