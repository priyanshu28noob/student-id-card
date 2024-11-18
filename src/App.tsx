import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import { StudentData } from './types';

function App() {
  const [studentData, setStudentData] = React.useState<StudentData | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (data: StudentData) => {
    setStudentData(data);
  };

  const downloadAsPDF = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      pdf.save(`${studentData?.fullName.replace(/\s+/g, '_')}_id_card.pdf`);
      toast.success('ID Card downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Student ID Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Student Information</h2>
                <StudentForm onSubmit={handleSubmit} isLoading={isGenerating} />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Preview</h2>
                {studentData ? (
                  <div className="space-y-6">
                    <IDCard data={studentData} cardRef={cardRef} />
                    <button
                      onClick={downloadAsPDF}
                      disabled={isGenerating}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No preview available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Fill out the form to see your ID card preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;