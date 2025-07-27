import Header from "@/components/front/header";

export default function FrontLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='relative'>
			<div className='absolute inset-0 blur-xl h-[580px]' style={{ background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)" }}></div>
			<div className='relative'>
				<Header />
				{children}
			</div>
		</div>
	);
}
