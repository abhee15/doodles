/**
 * Day & Night — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for day-and-night
 */
window.SCENE_3D = {
  'day-and-night-3d': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better background: space with blue-ish night color
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    // Enhanced stars background
    const starVerts = [];
    for (let i = 0; i < 400; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 70
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));

    // Sun: Brighter, more vibrant with glow
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfcd34d,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.9,
        metalness: 0.1,
        roughness: 0.2
      })
    );
    sun.position.set(-5, 0, 0);
    scene.add(sun);

    // Earth: Brighter green with better visibility
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        metalness: 0.2,
        roughness: 0.4,
        emissive: 0x16a34a,
        emissiveIntensity: 0.15
      })
    );
    scene.add(earth);

    // Dark side hemisphere: Darker but still visible
    const darkGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.1,
      roughness: 0.5,
      emissive: 0x1f2937,
      emissiveIntensity: 0.2
    });
    const darkSide = new THREE.Mesh(darkGeo, darkMat);
    darkSide.rotation.x = Math.PI / 2.5;
    scene.add(darkSide);

    // Enhanced lighting: strong sun + fill light
    const sunLight = new THREE.DirectionalLight(0xffffee, 2.8);
    sunLight.position.set(-5, 1, 1);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.2);
    fillLight.position.set(5, -1, -2);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x3b5998, 0.7));

    // Animation
    let animId;
    function animate() {
      const timeVal = Date.now() * 0.002;
      earth.rotation.y += 0.002;
      darkSide.rotation.y += 0.002;

      // Sun pulsing with glow
      const pulse = 1 + Math.sin(timeVal) * 0.1;
      sun.scale.set(pulse, pulse, pulse);
      sun.material.emissiveIntensity = 0.9 + Math.sin(timeVal * 1.5) * 0.25;

      // Earth subtle glow
      earth.material.emissiveIntensity = 0.15 + Math.sin(timeVal * 0.8) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return {
      dispose() {
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const c = window.TOPIC_DATA.color;
  root.style.setProperty('--dom-nav-bg', c.nav);
  root.style.setProperty('--dom-accent', c.accent);
  root.style.setProperty('--dom-accent2', c.accent2);
  root.style.setProperty('--dom-bg', c.bg);
  root.style.setProperty('--dom-bg-card', c.card);
  root.style.setProperty('--dom-border', c.border);

  const story = new ScienceStory({
    gameId: window.TOPIC_DATA.id,
    navTitle: window.TOPIC_DATA.name,
    storageKey: `sci-${window.TOPIC_DATA.id}`,
    topicData: window.TOPIC_DATA
  });
  story.init();
});
