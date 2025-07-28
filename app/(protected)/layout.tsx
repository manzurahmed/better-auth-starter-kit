import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// 2:18:04
	const session = await auth.api.getSession({
		headers: await headers()
	});
	console.log("dashboard layout session:", session);

	const navUser = {
		name: session?.user.name || "",
		email: session?.user.email || "",
		avatar: session?.user.image || ""
	};

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar user={navUser} variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
