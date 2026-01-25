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
    title: 'Cart - Go Bazaar',
}

export default function CartLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
