import { render, screen } from '@testing-library/react'
import { PageWrapper } from '../../components/PageWrapper'

describe('PageWrapper', () => {
  it('should render PageWrapper with correct props', () => {
    const { container } = render(
      <PageWrapper>
        <div>hello world</div>
      </PageWrapper>,
    )

    console.log(container)

    expect(container).toBeInTheDocument()
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })
})
