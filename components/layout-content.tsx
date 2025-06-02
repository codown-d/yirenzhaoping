"use client"
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments()
  const pathname = usePathname();

  let pageUrls = ['/employer', '/jobseeker',  '/forum', '/messages', '/profile/employer', '/profile/jobseeker']
  console.log(segments,pathname)
  const isTopLevel = pageUrls.includes(pathname)
  let isEmployer = ['/employer',  '/profile/employer', ].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* {!isTopLevel && <Header />} */}
      <main className="flex-1">{children}</main>
      {isTopLevel && <Footer  />}
    </div>
  )
}