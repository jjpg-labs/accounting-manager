/**
* @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

// Mock ResizeObserver
global.ResizeObserver = class {
	observe() { }
	unobserve() { }
	disconnect() { }
};

/**
* @jest-environment jsdom
* @jest-environment-options {"url": "https://jestjs.io/"}
*/
describe('Home', () => {
	it('renders the navigation links', () => {
		render(<Home />)
		const links = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports']
		links.forEach((link) => {
			expect(screen.getAllByText(link).length).toBeGreaterThan(0)
		})
	})

	it('renders the user profile image', () => {
		render(<Home />)
		const profileImage = screen.getByAltText('Your Company')
		expect(profileImage).toBeInTheDocument()
	})

	it('renders the user menu', () => {
		render(<Home />)
		const userMenuButton = screen.getByRole('button', { name: /open user menu/i })
		expect(userMenuButton).toBeInTheDocument()
	})

	it('renders the notifications button', () => {
		render(<Home />)
		const notificationsButton = screen.getByRole('button', { name: /view notifications/i })
		expect(notificationsButton).toBeInTheDocument()
	})
})
