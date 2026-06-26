import { createContext, useContext, useMemo, useState } from 'react'
import { USER, DOMAINS } from './data/mock.js'

// Простой стор на Context — имитирует сессию пользователя и состояние панели.
// Разработчики заменят это на реальную авторизацию через ЕСИА и API доменов.

const PanelContext = createContext(null)

export function PanelProvider({ children }) {
  const [authed, setAuthed] = useState(false)
  const [user] = useState(USER)
  const [domains] = useState(DOMAINS)

  const value = useMemo(
    () => ({
      authed,
      login: () => setAuthed(true),
      logout: () => setAuthed(false),
      user,
      domains,
    }),
    [authed, user, domains],
  )

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export function usePanel() {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used within PanelProvider')
  return ctx
}
