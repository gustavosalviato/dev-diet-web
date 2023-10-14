import { render, screen } from '@testing-library/react'
import { MenuMobile } from '../../components/MenuMobile'

function makeSut() {
  render(
    <MenuMobile
      links={[
        {
          label: 'Sign in with Github',
          path: '',
        },
        {
          label: 'Panel',
          path: '/panel',
        },
        {
          label: 'Overview',
          path: '/overview',
        },
        {
          label: 'Quick Access',
          path: '/quick-access',
        },
      ]}
    />,
  )
}

describe('MenuMobile', () => {
  it('should render menu mobile with correctly links', () => {
    makeSut()

    expect(screen.findByText(/sign in with github/i))
    expect(screen.findByText(/panel/i))
    expect(screen.findByText(/overview/i))
    expect(screen.findByText(/quick access/i))
  })
})
