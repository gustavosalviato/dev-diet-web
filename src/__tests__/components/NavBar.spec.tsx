import { render, screen } from '@testing-library/react'
import { NavBar } from '../../components/NavBar'
const links = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Panel',
    path: '/panel',
  },

  {
    label: 'Overview',
    path: '/overview',
  },
]

function makeSut() {
  render(<NavBar links={links} />)
}

describe('NavBar', () => {
  it('should render NavBar correctly', () => {
    makeSut()

    expect(screen.getByRole('navigation')).toBeVisible()
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })
})
