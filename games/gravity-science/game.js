/* eslint-disable no-undef */

/**
 * Register 3D scene handler for gravity
 */
window.SCENE_3D = {
  'gravity-3d-force': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better background: deep space blue with purple tint
    scene.background = new THREE.Color(0x2e1a47);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 8.5);
    camera.lookAt(0, 0, 0);

    // Enhanced stars
    const starVerts = [];
    for (let i = 0; i < 300; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));

    // Earth: Brighter with glow
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        metalness: 0.2,
        roughness: 0.4,
        emissive: 0x16a34a,
        emissiveIntensity: 0.2
      })
    );
    earth.position.y = -3;
    scene.add(earth);

    // Falling objects: Brighter, more vibrant colors
    const objects = [
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.33, 16, 16),
          new THREE.MeshStandardMaterial({
            color: 0xff6b6b,
            emissive: 0xef4444,
            emissiveIntensity: 0.4,
            metalness: 0.1,
            roughness: 0.3
          })
        ),
        x: -2,
        startY: 3
      },
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 16, 16),
          new THREE.MeshStandardMaterial({
            color: 0x60a5fa,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.4,
            metalness: 0.1,
            roughness: 0.3
          })
        ),
        x: 0,
        startY: 4
      },
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.31, 16, 16),
          new THREE.MeshStandardMaterial({
            color: 0xfcd34d,
            emissive: 0xfbbf24,
            emissiveIntensity: 0.4,
            metalness: 0.1,
            roughness: 0.3
          })
        ),
        x: 2,
        startY: 3.5
      }
    ];

    objects.forEach(obj => {
      obj.mesh.position.set(obj.x, obj.startY, 0);
      scene.add(obj.mesh);
    });

    // Gravity well visualization: More visible with better colors
    const wellGeo = new THREE.SphereGeometry(5.5, 20, 20);
    const wellMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.25
    });
    const well = new THREE.Mesh(wellGeo, wellMat);
    well.position.y = -3;
    scene.add(well);

    // Enhanced lighting: strong directional + point light
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(6, 6, 6);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xa78bfa, 0.8);
    pointLight.position.set(0, -3, 0);
    scene.add(pointLight);

    scene.add(new THREE.AmbientLight(0x7c3aed, 0.6));

    // Animation
    let time = 0;
    let animId;
    function animate() {
      time += 0.016;
      const timeVal = Date.now() * 0.001;

      // Animate falling objects with glow pulsing
      objects.forEach((obj, idx) => {
        const fallSpeed = 0.03;
        obj.mesh.position.y -= fallSpeed;

        // Reset if below Earth
        if (obj.mesh.position.y < -4) {
          obj.mesh.position.y = obj.startY;
        }

        // Rotate objects
        obj.mesh.rotation.x += 0.02;
        obj.mesh.rotation.y += 0.03;

        // Pulsing glow on falling objects
        obj.mesh.material.emissiveIntensity = 0.4 + Math.sin(timeVal + idx * 0.8) * 0.2;
      });

      // Rotate Earth slowly
      earth.rotation.y += 0.001;
      earth.material.emissiveIntensity = 0.2 + Math.sin(timeVal * 0.5) * 0.1;

      // Gravity well pulsing
      well.material.opacity = 0.25 + Math.sin(timeVal * 0.8) * 0.1;

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
