import React from 'react';
import { GraduationCap, Mail, Phone, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { StudentData } from '../types';

interface IDCardProps {
  data: StudentData;
  cardRef: React.RefObject<HTMLDivElement>;
}

export default function IDCard({ data, cardRef }: IDCardProps) {
  const qrValue = JSON.stringify({
    name: data.fullName,
    id: data.studentId,
    program: data.program,
    email: data.email
  });

  return (
    <div
      ref={cardRef}
      className="w-[400px] h-[250px] relative overflow-hidden gradient-border"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32 blur-xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-24 -translate-x-24 blur-xl" />
      </div>

      {/* Security Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657l7.9-7.9h2.757zm5.656 0l-6.485 6.485L25.515 8.14l7.9-7.9h-.714zm5.657 0l-4.343 4.343-1.414 1.414 7.9-7.9h-2.143zM54.627 5.373l.83.828-1.415 1.415-1.414-1.415h2zm-5.656 0l.828.828-1.414 1.415-1.415-1.415h2zm-5.657 0l.828.828-1.414 1.415-1.414-1.415h2zm-5.656 0l.828.828-1.414 1.415-1.415-1.415h2zm-5.657 0l.828.828-1.414 1.415-1.414-1.415h2zm-5.656 0l.828.828-1.414 1.415-1.415-1.415h2zm-5.657 0l.828.828-1.414 1.415-1.414-1.415h2zM5.373 5.373l.828.828-1.414 1.415-1.415-1.415h2zm5.657 0l.828.828-1.414 1.415-1.415-1.415h2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative p-6 text-white h-full flex flex-col justify-between">
        <div className="flex gap-4">
          <div className="relative">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/50 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border-4 border-white/50">
                <GraduationCap className="w-12 h-12 text-white/70" />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-white/10 backdrop-blur-sm rounded-full p-1.5">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-1">
            <h2 className="text-2xl font-bold truncate">{data.fullName}</h2>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                ID: {data.studentId}
              </span>
            </div>
            <p className="text-white/90 font-medium">{data.program}</p>
            <p className="text-white/80 text-sm">Year {data.yearOfStudy}</p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <span className="text-white/90">{data.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span className="text-white/90">{data.phone}</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-white rounded-lg p-1">
              <QRCodeSVG
                value={qrValue}
                size={48}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="mt-1 text-xs text-white/70 text-right">
              Valid through {new Date().getFullYear() + 4}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}