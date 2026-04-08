import React from 'react';
import { ProjectData } from '../types';
import {
  Calendar,
  User,
  Phone,
  Mail,
  HardHat,
  CloudSun,
  Clock,
  Layers,
} from './Icons';
import ServiceCarousel from './ServiceCarousel';

interface OverviewTabProps {
  data: ProjectData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const getRelativeTimeInfo = (dateString: string) => {
    const installDate = new Date(dateString);
    if (isNaN(installDate.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(installDate);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: 'Today', className: 'bg-green-100 text-green-700 border-green-200' };
    if (diffDays === 1) return { label: 'Tomorrow', className: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (diffDays === -1) return { label: 'Yesterday', className: 'bg-gray-100 text-gray-600 border-gray-200' };
    if (diffDays > 1 && diffDays < 7) return { label: `Due in ${diffDays} days`, className: 'bg-amber-100 text-amber-700 border-amber-200' };
    if (diffDays >= 7 && diffDays < 14) return { label: 'Next Week', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
    if (diffDays >= 14) return { label: 'Upcoming', className: 'bg-gray-100 text-gray-600 border-gray-200' };
    if (diffDays < -1 && diffDays > -7) return { label: `${Math.abs(diffDays)} days ago`, className: 'bg-gray-100 text-gray-500 border-gray-200' };
    if (diffDays <= -7 && diffDays > -14) return { label: 'Last Week', className: 'bg-gray-100 text-gray-500 border-gray-200' };
    if (diffDays <= -14) return { label: 'Completed', className: 'bg-gray-100 text-gray-400 border-gray-200' };

    return null;
  };

  const timeInfo = getRelativeTimeInfo(data.installDate);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Schedule Section */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Schedule
          </h3>
          {timeInfo && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border ${timeInfo.className}`}>
              {timeInfo.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-center min-w-[70px]">
            <span className="block text-red-500 font-bold text-xs uppercase">{data.installDate.split(' ')[0]}</span>
            <span className="block text-gray-900 font-bold text-2xl">{data.installDate.split(' ')[1]?.replace(',', '')}</span>
          </div>
          <div>
            <p className="text-gray-900 font-bold text-lg">Installation Day</p>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Clock className="w-3 h-3 mr-1" />
              {data.timeWindow}
            </div>
          </div>
        </div>

        {/* Weather Mini-Card */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200/60">
          <div className="flex-1 flex items-center gap-3">
            <CloudSun className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Forecast</p>
              <p className="text-gray-900 font-semibold">{data.weather.temp} · {data.weather.condition}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex-1 flex items-center gap-3 pl-2">
            <div className="opacity-50">
              <p className="text-xs text-gray-400 font-medium">Tomorrow</p>
              <p className="text-gray-900 font-semibold">{data.weather.tomorrowTemp} · {data.weather.tomorrowCondition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <User className="w-4 h-4" /> Project Team
        </h3>
        <div className="grid gap-4">
          {/* Project Manager */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Project Manager</p>
                <p className="text-gray-900 font-bold">{data.projectManager.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${data.projectManager.phone}`} className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <a href={`mailto:${data.projectManager.email}`} className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Crew Lead */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <HardHat className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Crew Lead</p>
                <p className="text-gray-900 font-bold">{data.crewLead}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Material List */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4" /> {data.installType ? `${data.installType} Materials` : 'Material List'}
        </h3>
        <div className="bg-gray-50 rounded-2xl p-1 border border-gray-100 shadow-sm overflow-hidden">
          {data.materials.map((item, idx) => (
            <div key={idx} className={`p-4 flex justify-between items-center ${idx !== data.materials.length - 1 ? 'border-b border-gray-200/60' : ''}`}>
              <span className="text-gray-900 font-medium text-sm">{item.item}</span>
              <span className="text-gray-500 font-medium text-sm bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Carousel */}
      <ServiceCarousel />

      {/* Footer */}
      <div className="text-center pt-4 pb-8 text-gray-400 text-xs">
        <p>© 2026 ProPorch, Inc.</p>
      </div>
    </div>
  );
};

export default OverviewTab;
