import { render, screen } from '@testing-library/react'
import { ErrorMessage } from '@/components/ErrorMessage'

function makeSut() {
  render(<ErrorMessage error="Error message" />)
}

describe('Error message', () => {
  it('should render error with the correct message', () => {
    makeSut()
    const erroElem = screen.getByText(/error message/i)

    expect(erroElem).toBeVisible()
  })
})
