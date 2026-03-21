import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Partner Portal</h1>
          <p className="text-sm text-slate-500">Sign in to request Advance Reader Copies (ARCs) and access wholesale resources.</p>
        </div>
        
        <form action={loginAction} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Institution or Partner Email
            </label>
            <input 
              id="email"
              name="email"
              type="email" 
              required
              placeholder="professor@university.edu"
              className="px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-slate-400 mt-1">Hint: try `admin@mangupublishing.com` or `professor@university.edu`.</p>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-foreground text-background font-bold uppercase tracking-widest text-sm py-4 rounded hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            Access Portal
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            For academic, library, or trade access, please <a href="mailto:access@mangupublishing.com" className="hover:text-accent underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
