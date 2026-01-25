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
    title: 'My Profile - Go Bazaar',
}

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
