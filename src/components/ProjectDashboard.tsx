import React, { useState } from 'react';
import { ProjectData } from '../types';
import {
  Calendar,
  MapPin,
  User,
  Phone,
  HardHat,
  CloudSun,
  Clock,
  CheckCircle2,
  Mail,
  Layers,
  Star,
  ArrowRight,
} from './Icons';
import { mockProjectData } from '../data/mockData';
import MessageThread from './MessageThread';
import DocumentList from './DocumentList';
import ServiceCarousel from './ServiceCarousel';
import FeedbackWidget from './FeedbackWidget';
import EstimateDrawer from './EstimateDrawer';
import AddressInput from './AddressInput';

interface ProjectDashboardProps {
  projectData: ProjectData | null;
  onAddressSubmit: (address: string) => void;
}

const STATUS_STEPS = ['Not Started', 'Scheduled', 'In Progress', 'Completed'];

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ projectData, onAddressSubmit }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const data = projectData || mockProjectData;

  if (!projectData) {
    // Show address input if no project loaded
    return (
      <div className="px-6 pt-20 pb-24 min-h-screen bg-brand-dark flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2 text-center">Find Your Project</h2>
        <p className="text-gray-400 text-center mb-8 max-w-xs">
          Enter your address to view your project dashboard
        </p>
        <AddressInput onSelect={onAddressSubmit} isLoading={false} />
      </div>
    );
  }

  const currentStatusIndex = STATUS_STEPS.indexOf(data.status) >= 0 
    ? STATUS_STEPS.indexOf(data.status) 
    : 2;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'In Progress': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Materials Delivered': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const renderAddress = () => {
    const fullAddress = data.address || '';
    const parts = fullAddress.split(',');
    const street = parts[0]?.trim() || fullAddress;
    const rest = parts.slice(1).join(',').trim();

    return (
      <div>
        <h2 className="text-xl font-bold text-white leading-tight">{street}</h2>
        {rest && <p className="text-gray-400 text-sm">{rest}</p>}
      </div>
    );
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'messages', label: 'Messages' },
    { id: 'documents', label: 'Documents' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="pt-14 pb-24 min-h-screen bg-brand-dark">
      {/* Project Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getStatusColor(data.status)}`}>
            {data.status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-white/5 text-gray-400 border-white/10 uppercase tracking-wide">
            {data.installType}
          </span>
        </div>
        {renderAddress()}
      </div>

      {/* Status Timeline */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between relative">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 mx-4" />
          
          {STATUS_STEPS.map((step, i) => {
            const isPast = i <= currentStatusIndex;
            const isCurrent = i === currentStatusIndex;
            return (
              <div key={step} className="relative flex flex-col items-center z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isPast 
                    ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                    : 'bg-brand-card border border-white/20'
                } ${isCurrent ? 'ring-2 ring-amber-500/50 ring-offset-2 ring-offset-brand-dark' : ''}`}>
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
                  )}
                </div>
                <span className={`text-[9px] font-semibold mt-1.5 ${isPast ? 'text-amber-400' : 'text-gray-600'}`}>
                  {step === 'Not Started' ? 'Start' : step === 'In Progress' ? 'Active' : step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 px-5 mb-4 overflow-x-auto no-scrollbar">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeSection === sec.id
                ? 'bg-amber-500 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="px-5">
        {activeSection === 'overview' && (
          <div className="space-y-5 animate-fade-in">
            {/* Schedule Card */}
            <div className="bg-brand-card rounded-2xl p-5 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule
                </h3>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/5 p-3 rounded-xl text-center min-w-[70px] border border-white/10">
                  <span className="block text-amber-400 font-bold text-xs uppercase">
                    {data.installDate.split(' ')[0]}
                  </span>
                  <span className="block text-white font-bold text-2xl">
                    {data.installDate.split(' ')[1]?.replace(',', '')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Installation Day</p>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {data.timeWindow}
                  </div>
                </div>
              </div>
              
              {/* Weather */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <div className="flex-1 flex items-center gap-3">
                  <CloudSun className="w-6 h-6 text-amber-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Forecast</p>
                    <p className="text-white font-semibold text-sm">{data.weather.temp} · {data.weather.condition}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex-1 pl-2 opacity-60">
                  <p className="text-xs text-gray-500 font-medium">Tomorrow</p>
                  <p className="text-white font-semibold text-sm">{data.weather.tomorrowTemp} · {data.weather.tomorrowCondition}</p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> Project Team
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-brand-card border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Project Manager</p>
                      <p className="text-white font-bold">{data.projectManager.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${data.projectManager.phone}`} className="w-9 h-9 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${data.projectManager.email}`} className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-card border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <HardHat className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Crew Lead</p>
                      <p className="text-white font-bold">{data.crewLead}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> {data.installType} Materials
              </h3>
              <div className="bg-brand-card rounded-2xl border border-white/10 overflow-hidden">
                {data.materials.map((item, idx) => (
                  <div key={idx} className={`p-4 flex justify-between items-center ${
                    idx !== data.materials.length - 1 ? 'border-b border-white/5' : ''
                  }`}>
                    <span className="text-white font-medium text-sm">{item.item}</span>
                    <span className="text-gray-400 font-medium text-xs bg-white/5 px-2 py-1 rounded-md border border-white/10">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell Carousel */}
            <ServiceCarousel />
          </div>
        )}

        {activeSection === 'messages' && <MessageThread />}
        {activeSection === 'documents' && <DocumentList />}
        {activeSection === 'feedback' && <FeedbackWidget />}
      </div>
    </div>
  );
};

export default ProjectDashboard;
