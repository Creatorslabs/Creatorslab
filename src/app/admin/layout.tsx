import SideBar from "../components/sidebar";

// app/admin/layout.tsx
export default function ProductDetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen text-white">
            <SideBar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
    )
}