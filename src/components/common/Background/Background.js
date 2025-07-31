import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const NUM_NEURONS = 500;
const CONNECTIONS = 100;

export default function BrainBackground() {
  const mountRef = useRef();

  useEffect(() => {
    let animationId;
    const mount = mountRef.current;

    // Scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.9,
      500
    );
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x4fd7ff, 1.3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(3, 5, 8);
    scene.add(dirLight);

    // Load GLTF brain model and plot neurons on surface
    const loader = new GLTFLoader();
    let neuronPositions = [];
    let lines = [];
    let neuronsPts;
    let brainMesh;

    loader.load(
      '/brain.glb', // Path from public folder
      (gltf) => {
        brainMesh = gltf.scene;
        brainMesh.traverse((node) => {
          if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
              color: 0x172c48,
              transparent: true,
              opacity: 0.25,
              metalness: 0.2,
              roughness: 0.8,
            });
          }
        });
        brainMesh.scale.set(2.6, 2.6, 2.6); // Adjust scale
        scene.add(brainMesh);

        // Place points (neurons) randomly on the surface
        const referenceMesh = brainMesh.children.find((n) => n.isMesh) || brainMesh;
        referenceMesh.geometry.computeBoundingBox();

        const positions = [];
        const faceCount = referenceMesh.geometry.index.count / 3;

        for (let i = 0; i < NUM_NEURONS; i++) {
          // Pick a random face
          const faceIdx = Math.floor(Math.random() * faceCount);
          const indices = [
            referenceMesh.geometry.index.getX(faceIdx * 3 + 0),
            referenceMesh.geometry.index.getX(faceIdx * 3 + 1),
            referenceMesh.geometry.index.getX(faceIdx * 3 + 2)
          ];
          const a = new THREE.Vector3().fromBufferAttribute(
            referenceMesh.geometry.attributes.position, indices[0]);
          const b = new THREE.Vector3().fromBufferAttribute(
            referenceMesh.geometry.attributes.position, indices[1]);
          const c = new THREE.Vector3().fromBufferAttribute(
            referenceMesh.geometry.attributes.position, indices[2]);
          // Random barycentric coords (point within triangle)
          const u = Math.random();
          const v = Math.random() * (1 - u);
          const w = 1 - u - v;
          const pt = new THREE.Vector3()
            .add(a.clone().multiplyScalar(u))
            .add(b.clone().multiplyScalar(v))
            .add(c.clone().multiplyScalar(w));
          positions.push(pt);
        }

        neuronPositions = positions;

        // Points for neurons
        const pointGeo = new THREE.BufferGeometry().setFromPoints(positions);
        const pointMat = new THREE.PointsMaterial({
          color: 0x61a5ff,
          size: 0.2,
          transparent: true,
          opacity: 0.82,
          blending: THREE.AdditiveBlending
        });
        neuronsPts = new THREE.Points(pointGeo, pointMat);
        scene.add(neuronsPts);

        // Connect each neuron to its nearest neighbors
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x66f1ef,
          transparent: true,
          opacity: 0.19,
        });
        lines = [];
        for (let i = 0; i < positions.length; i++) {
          const dists = positions
            .map((p, idx) => ({ idx, dist: positions[i].distanceTo(p) }))
            .filter((p) => p.idx !== i)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, CONNECTIONS);
          dists.forEach(({ idx }) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([positions[i], positions[idx]]);
            const line = new THREE.Line(geometry, lineMat);
            scene.add(line);
            lines.push(line);
          });
        }
      }
    );

    // Animation loop
    let frame = 0;
    function animate() {
      frame += 1;
      scene.rotation.y = frame * 0.002;
      if (brainMesh) brainMesh.rotation.y = Math.sin(frame * 0.0011) * 0.4;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '200vw',
        height: '200vh',
        paddingTop : '100px',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent'
      }}
      aria-hidden="true"
    />
  );
}
