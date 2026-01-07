'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  opacity: number
}

interface ParticleSystemProps {
  particleCount?: number
  colors?: string[]
  size?: number
  speed?: number
  className?: string
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 50,
  colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b'],
  size = 2,
  speed = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      life: 0,
      maxLife: Math.random() * 100 + 50,
      size: Math.random() * size + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2
    })

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, createParticle)
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth
        if (particle.x > canvas.offsetWidth) particle.x = 0
        if (particle.y < 0) particle.y = canvas.offsetHeight
        if (particle.y > canvas.offsetHeight) particle.y = 0

        // Respawn particle when it dies
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particlesRef.current.forEach((particle) => {
        const alpha = (particle.maxLife - particle.life) / particle.maxLife * particle.opacity

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount, colors, size, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

interface FloatingElementsProps {
  count?: number
  className?: string
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 10,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{
            y: [null, '-100vh'],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
          style={{
            left: Math.random() * 100 + '%'
          }}
        />
      ))}
    </div>
  )
}

interface GlassmorphismCardProps {
  children: React.ReactNode
  className?: string
  blur?: number
  opacity?: number
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  blur = 10,
  opacity = 0.1
}) => {
  return (
    <motion.div
      className={`backdrop-blur-${blur} bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

interface MorphingShapeProps {
  className?: string
  colors?: string[]
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({
  className = '',
  colors = ['#0ea5e9', '#8b5cf6', '#ec4899']
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        borderRadius: [
          '60% 40% 30% 70%/60% 30% 70% 40%',
          '30% 60% 70% 40%/50% 60% 30% 60%',
          '50% 40% 30% 60%/30% 50% 70% 40%',
          '60% 40% 30% 70%/60% 30% 70% 40%'
        ],
        background: colors.map(color => `linear-gradient(45deg, ${color}, ${colors[(colors.indexOf(color) + 1) % colors.length]})`)
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        width: '200px',
        height: '200px',
        background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
      }}
    />
  )
}