import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Persons from './Persons'

describe('testing Persons component of phonebook', () => {
    const mockHandler = vi.fn()
    const people = [
        {
            name: "monica",
            number: "12-123456",
            id: "65db9ac660ee00ea8f0f0eab"
        },
        {
            name: "Arto Hellas",
            number: "040-1231236",
            id: "65d75e1d1020323bf3f3f080"
        }
    ]
    
    test('the delete button is rendered and clickable', async () => {
        

        render(
            <Persons people={people} deletePersonOf={mockHandler}/>
        )
    
        const user = userEvent.setup()
        const button = screen.getAllByText('delete')
        await user.click(button[0])
    
        expect(mockHandler.mock.calls).toHaveLength(1)
    })
    test('the peoples object are properly rendered', () => {

        const { container } = render(<Persons people={people} deletePersonOf={mockHandler} />)

        const div = container.querySelectorAll('.person')
        expect(div[0]).toHaveTextContent('monica')
        expect(div[0]).toHaveTextContent('12-123456')
        expect(div[1]).toHaveTextContent('Arto Hellas')
        expect(div[1]).toHaveTextContent('040-1231236')
    })
})
