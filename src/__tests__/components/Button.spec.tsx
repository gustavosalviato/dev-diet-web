import { render, screen } from '@testing-library/react'
import { Button } from '../../components/Button'

describe('Button', () => {
  it('should render button with the correct text', () => {
    render(<Button size="medium" variant="primary" text="Example title" />)

    const buttonElem = screen.getByRole('button')

    expect(buttonElem).toHaveTextContent(/example title/i)
  })

  it('should render button with the correct props', () => {
    render(<Button size="large" variant="tertiary" text="Example title" />)

    const buttonElem = screen.getByRole('button')

    expect(buttonElem).toHaveStyle({
      width: '48 px',
    })
  })
})
