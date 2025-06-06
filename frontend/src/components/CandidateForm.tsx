import React, { useState } from 'react';
import axios from 'axios';

interface CandidateFormProps {
  onSuccess?: () => void;
}

interface ApiError {
  errors: string[];
}

export const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: [{ year: '', field: '', degree: '', institution: '' }],
    workExperience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
  });
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setFormData((prev) => ({ ...prev, workExperience: newWorkExperience }));
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'education' || key === 'workExperience') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value as string);
      }
    });
    if (cv) {
      data.append('cv', cv);
    }

    try {
      await axios.post('http://localhost:3010/api/candidates', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { errors?: string[] } } };
      if (axiosError.response?.data?.errors) {
        setErrors(axiosError.response.data.errors);
      } else {
        setErrors(['Error al enviar el formulario.']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '32rem', margin: '0 auto', padding: '1.5rem', background: 'linear-gradient(to right, #3B82F6, #8B5CF6)', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: 'white' }}>Registro de Candidato</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
            />
          </div>
          <div>
            <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
          />
        </div>
        <div>
          <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
          />
        </div>
        <div>
          <label htmlFor="address" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
          />
        </div>
        <div>
          <label htmlFor="cv" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>CV (PDF)</label>
          <input
            type="file"
            id="cv"
            accept=".pdf"
            onChange={handleCvChange}
            style={{ marginTop: '0.25rem', display: 'block', width: '100%' }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white' }}>Educación</h3>
          {formData.education.map((edu, index) => (
            <div key={index} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Año"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="text"
                placeholder="Campo"
                value={edu.field}
                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="text"
                placeholder="Título"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="text"
                placeholder="Institución"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white' }}>Experiencia laboral</h3>
          {formData.workExperience.map((exp, index) => (
            <div key={index} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Empresa"
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="text"
                placeholder="Cargo"
                value={exp.position}
                onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="date"
                placeholder="Fecha inicio"
                value={exp.startDate}
                onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <input
                type="date"
                placeholder="Fecha fin"
                value={exp.endDate}
                onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
              <textarea
                placeholder="Descripción"
                value={exp.description}
                onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                style={{ marginTop: '0.25rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', outline: 'none', borderColor: '#3B82F6' }}
              />
            </div>
          ))}
        </div>
        {errors.length > 0 && (
          <div style={{ color: 'red' }}>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0.5rem 1rem', border: '1px solid transparent', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', fontWeight: '500', color: 'white', backgroundColor: '#4F46E5', outline: 'none' }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
}; 