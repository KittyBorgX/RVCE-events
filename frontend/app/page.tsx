export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              R
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              RVCE Coding Club <span className="text-blue-400 font-normal">Events</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Deployed & Operational</span>
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <div className="max-w-4xl mx-auto px-6 py-20 flex-1 flex flex-col justify-center text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-blue-950/50 border border-blue-800/50 rounded-full px-4 py-1.5 mb-8 w-max mx-auto text-xs text-blue-300 font-mono">
          <span>Target Subdomain:</span>
          <span className="font-semibold text-blue-200">events.codingclubrvce.com</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Hello World! 👋 <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            RVCE Events Platform
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Welcome to the official event management and registration portal for the RVCE Coding Club. Our microservices architecture is successfully deployed and running.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 font-bold">
              🗓️
            </div>
            <h3 className="font-semibold text-white mb-1">Event Discovery</h3>
            <p className="text-sm text-slate-400">Browse hackathons, technical workshops, and coding competitions.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 font-bold">
              ⚡
            </div>
            <h3 className="font-semibold text-white mb-1">Instant Registration</h3>
            <p className="text-sm text-slate-400">Seamless participant registration and automated ticket generation.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 font-bold">
              🎟️
            </div>
            <h3 className="font-semibold text-white mb-1">Attendance System</h3>
            <p className="text-sm text-slate-400">QR code verification and real-time event attendance tracking.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-600/25">
            Deployment Verified ✅
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} RVCE Coding Club. All rights reserved.</p>
      </footer>
    </main>
  );
}
