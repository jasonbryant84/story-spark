import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Link href='/story/create' className='flex flex-col items-center'>
        <img
          className='mb-[20px] max-w-[300px]'
          src="/StorySparkLogo.webp"
        />
      </Link>
    </main>
  )
}
