import React, { useState } from 'react';

// Exact log data passed as mock API response
const mockLogData = [
  { time: "17:38:05.462", text: "Running build in Washington, D.C., USA (East) – iad1", type: "info" },
  { time: "17:38:05.463", text: "Build machine configuration: 2 cores, 8 GB", type: "info" },
  { time: "17:38:05.574", text: "Cloning github.com/AhmedMohy99/my-fitting-room (Branch: main, Commit: 7413a71)", type: "clone" },
  { time: "17:38:05.575", text: "Previous build caches not available.", type: "warn" },
  { time: "17:38:07.546", text: "Cloning completed: 1.972s", type: "success" },
  { time: "17:38:07.899", text: "Running \"vercel build\"", type: "command" },
  { time: "17:38:07.922", text: "Vercel CLI 53.3.2", type: "info" },
  { time: "17:38:08.045", text: "Build Completed in /vercel/output [65ms]", type: "success" },
  { time: "17:38:08.075", text: "Deploying outputs...", type: "info" },
  { time: "17:38:09.523", text: "Deployment completed", type: "success" },
  { time: "17:38:09.626", text: "Creating build cache...", type: "info" },
  { time: "17:38:09.639", text: "Skipping cache upload because no files were prepared", type: "warn" }
];

const BuildLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logs based on search input
  const filteredLogs = mockLogData.filter(log => 
    log.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      background: '#0a0a0a',
      color: '#eaeaea',
      fontFamily: 'Inter, SF Pro Icons, sans-serif',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
      maxHorizontalWidth: '1000px',
      margin: '40px auto',
      border: '1px solid #222'
    }}>
      
      {/* Header section with metadata */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #222',
        paddingBottom: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0070f3', display: 'inline-block' }}></span>
            <h3 style={{ margin: 0, fontWeight: '600', letterSpacing: '-0.5px' }}>Deployment Build Logs</h3>
          </div>
          <p style={{ margin: '5px 0 0 0', color: '#888', fontSize: '13px' }}>
            Repository: <span style={{ color: '#0070f3' }}>AhmedMohy99/my-fitting-room</span>
          </p>
        </div>

        {/* Top Badges */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: '#111', border: '1px solid #333', padding: '6px 12px', borderRadius: '6px', fontSize: '13px' }}>
            Total Time: <strong style={{ color: '#fff' }}>4s</strong>
          </div>
          <div style={{ background: '#111', border: '1px solid #333', padding: '6px 12px', borderRadius: '6px', fontSize: '13px' }}>
            Lines: <strong style={{ color: '#fff' }}>{mockLogData.length}</strong>
          </div>
          <div style={{ background: '#1d2417', border: '1px solid #273715', color: '#27c93f', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
            READY
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '15px',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search logs... (Ctrl + F)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: '#111',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '10px 15px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Region: <span style={{ color: '#aaa' }}>iad1 (Washington, D.C.)</span>
        </div>
      </div>

      {/* Terminal View */}
      <div style={{
        background: '#000',
        border: '1px solid #222',
        borderRadius: '10px',
        padding: '20px',
        fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
        fontSize: '13px',
        lineHeight: '1.6',
        overflowX: 'auto',
        maxHeight: '450px',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)'
      }}>
        {filteredLogs.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: '20px' }}>No logs matching criteria.</div>
        ) : (
          filteredLogs.map((log, index) => {
            // Determine log line color treatment based on type
            let textColor = '#aaa';
            if (log.type === 'success') textColor = '#27c93f';
            if (log.type === 'warn') textColor = '#f5a623';
            if (log.type === 'command') textColor = '#0070f3';

            return (
              <div key={index} style={{ display: 'flex', gap: '20px', whiteSpace: 'nowrap', borderBottom: '1px solid #050505', padding: '2px 0' }}>
                {/* Line number */}
                <span style={{ color: '#444', width: '25px', textAlign: 'right', userSelect: 'none' }}>{index + 1}</span>
                {/* Timestamp */}
                <span style={{ color: '#666', userSelect: 'none' }}>{log.time}</span>
                {/* Log message content */}
                <span style={{ color: textColor }}>{log.text}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BuildLogs;
