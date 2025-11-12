'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Service {
  id: number;
  name: string;
  image: string;
}

interface Treatment {
  id: number;
  name: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  read: boolean;
}

interface Settings {
  id: number;
  hospital_name: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  working_hours: string;
}

export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  
  const [services, setServices] = useState<Service[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  const [newService, setNewService] = useState({ name: '', image: '' });
  const [newTreatment, setNewTreatment] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      // Fetch services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      // Fetch treatments
      const { data: treatmentsData } = await supabase
        .from('treatments')
        .select('*')
        .order('created_at', { ascending: true });

      // Fetch contact messages
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch settings
      const { data: settingsData } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .single();

      if (servicesData) setServices(servicesData);
      if (treatmentsData) setTreatments(treatmentsData);
      if (messagesData) setContactMessages(messagesData);
      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('adminAuth', 'true');
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  const addService = async () => {
    if (newService.name && newService.image) {
      try {
        const { data, error } = await supabase
          .from('services')
          .insert([{ name: newService.name, image: newService.image }])
          .select();

        if (error) throw error;

        if (data) {
          setServices([...services, data[0]]);
          setNewService({ name: '', image: '' });
          alert('Service added successfully!');
        }
      } catch (error) {
        console.error('Error adding service:', error);
        alert('Failed to add service. Please try again.');
      }
    }
  };

  const deleteService = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setServices(services.filter(s => s.id !== id));
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const addTreatment = async () => {
    if (newTreatment) {
      try {
        const { data, error } = await supabase
          .from('treatments')
          .insert([{ name: newTreatment }])
          .select();

        if (error) throw error;

        if (data) {
          setTreatments([...treatments, data[0]]);
          setNewTreatment('');
          alert('Treatment added successfully!');
        }
      } catch (error) {
        console.error('Error adding treatment:', error);
        alert('Failed to add treatment. Please try again.');
      }
    }
  };

  const deleteTreatment = async (id: number) => {
    if (confirm('Are you sure you want to delete this treatment?')) {
      try {
        const { error } = await supabase
          .from('treatments')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setTreatments(treatments.filter(t => t.id !== id));
        alert('Treatment deleted successfully!');
      } catch (error) {
        console.error('Error deleting treatment:', error);
        alert('Failed to delete treatment. Please try again.');
      }
    }
  };

  const markMessageAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setContactMessages(contactMessages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
      alert('Failed to update message. Please try again.');
    }
  };

  const deleteMessage = async (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setContactMessages(contactMessages.filter(msg => msg.id !== id));
        alert('Message deleted successfully!');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
      }
    }
  };

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          hospital_name: settings.hospital_name,
          contact_phone: settings.contact_phone,
          contact_email: settings.contact_email,
          contact_address: settings.contact_address,
          working_hours: settings.working_hours
        })
        .eq('id', settings.id);

      if (error) throw error;

      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
              🌿
            </div>
            <h1 className="text-3xl font-bold text-green-700">Admin Portal</h1>
            <p className="text-gray-600 mt-2">Sanjeevani Ayurvedic Hospital</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-green-600 hover:text-green-700 font-semibold">
              ← Back to Website
            </Link>
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-xl text-sm text-gray-600 border border-green-100">
            <strong className="text-green-700">Demo Credentials:</strong><br />
            Username: admin<br />
            Password: admin123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl border border-white/30">
                🌿
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <p className="text-green-100 text-sm">Sanjeevani Hospital</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/" className="hover:text-green-100 transition">
                View Website
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition border border-white/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'services' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600'}`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'treatments' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600'}`}
            >
              Treatments
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'messages' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600'}`}
            >
              Contact Messages
              {contactMessages.filter(m => !m.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {contactMessages.filter(m => !m.read).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'settings' ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600'}`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Services Management</h2>
            
            {/* Add New Service */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Service</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newService.image}
                  onChange={(e) => setNewService({...newService, image: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <button
                  onClick={addService}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition"
                >
                  Add Service
                </button>
              </div>
            </div>

            {/* Services Grid */}
            {services.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Yet</h3>
                <p className="text-gray-600">Add your first service to get started</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">{service.name}</h3>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                      >
                        Delete Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Treatments Tab */}
        {activeTab === 'treatments' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Treatments Management</h2>
            
            {/* Add New Treatment */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Treatment</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Treatment Name"
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <button
                  onClick={addTreatment}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition"
                >
                  Add Treatment
                </button>
              </div>
            </div>

            {/* Treatments List */}
            {treatments.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">💊</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Treatments Yet</h3>
                <p className="text-gray-600">Add your first treatment to get started</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {treatments.map((treatment) => (
                  <div key={treatment.id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        ✓
                      </div>
                      <span className="text-gray-800 font-semibold">{treatment.name}</span>
                    </div>
                    <button
                      onClick={() => deleteTreatment(treatment.id)}
                      className="text-red-600 hover:text-red-800 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Messages</h2>
            {contactMessages.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
                <p className="text-gray-600">Contact messages will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition ${!msg.read ? 'border-l-4 border-green-500' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          {msg.name}
                          {!msg.read && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>}
                        </h3>
                        <p className="text-gray-600 text-sm">{new Date(msg.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        {!msg.read && (
                          <button
                            onClick={() => markMessageAsRead(msg.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold text-sm"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-600 text-sm font-semibold">Email:</span>
                        <p className="text-gray-800">{msg.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm font-semibold">Phone:</span>
                        <p className="text-gray-800">{msg.phone}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm font-semibold">Message:</span>
                      <p className="text-gray-800 mt-2 p-4 bg-gray-50 rounded-lg">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Hospital Settings</h2>
            {settings ? (
              <div className="bg-white p-8 rounded-lg shadow">
                <form onSubmit={updateSettings} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Hospital Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Hospital Name</label>
                        <input
                          type="text"
                          value={settings.hospital_name}
                          onChange={(e) => setSettings({...settings, hospital_name: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
                        <input
                          type="text"
                          value={settings.contact_phone}
                          onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Email</label>
                        <input
                          type="email"
                          value={settings.contact_email}
                          onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Working Hours</label>
                        <input
                          type="text"
                          value={settings.working_hours}
                          onChange={(e) => setSettings({...settings, working_hours: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">Contact Address</label>
                        <textarea
                          value={settings.contact_address}
                          onChange={(e) => setSettings({...settings, contact_address: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition resize-none"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Settings...</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
