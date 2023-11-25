import Nav from '../../components/Nav'

export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Nav />
        {children}
      </section>
    )
  }