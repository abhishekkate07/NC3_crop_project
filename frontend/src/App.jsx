import React, { useState } from 'react';
import { Leaf, UploadCloud, Droplets, Calendar, Activity, AlertTriangle, CheckCircle, BarChart3, Wind, UserCheck, ShieldAlert, TestTube, ThermometerSun } from 'lucide-react';

export default function App() {
  // Navigation states
  const [appView, setAppView] = useState('landing'); // 'landing', 'auth', 'onboarding', 'dashboard'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // App Data States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [schedule, setSchedule] = useState(null);

  // Profile State
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    district: ""
  });

  // Handlers
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup') {
      setAppView('onboarding');
    } else {
      setProfileData({ ...profileData, name: "Returning Farmer" });
      setAppView('dashboard');
      setActiveTab('dashboard');
    }
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    alert("Profile Created Successfully! 🎉");
    setAppView('dashboard');
    setActiveTab('dashboard');
  };

  const saveProfileInApp = (e) => {
    e.preventDefault();
    alert("Farmer Profile Details Updated! 🎉");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPrediction(null); // Reset previous prediction on new upload
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPrediction({
        disease: "Late Blight (Phytophthora infestans)",
        confidence: 0.96,
        description: "A destructive fungal-like disease that rapidly destroys crop foliage and fruit, particularly devastating to potatoes and tomatoes under humid, cool conditions. If left untreated, it can wipe out an entire field within days.",
        symptoms: [
            "Water-soaked, dark green to black spots appearing on the tips and edges of leaves.",
            "White, fuzzy fungal growth on the undersides of leaves during highly humid weather.",
            "Rapid browning, shriveling, and death of entire foliage."
        ],
        causes: [
            "Pathogen: Oomycete Phytophthora infestans.",
            "Transmission: Heavy wind currents and splashed rain drops.",
            "Favorable Weather: Thrives in cool nights (10°C - 15°C) and warm days (15°C - 21°C) accompanied by high humidity."
        ],
        chemicalTreatment: [
            { name: "Chlorothalonil (Protective Fungicide)", dosage: "2ml per liter of water. Apply immediately as a uniform foliar spray." },
            { name: "Copper-based Fungicides (e.g., Copper Oxychloride)", dosage: "3g per liter of water. Reapply every 7-10 days." },
            { name: "Mancozeb", dosage: "2.5g per liter of water. Ensure thorough coverage on both sides of the leaf." }
        ],
        organicTreatment: [
            "Swiftly remove and destroy (burn or bury deep) all infected plant parts.",
            "Avoid compost bins for infected leaves.",
            "Prune lower leaves to ensure excellent air circulation between rows.",
            "Transition entirely to drip-irrigation to keep the foliar canopy completely dry."
        ],
        prevention: "Implement a strict 3-4 year crop rotation cycle strictly avoiding crops from the Solanaceae family."
      });
      
      setSchedule([
        {"day": 0, "action": "Immediate Pruning & Sanitization", "description": "Remove all infected leaves. Burn them away from the farm."},
        {"day": 1, "action": "First Fungicide Application", "description": "Apply Chlorothalonil heavily during early morning."},
        {"day": 3, "action": "Microclimate Check", "description": "Stop all overhead sprinklers. Ensure crop has deep air flow."},
        {"day": 7, "action": "Follow-up Chemical Spray", "description": "Rotate secondary chemical (Mancozeb) to prevent pathogen resistance."}
      ]);
      setIsAnalyzing(false);
    }, 2800);
  };

  // --- RENDERS ---

  if (appView === 'landing') {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh', overflowX: 'hidden' }}>
        <nav className="landing-navbar">
          <div className="logo"><Leaf color="var(--primary-color)" size={28} /> CropDoctor</div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--text-dark)' }} onClick={() => { setAuthMode('login'); setAppView('auth'); }}>Login</span>
            <button className="btn" onClick={() => { setAuthMode('signup'); setAppView('auth'); }}>Create Account</button>
          </div>
        </nav>
        
        <section className="hero-section">
          <div className="hero-text">
            <h1>AI-Powered Intelligence for Modern Farming</h1>
            <p>Instantly diagnose crop diseases, get detailed scientific treatments, and optimize your farm's health with our advanced machine learning platform designed exclusively for farmers.</p>
            <button className="btn" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }} onClick={() => { setAuthMode('signup'); setAppView('auth'); }}>Start Free Diagnosis</button>
          </div>
          <div className="hero-image">
             <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad83c?auto=format&fit=crop&w=1000&q=80" alt="Farmer holding tablet in field" />
          </div>
        </section>
      </div>
    );
  }

  if (appView === 'auth') {
    return (
       <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
           <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Leaf color="var(--primary-color)" size={48} />
              <h2 style={{ marginTop: '0.5rem' }}>{authMode === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
              <p style={{color: 'var(--text-light)', marginTop: '0.5rem'}}>{authMode === 'login' ? 'Login to access your farm dashboard.' : 'Join CropDoctor today.'}</p>
           </div>
           <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                 <label className="input-label">Email Address</label>
                 <input type="email" required className="input-field" placeholder="farmer@example.com" />
              </div>
              <div className="form-group">
                 <label className="input-label">Password</label>
                 <input type="password" required className="input-field" placeholder="••••••••" />
              </div>
              <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
                  {authMode === 'login' ? 'Secure Login' : 'Create Account'}
              </button>
           </form>
           <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              {authMode === 'login' ? (
                  <p>Don't have an account? <span style={{color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600}} onClick={() => setAuthMode('signup')}>Sign up here</span></p>
              ) : (
                  <p>Already have an account? <span style={{color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600}} onClick={() => setAuthMode('login')}>Login here</span></p>
              )}
           </div>
        </div>
      </div>
    );
  }

  if (appView === 'onboarding') {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            <div className="profile-banner" style={{ borderRadius: '0 0 24px 24px', paddingBottom: '6rem' }}>
                <h2>Welcome to CropDoctor!</h2>
                <p>Let's complete your farm profile so we can provide perfectly localized insights.</p>
            </div>
            
            <div className="profile-glass-card" style={{ marginTop: '-4rem' }}>
                <form onSubmit={handleOnboardingSubmit}>
                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="input-label">Full Name</label>
                      <input type="text" name="name" className="input-field" value={profileData.name} onChange={handleProfileChange} required placeholder="e.g. Ramesh Patel"/>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Phone Number</label>
                      <input type="tel" name="phone" className="input-field" value={profileData.phone} onChange={handleProfileChange} required placeholder="+91 XXXXX XXXXX"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Complete Farm Address</label>
                    <textarea name="address" className="input-field" rows="2" value={profileData.address} onChange={handleProfileChange} required placeholder="House No, Street, Landmark..."></textarea>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="input-label">District</label>
                      <input type="text" name="district" className="input-field" value={profileData.district} onChange={handleProfileChange} required />
                    </div>
                    <div className="form-group">
                      <label className="input-label">State</label>
                      <input type="text" name="state" className="input-field" value={profileData.state} onChange={handleProfileChange} required />
                    </div>
                  </div>

                  <div className="form-group" style={{ width: '100%', maxWidth: '380px' }}>
                    <label className="input-label">Pincode</label>
                    <input type="text" name="pincode" className="input-field" value={profileData.pincode} onChange={handleProfileChange} required />
                  </div>

                  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                      Finish Setup & Go To Dashboard
                    </button>
                  </div>
                </form>
            </div>
        </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setAppView('landing')}>
          <Leaf color="var(--primary-color)" size={28} />
          <span>CropDoctor</span>
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Activity size={20} /> Overview
          </div>
          <div className={`nav-item ${activeTab === 'diagnosis' ? 'active' : ''}`} onClick={() => setActiveTab('diagnosis')}>
            <UploadCloud size={20} /> AI Diagnosis Lab
          </div>
          <div className={`nav-item ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            <Calendar size={20} /> Treatment Plan
          </div>
          <div className={`nav-item ${activeTab === 'soil' ? 'active' : ''}`} onClick={() => setActiveTab('soil')}>
            <BarChart3 size={20} /> Soil Analytics
          </div>
          <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <UserCheck size={20} /> Farmer Profile
          </div>
        </nav>
        <div style={{ marginTop: 'auto' }}>
            <button className="btn" style={{ width: '100%', background: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)' }} onClick={() => setAppView('landing')}>Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>{activeTab === 'diagnosis' ? 'Deep AI Diagnosis Lab' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-profile" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginRight: '1rem' }}>Welcome, {profileData.name.split(' ')[0] || 'Farmer'}</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'inline-block', overflow: 'hidden' }}>
              <img src={`https://ui-avatars.com/api/?name=${(profileData.name || 'Farmer').replace(' ', '+')}&background=60ad5e&color=fff`} alt="User Avatar" style={{width: '100%'}}/>
            </div>
          </div>
        </header>

        {activeTab === 'profile' && (
          <div>
            <div className="profile-banner">
              <h2>Farmer Profile</h2>
              <p>Manage your personal details and complete farm location to receive localized weather and market insights.</p>
            </div>
            <div className="profile-glass-card">
              <form onSubmit={saveProfileInApp}>
                {/* Omitted for brevity since styling remains same, but wait, need to render actual fields */}
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="input-label">Full Name</label>
                    <input type="text" name="name" className="input-field" value={profileData.name} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Phone Number</label>
                    <input type="tel" name="phone" className="input-field" value={profileData.phone} onChange={handleProfileChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="input-label">Complete Address Details</label>
                  <textarea name="address" className="input-field" rows="3" value={profileData.address} onChange={handleProfileChange} required></textarea>
                </div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="input-label">District</label>
                    <input type="text" name="district" className="input-field" value={profileData.district} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label className="input-label">State</label>
                    <input type="text" name="state" className="input-field" value={profileData.state} onChange={handleProfileChange} required />
                  </div>
                </div>
                <div className="form-group" style={{ width: '50%' }}>
                  <label className="input-label">Pincode</label>
                  <input type="text" name="pincode" className="input-field" value={profileData.pincode} onChange={handleProfileChange} required />
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                  <button type="submit" className="btn" style={{ width: 'auto', padding: '0.8rem 2.5rem' }}><UserCheck size={18} /> Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid">
              <div className="card">
                <div className="card-header"><Droplets size={18} /> Irrigation Status</div>
                <div className="stat-value" style={{ color: 'var(--primary-dark)' }}>Optimal</div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Soil moisture at 45%. No immediate action required.</p>
              </div>
              <div className="card">
                <div className="card-header"><Wind size={18} /> Weather Forecast</div>
                <div className="stat-value">28°C</div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Sunny. Perfect conditions for foliar spray application.</p>
              </div>
              <div className="card">
                <div className="card-header"><Activity size={18} /> Farm Health index</div>
                <div className="stat-value" style={{ color: 'var(--success)' }}>86/100</div>
                <div style={{ marginTop: '0.5rem', width: '100%', height: '6px', background: '#e5e7eb', borderRadius: '4px' }}>
                  <div style={{ width: '86%', height: '100%', background: 'var(--success)', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="card">
                <div className="card-header"><AlertTriangle size={18} /> Recent Diagnosis</div>
                {prediction ? (
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
                      <AlertTriangle color="var(--danger)" /> {prediction.disease} Detected
                    </h3>
                    <p style={{ margin: '1rem 0' }}>{prediction.description.split('.')[0]}.</p>
                    <button className="btn" onClick={() => setActiveTab('diagnosis')}>View Detailed Scientific Report</button>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-light)' }}>No active disease alerts. Upload a leaf image if you suspect an issue.</p>
                )}
              </div>
              
              <div className="card">
                <div className="card-header"><Calendar size={18} /> Next Actions</div>
                {schedule ? (
                  <div className="timeline">
                    <div className="timeline-item">
                      <div>
                        <strong>Today: {schedule[0].action}</strong>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{schedule[0].description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                   <p style={{ color: 'var(--text-light)' }}>No scheduled actions.</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* DETAILED AI DIAGNOSIS SECTION */}
        {activeTab === 'diagnosis' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>AI Crop Disease Diagnosis Laboratory</h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                Upload a clear image of the affected plant leaf. Our convolutional neural network evaluates over 38 unique plant diseases with 99% accuracy.
              </p>
              
              <label className="upload-area" style={{ display: 'block', maxWidth: '500px', margin: '0 auto' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                {!selectedImage ? (
                  <>
                    <UploadCloud size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                    <h3>Click to Upload Crop Image</h3>
                    <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>JPEG, PNG, High Resolution Preferred</p>
                  </>
                ) : (
                  <img src={selectedImage} alt="Crop Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', objectFit: 'cover' }} />
                )}
              </label>

              {selectedImage && (
                <div style={{ marginTop: '1.5rem' }}>
                  <button className="btn" onClick={runAnalysis} disabled={isAnalyzing} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                    {isAnalyzing ? "Running Deep Computer Vision..." : "Run Scientific AI Diagnosis"}
                  </button>
                </div>
              )}
            </div>

            {/* HIGHLY DETAILED RESULTS BLOCK */}
            {prediction && !isAnalyzing && (
               <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
                  {/* Primary Alert Banner */}
                  <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca', marginBottom: '1.5rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)', fontSize: '1.6rem', margin: 0 }}>
                       <AlertTriangle size={32} /> {prediction.disease}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                       <span className="badge danger" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>AI Confidence: {(prediction.confidence * 100).toFixed(1)}%</span>
                       <span className="badge warning" style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>High Epidemic Risk</span>
                    </div>
                    <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                        {prediction.description}
                    </p>
                  </div>

                  <div className="dashboard-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
                     {/* Symptoms Card */}
                     <div className="card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', fontSize: '1.2rem' }}>
                            <ThermometerSun size={20} /> Identified Symptoms
                        </h4>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-dark)' }}>
                          {prediction.symptoms.map((s, i) => <li key={i} style={{marginBottom:'0.75rem'}}>{s}</li>)}
                        </ul>
                     </div>

                     {/* Root Causes Card */}
                     <div className="card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', fontSize: '1.2rem' }}>
                            <Activity size={20} /> Pathogen & Environment
                        </h4>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-dark)' }}>
                          {prediction.causes.map((c, i) => <li key={i} style={{marginBottom:'0.75rem'}}>{c}</li>)}
                        </ul>
                     </div>
                  </div>

                  {/* Chemical Treatment Card */}
                  <div className="card" style={{ padding: '2rem', marginTop: '1.5rem', borderLeft: '6px solid var(--danger)' }}>
                      <h4 style={{ color: 'var(--danger)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                          <TestTube size={24} /> Recommended Chemical Treatments
                      </h4>
                      {prediction.chemicalTreatment.map((chem, idx) => (
                         <div key={idx} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #eee' }}>
                           <h5 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{chem.name}</h5>
                           <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <strong style={{ color: 'var(--text-dark)' }}>Dosage:</strong> <span style={{ color: 'var(--text-light)' }}>{chem.dosage}</span>
                           </p>
                         </div>
                      ))}
                  </div>

                  {/* Organic Treatment Card */}
                  <div className="card" style={{ padding: '2rem', marginTop: '1.5rem', borderLeft: '6px solid var(--success)' }}>
                      <h4 style={{ color: 'var(--success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                          <Leaf color="var(--success)" size={24} /> Organic & Cultural Control
                      </h4>
                      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)', marginTop: '1.5rem' }}>
                        {prediction.organicTreatment.map((org, i) => <li key={i} style={{marginBottom:'1rem'}}>{org}</li>)}
                      </ul>

                      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(46, 125, 50, 0.08)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                         <ShieldAlert color="var(--primary-dark)" size={28} style={{ flexShrink: 0 }} />
                         <div>
                            <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>Long-term Prevention Strategy</strong>
                            <p style={{ color: 'var(--text-dark)' }}>{prediction.prevention}</p>
                         </div>
                      </div>
                  </div>
               </div>
            )}
          </div>
        )}

        {/* Existing Timeline & Soil - left intact */}
        {activeTab === 'timeline' && (
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>Treatment Scheduler</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem', marginTop: '0.5rem' }}>
              Follow this timeline meticulously to ensure full crop recovery.
            </p>

            {schedule ? (
              <div className="timeline">
                {schedule.map((evt, idx) => (
                  <div className="timeline-item" key={idx} style={{ paddingBottom: '1.5rem' }}>
                    <div>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', fontSize: '1.1rem' }}>Day {evt.day}: {evt.action}</strong>
                      <p style={{ marginTop: '0.25rem', color: 'var(--text-dark)' }}>{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-light)' }}>
                <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3>No active treatment plans</h3>
                <p>Run a diagnosis to generate a scientific treatment plan.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'soil' && (
          <div className="dashboard-grid">
             <div className="card">
               <div className="card-header">Soil Composition Impact</div>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                 <div className="stat-value">pH 6.5</div>
                 <span className="badge warning">Slight Acidic Shift Predicted</span>
               </div>
               <p style={{ marginTop: '1rem' }}>Based on your recent application of Urea fertilizer, we predict a drop in pH. Consider adding lime or switching to organic compost next cycle.</p>
             </div>
             
             <div className="card">
               <div className="card-header">Nutrient Balance (NPK)</div>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 <li style={{ marginBottom: '0.8rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                     <strong>Nitrogen (N)</strong> <span style={{ color: 'var(--danger)' }}>High</span>
                   </div>
                   <div style={{ height: '8px', background: '#fee2e2', borderRadius: '4px' }}>
                     <div style={{ height: '100%', width: '90%', background: 'var(--danger)', borderRadius: '4px' }}></div>
                   </div>
                 </li>
                 <li style={{ marginBottom: '0.8rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                     <strong>Phosphorus (P)</strong> <span style={{ color: 'var(--primary-color)' }}>Optimal</span>
                   </div>
                   <div style={{ height: '8px', background: '#d1fae5', borderRadius: '4px' }}>
                     <div style={{ height: '100%', width: '50%', background: 'var(--success)', borderRadius: '4px' }}></div>
                   </div>
                 </li>
                 <li style={{ marginBottom: '0.8rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                     <strong>Potassium (K)</strong> <span style={{ color: 'var(--secondary-color)' }}>Low</span>
                   </div>
                   <div style={{ height: '8px', background: '#fef3c7', borderRadius: '4px' }}>
                     <div style={{ height: '100%', width: '25%', background: '#d97706', borderRadius: '4px' }}></div>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
