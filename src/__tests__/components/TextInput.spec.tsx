import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from '../../components/TextInput'

function makeSut() {
  render(<TextInput id="textinput" />)
}

describe('Text Input', () => {
  it('should render text input correctly', () => {
    makeSut()
    const inputElem = screen.getByRole('textbox')

    fireEvent.change(inputElem, {
      target: {
        value:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, beatae?',
      },
    })

    expect(inputElem).toBeVisible()
    expect(inputElem).toHaveValue(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, beatae?',
    )
  })
})
