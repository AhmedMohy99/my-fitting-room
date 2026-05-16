import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const VirtualFittingRoom = () => {
  const containerRef = useRef(null);
  const [currentSize, setCurrentSize] = useState('L'); // المقاس الافتراضي عند فتح الموقع
  const [loading, setLoading] = useState(false);
  
  // الاحتفاظ بمراجع الـ Three.js لمنع التكرار في الذاكرة
  const sceneRef = useRef(null);
  const currentModelRef = useRef(null);

  const sizes = ['M', 'L', 'XL', 'XXL', '3XL'];

  useEffect(() => {
    // 1. إعداد المشهد الأساسي (Scene Setup)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1a1a1a'); // خلفية داكنة احترافية لبروز الموديل
    sceneRef.current = scene;

    // 2. إعداد الكاميرا (Camera Setup)
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 3); // وضع الكاميرا أمام صدر الشخصية مباشرة

    // 3. إعداد وحدة الرندر (Renderer Setup)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // 4. إعداد الإضاءة المحيطية والموجهة لظهور اللوجو والألوان بوضوح (Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(2, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-2, 2, -3);
    scene.add(dirLight2);

    // 5. إضافة متحكمات الكاميرا بالماوس (Orbit Controls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2; // منع الكاميرا من النزول تحت الأرض
    controls.minDistance = 1.5;           # أقصى زووم للداخل
    controls.maxDistance = 5;             # أقصى زووم للخارج

    // 6. دالة التحريك المستمر (Animation Loop)
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 7. التعامل مع تغير حجم الشاشة المتجاوب (Responsive)
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // تنظيف المشهد عند إغلاق المكون من المتصفح لمنع تسريب الذاكرة
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 8. دالة تحميل الموديل الذكية عند تغيير المقاس
  useEffect(() => {
    if (!sceneRef.current) return;

    setLoading(true);

    // حذف الموديل السابق من المشهد قبل تحميل الجديد لتوفير الرام
    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
    }

    const loader = new GLTFLoader();
    // استدعاء الملف الديناميكي بناءً على المقاس المختار من مجلد public
    const modelPath = `/models/tshirt_${currentSize}.glb`;

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // تعديل موضع الموديل ليكون متمركزاً في منتصف الشاشة تماماً
        model.position.set(0, 0, 0);
        
        // تعديل مقياس ميكسامو برمجياً ليظهر الحجم مناسباً لعدسة الكاميرا
        model.scale.set(1, 1, 1); 

        sceneRef.current.add(model);
        currentModelRef.current = model;
        setLoading(false);
      },
      (xhr) => {
        // يمكن حساب نسبة التحميل هنا إذا كنت تريد إضافة ProgressBar
      },
      (error) => {
        print("Error loading model:", error);
        setLoading(false);
      }
    );
  }, [currentSize]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100vh', background: '#111', fontFamily: 'Arial, sans-serif' }}>
      
      {/* شريط العنوان العلوي */}
      <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 5px 0', letterSpacing: '2px' }}>SWAY MAVERICK</h2>
        <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>3D Virtual Fitting Room</p>
      </div>

      {/* حاوية العرض الـ 3D */}
      <div style={{ width: '90%', maxHorizontalWidth: '800px', height: '65vh', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        
        {/* مؤشر التحميل البصري */}
        {loading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', zIndex: 10 }}>
            Loading Size {currentSize}...
          </div>
        )}
      </div>

      {/* لوحة التحكم السفلية واختيار المقاسات */}
      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ color: '#aaa', marginBottom: '12px', fontSize: '14px' }}>SELECT YOUR SIZE</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setCurrentSize(size)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: currentSize === size ? '#fff' : '#222',
                color: currentSize === size ? '#000' : '#fff',
                boxShadow: currentSize === size ? '0 0 15px rgba(255,255,255,0.4)' : 'none',
                transform: currentSize === size ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualFittingRoom;
