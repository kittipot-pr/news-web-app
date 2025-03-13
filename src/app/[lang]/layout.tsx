import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 pb-10 gap-16 sm:p-10 font-[family-name:var(--font-poppins)]">
      <header className="flex justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold text-left">New<span className="text-primary">s</span></h1>
        <LanguageSwitcher />
      </header>
      {children}
    </div>
  );
}