import SideBar from "../components/sidebar";

// app/admin/layout.tsx
export default function ProductDetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-screen text-white">
            <SideBar />
            <main className="flex-1 p-2 md:p-6 overflow-auto">{children}</main>
        </div>
    )
}