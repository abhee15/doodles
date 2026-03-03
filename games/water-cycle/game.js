/**
 * Water Cycle — Game Init
 */
/* eslint-disable no-undef */

/**
 * Register 3D scene handler for water cycle evaporation
 */
window.SCENE_3D = {
  'water-cycle-3d-evaporation': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better sky background: gradient from light to mid-blue
    scene.background = new THREE.Color(0x87d4ff);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Sun: Glowing and vibrant
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfcd34d,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.9,
        metalness: 0.1,
        roughness: 0.2
      })
    );
    sun.position.set(-8, 5, -5);
    scene.add(sun);

    // Ocean: Deeper, more vibrant blue
    const oceanGeo = new THREE.PlaneGeometry(18, 10);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x015a96,
      emissiveIntensity: 0.15
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2.2;
    ocean.position.y = -2;
    scene.add(ocean);

    // Water vapor particles: More visible with brighter colors
    const vaporParticles = [];
    for (let i = 0; i < 16; i++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xe0f4ff,
          transparent: true,
          opacity: 0.7,
          emissive: 0xb3e5fc,
          emissiveIntensity: 0.3,
          metalness: 0.1,
          roughness: 0.3
        })
      );
      particle.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 2 - 2,
        (Math.random() - 0.5) * 4
      );
      vaporParticles.push({
        mesh: particle,
        vx: (Math.random() - 0.5) * 0.02,
        vy: 0.03 + Math.random() * 0.02,
        vz: (Math.random() - 0.5) * 0.02
      });
      scene.add(particle);
    }

    // Enhanced lighting: strong sun + fill light
    const sunLight = new THREE.DirectionalLight(0xffffee, 2.5);
    sunLight.position.set(-8, 6, -5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x6bb6ff, 1.2);
    fillLight.position.set(8, -3, 5);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x87d4ff, 0.8));

    let animId;
    function animate() {
      const timeVal = Date.now() * 0.003;

      // Animate vapor particles with scale pulsing for visibility
      vaporParticles.forEach((particle, idx) => {
        particle.mesh.position.add(new THREE.Vector3(particle.vx, particle.vy, particle.vz));

        // Add pulsing scale for more visibility
        const scale = 1 + Math.sin(timeVal + idx * 0.3) * 0.2;
        particle.mesh.scale.set(scale, scale, scale);

        // Reset particle if it goes too high
        if (particle.mesh.position.y > 8) {
          particle.mesh.position.set((Math.random() - 0.5) * 7, -2, (Math.random() - 0.5) * 4);
        }
      });

      // Sun pulsing with glow
      const pulse = 1 + Math.sin(timeVal) * 0.12;
      sun.scale.set(pulse, pulse, pulse);
      sun.material.emissiveIntensity = 0.9 + Math.sin(timeVal * 1.5) * 0.3;

      // Ocean shimmer effect
      ocean.material.emissiveIntensity = 0.15 + Math.sin(timeVal * 0.5) * 0.1;

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
