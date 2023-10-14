import { render, screen } from '@testing-library/react'
import { Header } from '../../components/Header'

function makeSut() {
  render(<Header />)
}

describe('Header', () => {
  it('should render header correctly', () => {
    makeSut()
    const headerElem = screen.getByText(/dev diet/i)

    expect(headerElem).toBeVisible()
  })
})
