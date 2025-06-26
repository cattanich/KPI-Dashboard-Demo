'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: '#1a1a1a',
      }}>
        KPI Dashboard
      </h1>
      <p style={{
        fontSize: '1.125rem',
        marginBottom: '2rem',
        maxWidth: '600px',
        textAlign: 'center',
        color: '#4b5563',
      }}>
        A comprehensive dashboard for monitoring and analyzing Key Performance Indicators. Browse the library, explore assets, and gain insights from your data.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '300px',
      }}>
        <Link 
          href="/dashboard" 
          style={{
            backgroundColor: '#6d28d9',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: '600',
            textAlign: 'center',
            transition: 'background-color 0.2s',
          }}
        >
          Go to Dashboard
        </Link>
        <Link 
          href="/library" 
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: '600',
            textAlign: 'center',
            transition: 'background-color 0.2s',
          }}
        >
          Browse KPI Library
        </Link>
      </div>
    </main>
  );
}
