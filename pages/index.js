import Head from 'next/head';
import VirtualFittingRoom from '../components/VirtualFittingRoom';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sway Maverick - Virtual Fitting Room</title>
        <meta name="description" content="3D Try-on Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* استدعاء غرفة القياس الافتراضية */}
        <VirtualFittingRoom />
      </main>
    </div>
  );
}
