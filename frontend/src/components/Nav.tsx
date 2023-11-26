import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='flex items-center px-[20px] py-[15px] bg-white z-10'>
      <Link href='/' className='flex flex-row items-center'>
        <img className='mr-[10px] w-10' src="/StorySparkLogo.webp" />
        <span className='text-lg font-bold tracking-tighter	'>Story Spark</span>
      </Link>
    </nav>
  )
}

export default Nav
