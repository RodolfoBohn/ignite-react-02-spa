import igniteLogo from '../../asssets/ignite-logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import { Wrapper } from './styles'

export const Header = () => {
  return (
    <Wrapper>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Wrapper>
  )
}
