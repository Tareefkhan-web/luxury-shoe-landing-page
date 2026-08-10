'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  Sparkles,
  useTexture,
  MeshReflectorMaterial,
} from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group, Mesh, PointLight } from 'three'
import { Color } from 'three'

function ShoePlane({ tint }: { tint: string }) {
  const texture = useTexture('/shoes/hero-shoe.png')
  const mesh = useRef<Mesh>(null)
  const target = useRef(new Color(tint))
  target.current.set(tint)

  useFrame(() => {
    const mat = mesh.current?.material as
      | { color: Color }
      | undefined
    if (mat) {
      // Smoothly blend the plane tint toward the selected swatch color.
      mat.color.lerp(target.current, 0.12)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </Float>
  )
}

function MetallicRing() {
  const ring = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ring.current) {
      ring.current.rotation.z += delta * 0.15
      ring.current.rotation.x = 0.9
    }
  })

  return (
    <mesh ref={ring} position={[0, 0, -1.5]}>
      <torusGeometry args={[2.6, 0.03, 16, 120]} />
      <meshStandardMaterial
        color="#d9b25a"
        metalness={1}
        roughness={0.25}
        emissive="#8a6a1f"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.85}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#0a0a0a"
        metalness={0.6}
        mirror={0}
      />
    </mesh>
  )
}

function LightSweep() {
  const light = useRef<PointLight>(null)

  useFrame((state) => {
    if (!light.current) return
    // Orbit a warm key light around the shoe for a cinematic sweep.
    const t = state.clock.elapsedTime * 0.6
    light.current.position.x = Math.sin(t) * 5
    light.current.position.z = Math.cos(t) * 5 + 2
  })

  return <pointLight ref={light} intensity={45} color="#e6b955" />
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null)
  const { pointer, camera } = useThree()
  const scroll = useRef(0)

  useFrame(() => {
    if (!group.current) return
    // Parallax rotation eased toward the pointer.
    group.current.rotation.y +=
      (pointer.x * 0.4 - group.current.rotation.y) * 0.05
    group.current.rotation.x +=
      (-pointer.y * 0.25 - group.current.rotation.x) * 0.05

    // Gentle scroll-driven camera dolly + lift.
    if (typeof window !== 'undefined') {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      scroll.current += (progress - scroll.current) * 0.06
      camera.position.z = 7 + scroll.current * 2.5
      camera.position.y = scroll.current * 1.2
      camera.lookAt(0, 0, 0)
    }
  })

  return <group ref={group}>{children}</group>
}

export function HeroShoeCanvas({ tint = '#ffffff' }: { tint?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#fff4d6" />
        <LightSweep />
        <Rig>
          <ShoePlane tint={tint} />
          <MetallicRing />
          <Sparkles
            count={60}
            scale={9}
            size={2}
            speed={0.3}
            opacity={0.5}
            color="#e6c877"
          />
        </Rig>
        <ReflectiveFloor />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
