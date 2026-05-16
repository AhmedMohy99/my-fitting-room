'use client'; // ضروري جداً لأن Three.js يعمل في المتصفح فقط (Client-Side)

import VirtualFittingRoom from '../components/VirtualFittingRoom';

export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* استدعاء غرفة القياس الافتراضية */}
      <VirtualFittingRoom />
    </main>
  );
}
