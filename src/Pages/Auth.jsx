import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, User, UploadCloud, Github, Chrome, Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  // 🚀 INSTANT IMAGE UPLOAD LOGIC
  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;

      // Supabase ke 'avatars' bucket mein upload
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Upload hote hi Public URL nikal kar state mein save kar liya
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(publicUrlData.publicUrl);
    } catch (error) {
      alert("Image upload fail ho gayi: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // EMAIL / PASSWORD AUTH
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        alert("Login Successful! 🎉");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, avatar_url: avatarUrl }
          }
        });
        if (error) throw error;
        alert("Signup Successful! Check your email. ✉️");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // OAUTH LOGIC
  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black p-4">
      
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 p-8 transform transition-all hover:scale-[1.01] duration-500">
        
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-5">
          
          {/* Signup ke liye Name aur Avatar */}
          {!isLogin && (
            <div className="space-y-5 animate-[fade-in_0.4s_ease-out]">
              
              {/* Instant Image Upload UI */}
              <div className="flex flex-col items-center justify-center">
                <label 
                  htmlFor="avatar-upload" 
                  className="relative group cursor-pointer flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-blue-400 hover:border-purple-400 bg-white/5 hover:bg-white/10 transition-all overflow-hidden"
                >
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-blue-400 group-hover:text-purple-400 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-xs text-gray-300 mt-2">Upload Photo</span>
                    </>
                  )}
                  {/* Hidden File Input triggers upload IMMEDIATELY on select */}
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* OAuth Buttons */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400 backdrop-blur-md">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
            >
              <Chrome className="w-5 h-5 text-blue-400" /> Google
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
            >
              <Github className="w-5 h-5" /> GitHub
            </button>
          </div>
        </div>

        {/* Toggle Login/Signup */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-400 hover:text-purple-400 font-semibold transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

      </div>
    </div>
  );
}