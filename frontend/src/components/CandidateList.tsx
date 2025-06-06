import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: Array<{
    year: string;
    field: string;
    degree: string;
    institution: string;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  cvUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>('http://localhost:3010/api/candidates');
        setCandidates(response.data);
      } catch (err) {
        setError('Error al cargar los candidatos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lista de Candidatos</h2>
      {candidates.length === 0 ? (
        <p>No hay candidatos registrados.</p>
      ) : (
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p>Email: {candidate.email}</p>
              <p>Teléfono: {candidate.phone}</p>
              <p>Dirección: {candidate.address}</p>
              <p>Estado: {candidate.status}</p>
              {candidate.cvUrl && (
                <a
                  href={`http://localhost:3010${candidate.cvUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Ver CV
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 