import BuildLogs from '../components/BuildLogs';

export default function Dashboard() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '20px' }}>
      <BuildLogs />
    </div>
  );
}
