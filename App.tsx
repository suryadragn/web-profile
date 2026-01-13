
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ContactForm } from './components/ContactForm';
import { PROJECTS } from './constants';
import { SiteConfig, Project } from './types';

const App: React.FC = () => {
  // --- STATE & PERSISTENCE ---
  const [currentPath, setCurrentPath] = useState<'public' | 'admin'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'work' | 'about'>('hero');

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('portfolio_config');
    if (saved) return JSON.parse(saved);
    return {
      hero: {
        status: "Available for new projects",
        title: "Designing digital experiences that matter.",
        subtitle: "I'm a multidisciplinary designer and developer helping startups build clean, modern products that delight users and drive growth."
      },
      about: {
        title: "Crafting interfaces that bridge the gap between people and technology.",
        description1: "With over 5 years of experience in product design, I've had the privilege of working with global brands and local startups alike. My philosophy is simple: good design is invisible.",
        description2: "I specialize in creating scalable design systems and high-performance React applications. My background in both engineering and aesthetics allows me to build products that look beautiful and work flawlessly."
      },
      projects: PROJECTS
    };
  });

  useEffect(() => {
    localStorage.setItem('portfolio_config', JSON.stringify(config));
  }, [config]);

  // --- HANDLERS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin/admin');
    }
  };

  const updateHero = (field: keyof typeof config.hero, value: string) => {
    setConfig(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const updateAbout = (field: keyof typeof config.about, value: string) => {
    setConfig(prev => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    setConfig(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  // --- VIEWS ---

  if (currentPath === 'admin') {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
              <p className="text-gray-500 mt-2">Enter credentials to manage your site</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={loginForm.username}
                  onChange={e => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              {loginError && <p className="text-red-500 text-sm font-medium">{loginError}</p>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
                Sign In
              </button>
            </form>
            <button 
              onClick={() => setCurrentPath('public')}
              className="w-full mt-4 text-gray-400 text-sm hover:text-indigo-600 transition-colors"
            >
              &larr; Back to Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0">
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              Admin Panel
            </h2>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {(['hero', 'work', 'about'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button onClick={() => setCurrentPath('public')} className="w-full py-2 text-sm font-medium text-gray-400 hover:text-white flex items-center justify-center">
              View Site
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="w-full mt-2 py-2 text-sm font-medium text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 ml-64 p-10">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab} Section</h1>
            <p className="text-gray-500 mt-1">Manage content for the {activeTab} area of your portfolio.</p>
          </header>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Availability Status</label>
                  <input type="text" value={config.hero.status} onChange={(e) => updateHero('status', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Main Headline</label>
                  <textarea rows={3} value={config.hero.title} onChange={(e) => updateHero('title', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Intro Text</label>
                  <textarea rows={4} value={config.hero.subtitle} onChange={(e) => updateHero('subtitle', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">About Heading</label>
                  <input type="text" value={config.about.title} onChange={(e) => updateAbout('title', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Primary Description</label>
                  <textarea rows={4} value={config.about.description1} onChange={(e) => updateAbout('description1', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Description</label>
                  <textarea rows={4} value={config.about.description2} onChange={(e) => updateAbout('description2', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'work' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {config.projects.map((p) => (
                  <div key={p.id} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/30 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-indigo-600">Project #{p.id}</h4>
                      <img src={p.imageUrl} alt="Preview" className="w-12 h-12 rounded object-cover border border-gray-200" />
                    </div>
                    <div className="space-y-4">
                      <input value={p.title} onChange={(e) => updateProject(p.id, 'title', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Project Title" />
                      <input value={p.category} onChange={(e) => updateProject(p.id, 'category', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Category" />
                      <textarea value={p.description} onChange={(e) => updateProject(p.id, 'description', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500" rows={2} placeholder="Description" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-['Inter']">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 md:pt-48 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full animate-bounce">
            {config.hero.status}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight whitespace-pre-line">
            {config.hero.title}
          </h1>
          <p className="max-w-2xl text-xl text-gray-500 mb-10 leading-relaxed">
            {config.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#work" className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Selected Work</h2>
              <p className="text-gray-500">A collection of projects I'm particularly proud of.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-xl font-bold mt-2 text-gray-900">{project.title}</h3>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/profile/800/800" 
                alt="Profile" 
                className="rounded-2xl shadow-2xl grayscale"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {config.about.title}
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{config.about.description1}</p>
                <p>{config.about.description2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <ContactForm />
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-gray-800 pt-10">
            <p>&copy; 2025 Personal Portfolio. Built with passion.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => setCurrentPath('admin')}
                className="hover:text-white transition-colors"
              >
                Admin Area
              </button>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
