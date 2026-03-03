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
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    // Sun
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    sun.position.set(-8, 5, -5);
    scene.add(sun);

    // Ocean (large blue plane)
    const oceanGeo = new THREE.PlaneGeometry(16, 8);
    const oceanMat = new THREE.MeshLambertMaterial({ color: 0x0369a1 });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2.2;
    ocean.position.y = -2;
    scene.add(ocean);

    // Water vapor particles rising
    const vaporParticles = [];
    for (let i = 0; i < 12; i++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.MeshLambertMaterial({ color: 0xdbeafe, transparent: true, opacity: 0.6 })
      );
      particle.position.set(
        (Math.random() - 0.5) * 6,
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

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffee, 1.5);
    sunLight.position.set(-8, 5, -5);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x87ceeb, 0.7));

    let animId;
    function animate() {
      // Animate vapor particles
      vaporParticles.forEach(particle => {
        particle.mesh.position.add(new THREE.Vector3(particle.vx, particle.vy, particle.vz));

        // Reset particle if it goes too high
        if (particle.mesh.position.y > 8) {
          particle.mesh.position.set((Math.random() - 0.5) * 6, -2, (Math.random() - 0.5) * 4);
        }
      });

      sun.scale.set(
        1 + Math.sin(Date.now() * 0.003) * 0.1,
        1 + Math.sin(Date.now() * 0.003) * 0.1,
        1 + Math.sin(Date.now() * 0.003) * 0.1
      );

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
