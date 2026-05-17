import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'

describe('Rock Paper Scissors', () => {

    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('affiche le score initial à 0', () => {
        render(<App />)

        expect(screen.getByText('0')).toBeInTheDocument()
    })

    test('joueur choisit rock', async () => {
        render(<App />)

        const rock = screen.getByAltText('rock')

        await userEvent.click(rock)

        expect(
            screen.getByText('YOU PICKED')
        ).toBeInTheDocument()

        expect(
            screen.getAllByAltText('rock')[0]
        ).toBeInTheDocument()
    })

    test('affiche YOU WIN si joueur gagne', async () => {

        vi.spyOn(Math, 'random').mockReturnValue(0.9)

        render(<App />)

        const rock = screen.getByAltText('rock')

        await userEvent.click(rock)

        vi.advanceTimersByTime(1500)

        expect(
            screen.getByText(/YOU WIN/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText('1')
        ).toBeInTheDocument()
    })

    test('affiche DRAW si égalité', async () => {

        vi.spyOn(Math, 'random').mockReturnValue(0)

        render(<App />)

        const rock = screen.getByAltText('rock')

        await userEvent.click(rock)

        vi.advanceTimersByTime(1500)

        expect(
            screen.getByText(/DRAW/i)
        ).toBeInTheDocument()
    })

    test('play again', async () => {

        vi.spyOn(Math, 'random').mockReturnValue(0)

        render(<App />)

        const rock = screen.getByAltText('rock')

        await userEvent.click(rock)

        vi.advanceTimersByTime(1500)

        const playAgain = screen.getByText(/PLAY AGAIN/i)

        await userEvent.click(playAgain)

        expect(
            screen.getByAltText('paper')
        ).toBeInTheDocument()
    })

})