import { Navbar } from "../Navbar"

export const MainLayout = ({children}: any) => {
    return (
        <div className="flex flex-col items-center overflow-x-hidden">
            <Navbar/>
            <section className="flex flex-col gap-10 px-5 w-screen sm:max-w-screen-sm">
                {children}
            </section>
        </div>
    )
}