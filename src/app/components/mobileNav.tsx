import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import Image from "next/image";

type NavProps = {
	navigation: { name: string, href: string }[],
	user: { name: string, email: string, imageUrl: string } | null,
	userNavigation: { name: string, href: string }[]
}

export default function MobileNav({
	navigation,
	user,
	userNavigation
}: NavProps) {
	return (
		<DisclosurePanel className="md:hidden">
			<div className="space-y-1 px-2 pt-2">
				{navigation.map((item) => (
					<DisclosureButton
						key={item.name}
						as="a"
						href={item.href}
						className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
					>
						{item.name}
					</DisclosureButton>
				))}
			</div>
			{user &&
				<div className="border-t border-gray-700 px-5 pt-4">
					<div className="flex items-center">
						<Image alt="User" src={user.imageUrl} className="size-10 rounded-full" width={20} height={20} />
						<div className="ml-3">
							<p className="text-base font-medium text-white">{user.name}</p>
							<p className="text-sm text-gray-400">{user.email}</p>
						</div>
					</div>
					<div className="mt-3 space-y-1">
						{userNavigation.map((item) => (
							<DisclosureButton
								key={item.name}
								as="a"
								href={item.href}
								className="block px-3 py-2 text-base text-gray-400 hover:bg-gray-700 hover:text-white"
							>
								{item.name}
							</DisclosureButton>
						))}
					</div>
				</div>
			}
		</DisclosurePanel>
	)
}