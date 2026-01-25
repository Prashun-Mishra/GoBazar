import { Metadata } from 'next'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
    title: 'Checkout - Go Bazaar',
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
