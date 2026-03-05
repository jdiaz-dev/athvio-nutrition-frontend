import { useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

interface Section {
  subtitle: string;
  phrases: string[];
}

interface Slide {
  subtitle: string;
  phrase: string;
}

type Direction = 'next' | 'prev';

// ── Content (from PDF) ────────────────────────────────────────────────────

const sections: Section[] = [
  {
    subtitle: 'Introducción',
    phrases: [
      'Debemos estar al menos 1 hora conversando con el paciente',
      'La medicina convencional actúa en el síntoma (captopril)',
      'Terapias de lógica biológica',
      'La naturopatía es ciencia y filosofía — respeto al cuerpo humano',
      'La medicina natural busca reordenar las cosas',
      'Dormir mal destruye más que comer mal',
      'El terreno es más importante que el germen',
      'El naturismo es biología aplicada',
      'El paciente es un organismo vivo',
      'Que tu alimento sea tu medicina — una verdad que recién alcanza la medicina moderna',
      'Cada alimento activa o apaga genes',
      'El alimento produce hormonas, inflamación, fortalece o debilita el sistema inmune',
      'Estamos hablando de programación biológica',
      'Cuando millones de células están estresadas aparece la enfermedad',
      'La enfermedad aparece en la cocina, como lo dijo Hipócrates',
      'Farmacología natural — son los alimentos',
      'La mayoría de enfermedades son enfermedades metabólicas',
      'El responsable de tu salud es uno mismo',
    ],
  },
  {
    subtitle: 'Historia del Naturismo',
    phrases: [
      'El médico no es el protagonista, el médico solo acompaña',
      'El problema no es la enfermedad, es la capacidad natural de defensa',
      'Además de imágenes, revisa emociones, descanso, etc.',
      'Los alimentos crudos conservan su energía vital',
      'Dieta cruda equilibrada',
      'No basta con comer sano, hay que comer correctamente los alimentos — unos generan fermentación, otros putrefacción',
      '1 alimento mal combinado puede generar más fermentación que 1 alimento procesado',
      'El intestino sucio enferma todo el cuerpo',
      'Los alimentos crudos conservan enzimas — con el calor mueren vitaminas sensibles',
      'La genética carga el arma, pero no tira el gatillo',
      'El orden de la naturaleza',
      'El cuerpo humano es un reflejo de la naturaleza',
      'Somos naturaleza caminando',
      'Referente en Perú: Carlos Casanova Lenti',
      'La medicina natural es una práctica terapéutica — evaluar, identificar, aplicar intervención natural, observar una respuesta fisiológica',
      'El naturópata debe ser el mejor observador',
      'Esto es metodología',
      'Natural: no ha sido despojado de su matriz biológica, matriz viva',
      'La pastilla solo tiene principio activo — solo tiene molécula aislada, no el sistema bioquímico completo',
      'La naturaleza no trabaja con moléculas aisladas, trabaja con sistemas',
      'La medicina natural puede curar y aliviar — reactiva funciones',
      'La medicina convencional bloquea síntomas — apaga la alarma, apaga el incendio',
      'El naturópata da protocolos, da dieta, corrige minerales',
      'La medicina natural no añade nada nuevo al cuerpo',
      'La medicina natural es un proceso de mediano a largo plazo',
      'El futuro de la salud depende del cambio de conciencia',
    ],
  },
  {
    subtitle: 'Nuestro Médico Interno',
    phrases: [
      'El verdadero médico está dentro del cuerpo',
      'Homeostasis — cuando un sistema cae, otro sistema compensa',
      'Terreno biológico: emociones, calidad de sangre, estrés, genética',
      'Las emociones sostenidas provocan subida de cortisol, inflamación y ácidos — esto debilita los órganos',
      'No existe enfermedad solo física — todo pasa primero por el sistema nervioso',
      'Epigenética',
      'No heredamos enfermedades, heredamos vulnerabilidades',
      'La enfermedad aparece cuando el terreno se acidifica — por ejemplo, por las emociones',
      'Los naturistas son facilitadores',
      'Si el terreno no está limpio, ningún fármaco va a funcionar',
      'Hay que saber cómo activar nuestro médico interno',
      'El organismo no necesita milagros, necesita condiciones',
      'Biodecodificación — epigenética pero con psicología',
      'Crisis curativa: el cuerpo empieza a limpiar — antes de sanar el cuerpo debe eliminar',
      'Todo tejido vivo produce electricidad',
      'El cuerpo grita lo que el alma calla',
      'Otros mejoran y otros no — porque algunos cambian hábitos y otros no',
      'La verdadera medicina no entra por la boca, empieza por la conciencia',
    ],
  },
  {
    subtitle: 'Principios de Medicina Natural',
    phrases: [
      'Una disciplina sin principios es solo una técnica',
      'No hay enfermedad, solo hay enfermos',
      'Si se trata solo la enfermedad vamos a fallar — porque las causas son distintas',
      'Curar sin dañar',
      'Que tu alimento sea tu medicina y que tu medicina sea tu alimento',
      'El cuerpo se regenera por nutrición celular',
      'El alimento no es solo calorías — es información biológica, orden molecular, energía organizada',
      'Cuando comes alimentos vivos das vida — cuando comes alimentos muertos das desgaste',
      'Los alimentos deben llegar al cuerpo como salieron del taller de Dios',
      'La salud no se compra en farmacia — la salud se cultiva',
      'El calor activa la circulación',
      'Respirar bien antes de comer',
      'Las plantas tienen principios fitoactivos',
      'La respiración es el interruptor del sistema nervioso',
      'Naturismo: ambiente, hábitos, eliminación',
      "No existe 'un poquito no hace daño'",
      'Si vives en un ambiente tóxico, tu cuerpo vive defendiéndose — y un cuerpo que se defiende no se regenera',
      'La salud es una ecuación',
      'La mayoría de las enfermedades son enfermedades del estilo de vida',
      'El naturismo reeduca los estilos de vida',
    ],
  },
];

// ── Background images ─────────────────────────────────────────────────────

const IMAGES: string[] = [
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80',
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1920&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&q=80',
  'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1920&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1920&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1920&q=80',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=80',
  'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1920&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80',
  'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1920&q=80',
  'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=1920&q=80',
  'https://images.unsplash.com/photo-1458501534264-7d326fa0ca04?w=1920&q=80',
  // ── 3 new nature images ──────────────────────────────────────────────────
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80', // waterfall lush green forest
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80', // misty mountain valley sunrise
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80', // tropical jungle sunlight through leaves
];

// ── Helpers ───────────────────────────────────────────────────────────────

const totalSlides: number = sections.reduce((acc, s) => acc + s.phrases.length, 0);

function getSlide(index: number): Slide | null {
  let i = index;
  for (const section of sections) {
    if (i < section.phrases.length) {
      return { subtitle: section.subtitle, phrase: section.phrases[i] };
    }
    i -= section.phrases.length;
  }
  return null;
}

function getSectionIndex(slideIndex: number): number {
  let count = 0;
  for (let i = 0; i < sections.length; i++) {
    if (slideIndex < count + sections[i].phrases.length) return i;
    count += sections[i].phrases.length;
  }
  return 0;
}

// Returns a smaller font size for longer phrases so they stay within the circle
function getDynamicFontSize(phrase: string): string {
  const len = phrase.length;
  if (len <= 50) return 'clamp(1.4rem, 3.2vw, 2.1rem)';
  if (len <= 80) return 'clamp(1.15rem, 2.6vw, 1.7rem)';
  if (len <= 110) return 'clamp(1rem, 2.1vw, 1.4rem)';
  return 'clamp(0.9rem, 1.8vw, 1.2rem)';
}

// ── Component ─────────────────────────────────────────────────────────────

export default function NaturopathyIntroduction(): JSX.Element {
  const [slide, setSlide] = useState<number>(0);
  const [bgIndex, setBgIndex] = useState<number>(0);
  const [bgFade, setBgFade] = useState<boolean>(true);
  const [slideDir, setSlideDir] = useState<Direction | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Cycle background every 3 s
  useEffect(() => {
    const interval = setInterval(() => {
      setBgFade(false);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % IMAGES.length);
        setBgFade(true);
      }, 800);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar synced to image cycle
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const duration = 12000;
    let rafId: number;
    const tick = (): void => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed < duration) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [bgIndex]);

  // Navigate between slides
  const navigate = useCallback(
    (dir: Direction): void => {
      if (animating) return;
      setAnimating(true);
      setSlideDir(dir);
      setTimeout(() => {
        setSlide((prev) => (dir === 'next' ? (prev + 1) % totalSlides : (prev - 1 + totalSlides) % totalSlides));
        setSlideDir(null);
        setTimeout(() => setAnimating(false), 1000);
      }, 350);
    },
    [animating],
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const current: Slide | null = getSlide(slide);
  const sectionIdx: number = getSectionIndex(slide);

  const slideAnimation: string =
    slideDir === null
      ? 'fadeSlideIn 0.45s cubic-bezier(0.22,1,0.36,1) both'
      : slideDir === 'next'
      ? 'slideOutLeft 0.35s ease forwards'
      : 'slideOutRight 0.35s ease forwards';

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* ── Background image ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${IMAGES[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 0.8s ease',
          opacity: bgFade ? 1 : 0,
        }}
      />

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(0,30,15,0.82) 0%, rgba(0,50,25,0.72) 50%, rgba(0,20,10,0.85) 100%)',
        }}
      />

      {/* ── Decorative botanical rings ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 'min(70vw, 600px)',
          height: 'min(70vw, 600px)',
          borderRadius: '50%',
          border: '1px solid rgba(180,220,150,0.15)',
          boxShadow: '0 0 80px rgba(100,200,100,0.08), inset 0 0 60px rgba(100,200,100,0.05)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 'min(80vw, 700px)',
          height: 'min(80vw, 700px)',
          borderRadius: '50%',
          border: '1px solid rgba(180,220,150,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        {/* Section indicator dots */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2.5rem' }}>
          {sections.map((_s: Section, i: number) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: i === sectionIdx ? 1 : 0.35,
                transition: 'opacity 0.5s',
              }}
            >
              <div
                style={{
                  width: i === sectionIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: '#9fe870',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          ))}
        </div>

        {/* Section subtitle */}
        <div
          style={{
            color: '#9fe870',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            fontFamily: "'Georgia', serif",
            fontStyle: 'italic',
            opacity: 0.9,
          }}
        >
          {current?.subtitle}
        </div>

        {/* Phrase card */}
        <div
          key={slide}
          style={{
            maxWidth: 'min(420px, 62vw)',
            textAlign: 'center',
            animation: slideAnimation,
          }}
        >
          {/* Decorative leaf */}
          <div
            style={{
              fontSize: '1.8rem',
              marginBottom: '1.2rem',
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            🌿
          </div>

          <p
            style={{
              color: '#f0f8ec',
              fontSize: getDynamicFontSize(current?.phrase ?? ''),
              lineHeight: 1.5,
              fontFamily: "'Georgia', serif",
              fontWeight: 'normal',
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              letterSpacing: '0.01em',
            }}
          >
            "{current?.phrase}"
          </p>
        </div>

        {/* Slide counter */}
        <div
          style={{
            marginTop: '3rem',
            color: 'rgba(180,220,150,0.5)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
          }}
        >
          {String(slide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
          {[
            { dir: 'prev' as Direction, label: '←' },
            { dir: 'next' as Direction, label: '→' },
          ].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(159,232,112,0.3)',
                color: '#9fe870',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
                letterSpacing: 0,
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(159,232,112,0.2)';
                t.style.borderColor = 'rgba(159,232,112,0.7)';
                t.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = 'rgba(255,255,255,0.07)';
                t.style.borderColor = 'rgba(159,232,112,0.3)';
                t.style.transform = 'scale(1)';
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Keyboard hint */}
      </div>

      {/* ── Bottom progress bar (image cycle) ── */}
      {/* <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'rgba(159,232,112,0.6)',
            width: `${progress}%`,
            transition: 'width 0.1s linear',
          }}
        />
      </div> */}

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0);     }
          to   { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0);    }
          to   { opacity: 0; transform: translateX(60px); }
        }
      `}</style>
    </div>
  );
}
