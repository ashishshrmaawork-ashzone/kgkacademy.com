import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

const NotFound = () => (
  <MainLayout>
    <section className="min-h-[60vh] flex items-center justify-center bg-dark-navy">
      <div className="text-center">
        <p className="text-primary text-8xl font-bold mb-4">404</p>
        <h1 className="text-white text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white/60 text-sm mb-8">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </section>
  </MainLayout>
);

export default NotFound;
