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
    scene.background = new THREE.Color(0x1e1b4b);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Stars
    const starVerts = [];
    for (let i = 0; i < 200; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })));

    // Earth (large sphere)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0x22c55e })
    );
    earth.position.y = -3;
    scene.add(earth);

    // Falling objects (red, blue, yellow spheres)
    const objects = [
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 16, 16),
          new THREE.MeshLambertMaterial({ color: 0xef4444 })
        ),
        x: -2,
        startY: 3
      },
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 16, 16),
          new THREE.MeshLambertMaterial({ color: 0x3b82f6 })
        ),
        x: 0,
        startY: 4
      },
      {
        mesh: new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 16, 16),
          new THREE.MeshLambertMaterial({ color: 0xfbbf24 })
        ),
        x: 2,
        startY: 3.5
      }
    ];

    objects.forEach(obj => {
      obj.mesh.position.set(obj.x, obj.startY, 0);
      scene.add(obj.mesh);
    });

    // Gravity well visualization (wireframe sphere around Earth)
    const wellGeo = new THREE.SphereGeometry(5, 16, 16);
    const wellMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1
    });
    const well = new THREE.Mesh(wellGeo, wellMat);
    well.position.y = -3;
    scene.add(well);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x6366f1, 0.5));

    // Animation
    let time = 0;
    let animId;
    function animate() {
      time += 0.016;

      // Animate falling objects
      objects.forEach(obj => {
        const fallSpeed = 0.03;
        obj.mesh.position.y -= fallSpeed;

        // Reset if below Earth
        if (obj.mesh.position.y < -4) {
          obj.mesh.position.y = obj.startY;
        }

        // Rotate objects
        obj.mesh.rotation.x += 0.02;
        obj.mesh.rotation.y += 0.03;
      });

      // Rotate Earth slowly
      earth.rotation.y += 0.001;

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
