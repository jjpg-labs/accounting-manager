export default function useNav() {
	const navigation = [
		{ name: 'Home', href: '#', current: true },
		{ name: 'About', href: '#', current: false },
		{ name: 'Services', href: '#', current: false },
		{ name: 'Contact', href: '#', current: false },
	]

	return { navigation }
}