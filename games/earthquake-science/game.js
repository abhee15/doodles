/* eslint-disable no-undef */

/**
 * Register 3D scene handler for earthquake tectonic plates
 */
window.SCENE_3D = {
  'earthquake-3d-plates': canvas => {
    const THREE = window.THREE;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 300;
    canvas.width = w;
    canvas.height = h;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Better background: darker earth tone
    scene.background = new THREE.Color(0x6d4320);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0, 0);

    // Left tectonic plate: Brighter brown
    const plate1 = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.9, 5.5),
      new THREE.MeshStandardMaterial({
        color: 0xb8860b,
        metalness: 0.2,
        roughness: 0.5,
        emissive: 0x8b6914,
        emissiveIntensity: 0.1
      })
    );
    plate1.position.x = -2.5;
    scene.add(plate1);

    // Right tectonic plate: Different shade for contrast
    const plate2 = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.9, 5.5),
      new THREE.MeshStandardMaterial({
        color: 0xcd853f,
        metalness: 0.2,
        roughness: 0.5,
        emissive: 0xa0631d,
        emissiveIntensity: 0.1
      })
    );
    plate2.position.x = 2.5;
    scene.add(plate2);

    // Fault line / stress zone: Brighter red with glow
    const faultGeo = new THREE.PlaneGeometry(0.6, 5.5);
    const faultMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      emissive: 0xdc2626,
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.3
    });
    const fault = new THREE.Mesh(faultGeo, faultMat);
    fault.position.z = 0.1;
    scene.add(fault);

    // Stress wave indicator: Glowing cube at fault
    const stressGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const stressMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      emissive: 0xff4444,
      emissiveIntensity: 0.8,
      metalness: 0.2,
      roughness: 0.2
    });
    const stress = new THREE.Mesh(stressGeo, stressMat);
    stress.position.z = 0.3;
    scene.add(stress);

    // Enhanced lighting: warm earthquake lighting
    const light1 = new THREE.DirectionalLight(0xffccaa, 1.3);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xff6b35, 0.8);
    light2.position.set(-6, -3, -4);
    scene.add(light2);

    scene.add(new THREE.AmbientLight(0x8b6914, 0.8));

    // Animation
    let animId;
    let offset = 0;
    function animate() {
      offset += 0.01;
      const timeVal = Date.now() * 0.005;

      // Plates sliding (left goes left, right goes right)
      plate1.position.x = -2.5 - Math.sin(offset) * 0.35;
      plate2.position.x = 2.5 + Math.sin(offset) * 0.35;

      // Stress pulse with intense glow
      const stressPulse = 1 + Math.sin(timeVal) * 0.5;
      stress.scale.set(stressPulse, stressPulse, stressPulse);
      stress.material.emissiveIntensity = 0.8 + Math.sin(timeVal * 1.5) * 0.4;

      // Fault line glow pulsing
      fault.material.emissiveIntensity = 0.6 + Math.sin(timeVal * 0.8) * 0.2;

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
