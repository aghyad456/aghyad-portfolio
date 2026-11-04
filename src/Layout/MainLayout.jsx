import Navbar from "../Components/Navbar/Navbar";



export default function MainLayout({children}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

     
      <main className="grow">
        {children}
      </main>

    </div>
  )
}
