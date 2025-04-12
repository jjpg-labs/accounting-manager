type User = {
	name: string
	email: string
	imageUrl: string
} | null

type BaseNavigationItem = {
	name: string
	href: string
}

type NavigationItem = BaseNavigationItem & {
	current: boolean
}

type UseNavResult = {
	navigation: NavigationItem[]
	user: User
	userNavigation: BaseNavigationItem[]
	imageUrl: string

}

export default function useNav(): UseNavResult {
	const navigation = [
		{ name: 'Home', href: '/', current: true },
		{ name: 'About', href: '/about', current: false },
		{ name: 'Services', href: '/services', current: false },
		{ name: 'Contact', href: '/contact', current: false },
	]

	const user: User = null /*{
		name: 'Tom Cook',
		email: 'tom@example.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	}*/

	const userNavigation = user ? [
		{ name: 'Your Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Sign out', href: '#' },
	] : [
		{ name: 'Sign in', href: '/login' },
		{ name: 'Create account', href: '#' },
	]

	return { navigation, user, userNavigation, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
}