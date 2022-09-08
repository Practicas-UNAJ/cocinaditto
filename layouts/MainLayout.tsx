import { Navbar } from "../components/Navbar"

export const MainLayout = ({children}: any) => {
    return (
        <div className="overflow-x-hidden">
            <Navbar/>
            <section className="flex flex-col gap-10 items-center px-5">
                {children}
            </section>
        </div>
    )
}