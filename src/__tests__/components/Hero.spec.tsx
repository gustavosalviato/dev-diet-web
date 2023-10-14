import { render, screen } from '@testing-library/react'
import { HeroSection } from '../../components/Hero'

function makeSut() {
  render(<HeroSection />)
}

describe('HeroSection', () => {
  it('should render redirectLink with the correct link', () => {
    makeSut()
    const redirectLink = screen.getByRole('link')

    expect(redirectLink).toHaveAttribute('href', '/login')
  })

  it('should render the correct image', () => {
    makeSut()
    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('alt', 'Girl meditating')
    expect(image).toHaveAttribute('src', '/meditating.svg')
  })
})
