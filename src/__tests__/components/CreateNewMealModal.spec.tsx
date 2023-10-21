import { QueryClientProvider, QueryClient } from 'react-query'

import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { CreateNewMealModal } from '@/components/CreateNewMealModal'

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

function makeSut() {
  const client = new QueryClient()
  render(
    <QueryClientProvider client={client}>
      <CreateNewMealModal />
    </QueryClientProvider>,
  )
}

describe('NewMealModal', () => {
  it('should render default form correctly', async () => {
    makeSut()

    const buttonElem = screen.getByRole('button', {
      name: /new meal/i,
    })

    expect(buttonElem).toBeVisible()

    act(() => {
      fireEvent.click(buttonElem)
    })

    screen.getByRole('heading', {
      name: /new meal/i,
    })

    await waitFor(() => {
      expect(
        screen.getByRole('textbox', {
          name: /name/i,
        }),
      ).toBeInTheDocument()

      expect(
        screen.getByRole('textbox', {
          name: /description/i,
        }),
      ).toBeInTheDocument()

      expect(screen.getByTestId('date-input')).toBeInTheDocument()
      expect(screen.getByTestId('time-input')).toBeInTheDocument()

      expect(
        screen.getByRole('radio', {
          name: /yes/i,
        }),
      )

      expect(
        screen.getByRole('radio', {
          name: /no/i,
        }),
      )

      expect(
        screen.getByRole('button', {
          name: /send/i,
        }),
      )
    })
  })

  it('should show form errors when submit form with empty values', async () => {
    makeSut()

    const buttonElem = screen.getByRole('button', {
      name: /new meal/i,
    })

    act(() => {
      fireEvent.click(buttonElem)
    })

    const submitElem = screen.getByRole('button', {
      name: /send/i,
    })

    expect(submitElem).toBeInTheDocument()

    act(() => {
      fireEvent.click(submitElem)
    })

    await waitFor(() => {
      expect(
        screen.getByText(/name must contain at least 5 characters/i),
      ).toBeVisible()

      expect(
        screen.getByText(/description must contain at least 5 characters/i),
      ).toBeVisible()

      expect(screen.getByText(/date is a required field/i)).toBeVisible()

      expect(screen.getByText(/hour is a required field/i)).toBeVisible()
    })
  })

  it('should assert the values when correctly filled', async () => {
    makeSut()

    const buttonElem = screen.getByRole('button', {
      name: /new meal/i,
    })

    act(() => {
      fireEvent.click(buttonElem)
    })

    const inputNameElem = screen.getByRole('textbox', {
      name: /name/i,
    })

    const inputDescriptionElem = screen.getByRole('textbox', {
      name: /description/i,
    })

    const inputDateElem = screen.getByTestId('date-input')
    const inputTimeElem = screen.getByTestId('time-input')
    const radioYesOptionElem = screen.getByRole('radio', {
      name: /yes/i,
    })

    act(() => {
      fireEvent.change(inputNameElem, {
        target: {
          value: 'new meal',
        },
      })

      fireEvent.change(inputDescriptionElem, {
        target: {
          value: 'new description',
        },
      })

      fireEvent.change(inputDateElem, {
        target: {
          value: '2020-05-12',
        },
      })

      fireEvent.change(inputTimeElem, {
        target: {
          value: '10:00',
        },
      })

      fireEvent.click(radioYesOptionElem)
    })

    await waitFor(() => {
      expect(screen.getByTestId('create-meal-form')).toHaveFormValues({
        name: 'new meal',
        description: 'new description',
        createdAt: '2020-05-12',
        hour: '10:00',
      })

      expect(radioYesOptionElem).toBeChecked()
    })
  })
})
