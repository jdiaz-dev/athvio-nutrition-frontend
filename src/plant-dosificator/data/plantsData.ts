import type { Plant } from '../types/plant.types';

/**
 * Source of truth for the whole application.
 * All dosage calculations must read from this array — do not hardcode
 * dosage numbers anywhere else.
 *
 * Data based on OMS / ESCOP / Comisión E monographs and traditional use in
 * Latin America / Perú, as provided by the product owner.
 */
export const PLANTAS: Plant[] = [
  {
    s: 'Matricaria chamomilla',
    fam: 'Asteraceae',
    com: 'Manzanilla',
    otr: 'Camomila (MX, CO); manzanilla dulce (PE); manzanilla alemana',
    par: 'Capítulos florales secos',
    usu: 'Infusión para cólico, gastritis, dispepsia y nervios. En compresa para conjuntivitis y en baños de asiento. Antiespasmódica y antiinflamatoria suave.',
    sis: ['Digestivo', 'Nervioso', 'Piel'],
    dosisAdultoPromedio: {
      infusion: {
        startRange: 1,
        endRange: 2,
        measurement: 'cucharaditas',
        frecuencyDay: '3-4 veces/día',
        fullDetail:
          '1-2 cucharaditas (2-3 g) de flores secas por taza de agua caliente (no hirviendo), tapar 5-10 min y colar. Tomar 3-4 veces/día, preferentemente después de las comidas (OMS, Comisión E).',
      },
      decoccion: {
        startRange: 2,
        endRange: 3,
        measurement: 'cucharadas',
        frecuencyDay: '1-2 veces/día (uso interno poco habitual)',
        fullDetail:
          '2-3 cucharadas (10-15 g) de flores por 1/2 litro de agua, hervir 3-5 min y colar. Para uso interno se prefiere la infusión; la decocción se usa más para compresas oculares tibias y baños de asiento (uso tradicional, no monografiado como decocción oral).',
      },
      tintura: {
        startRange: 30,
        endRange: 50,
        measurement: 'gotas',
        frecuencyDay: '3 veces/día',
        fullDetail:
          '30-50 gotas de tintura madre (1:5 en alcohol) diluidas en medio vaso de agua, 3 veces/día.',
      },
      exudadosResinas: {
        startRange: null,
        endRange: null,
        measurement: 'gotas',
        frecuencyDay: 'No aplica',
        fullDetail:
          'No aplica: la manzanilla no se comercializa ni se documenta como exudado o resina en OMS, ESCOP ni Comisión E.',
      },
      polvo: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharadita',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1 cucharadita (2-3 g) de flores pulverizadas, 2-3 veces/día, con agua o mezclada en alimento.',
      },
      capsula: {
        startRange: 1,
        endRange: 2,
        measurement: 'partes de 1 cápsula',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1-2 cápsulas de extracto seco estandarizado (300-400 mg c/u), 2-3 veces/día.',
      },
      jarabe: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharada sopera',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1 cucharada sopera (15 ml) de jarabe, 2-3 veces/día. Preparación tradicional casera, sin monografía oficial específica para esta forma.',
      },
    },
    recomendedSchedules: ['8am', '1pm', '6pm', '9pm'],
  },
  {
    s: 'Mentha × piperita',
    fam: 'Lamiaceae',
    com: 'Menta',
    otr: 'Menta piperita; hierbabuena inglesa (varía por país)',
    par: 'Hoja',
    usu: 'Carminativa y antiespasmódica intestinal. Infusión para gases, náusea y colon irritable. El aceite esencial se usa en inhalación.',
    pre: 'El aceite esencial puro no se ingiere en niños pequeños ni se aplica en la cara de lactantes: puede provocar espasmo laríngeo. Puede agravar el reflujo por relajar el esfínter esofágico.',
    sis: ['Digestivo', 'Respiratorio'],
    dosisAdultoPromedio: {
      infusion: {
        startRange: 1,
        endRange: 2,
        measurement: 'cucharaditas',
        frecuencyDay: '3-4 veces/día',
        fullDetail:
          '1-2 cucharaditas (1.5-3 g) de hoja seca por taza de agua caliente, tapar 5-10 min y colar. Tomar 3-4 veces/día entre comidas (Comisión E, ESCOP, EMA/HMPC).',
      },
      decoccion: {
        startRange: 2,
        endRange: 3,
        measurement: 'cucharadas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '2-3 cucharadas (10-15 g) de hoja por 1/2 litro de agua, hervir 2-3 min (tapado, para no perder el aceite esencial) y colar. 2-3 veces/día; se prefiere la infusión sobre la decocción prolongada.',
      },
      tintura: {
        startRange: 40,
        endRange: 60,
        measurement: 'gotas',
        frecuencyDay: '3 veces/día',
        fullDetail:
          '40-60 gotas de tintura (1:5, etanol 45%) en medio vaso de agua, 3 veces/día (equivalente a 6-9 ml/día repartidos en 3 tomas según EMA/HMPC).',
      },
      exudadosResinas: {
        startRange: null,
        endRange: null,
        measurement: 'gotas',
        frecuencyDay: 'No aplica',
        fullDetail:
          'No aplica: la menta no se presenta como exudado o resina; su principio concentrado es el aceite esencial, regulado de forma independiente.',
      },
      polvo: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharadita',
        frecuencyDay: '2-3 veces/día',
        fullDetail: '1 cucharadita (1.5-2 g) de hoja pulverizada, 2-3 veces/día.',
      },
      capsula: {
        startRange: 1,
        endRange: 1,
        measurement: 'partes de 1 cápsula',
        frecuencyDay: '3 veces/día',
        fullDetail:
          '1 cápsula (extracto seco 250-400 mg, o cápsula entérica de aceite esencial 0.2 ml), 3 veces/día antes de las comidas.',
      },
      jarabe: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharada sopera',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1 cucharada sopera (15 ml) de jarabe, 2-3 veces/día. Uso tradicional casero, sin monografía oficial específica.',
      },
    },
    recomendedSchedules: ['9am', '2pm', '7pm'],
  },
  {
    s: 'Mentha spicata',
    fam: 'Lamiaceae',
    com: 'Hierbabuena',
    otr: 'Yerbabuena (PE, MX, CO); menta verde; batamote de agua',
    par: 'Hoja',
    usu: 'La más usada en cocina y remedio casero para cólicos, gases y malestar estomacal. Más suave que la piperita, apta para niños en infusión ligera.',
    sis: ['Digestivo'],
    dosisAdultoPromedio: {
      infusion: {
        startRange: 1,
        endRange: 2,
        measurement: 'cucharaditas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1-2 cucharaditas (1.5-2.5 g) de hoja seca por taza, tapar 5-10 min y colar. 2-3 veces/día. Nota: no existe monografía propia de OMS, ESCOP ni Comisión E; dosis extrapolada del uso tradicional y de la monografía de M. piperita, ajustada a la baja por su perfil más suave (menor contenido de mentol, predominio de carvona).',
      },
      decoccion: {
        startRange: 2,
        endRange: 2,
        measurement: 'cucharadas',
        frecuencyDay: '1-2 veces/día',
        fullDetail:
          '2 cucharadas (8-10 g) por 1/2 litro de agua, hervir 2-3 min y colar. 1-2 veces/día (uso tradicional, no monografiado oficialmente).',
      },
      tintura: {
        startRange: 30,
        endRange: 40,
        measurement: 'gotas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '30-40 gotas de tintura (1:5, etanol 45%) en medio vaso de agua, 2-3 veces/día (extrapolado de la dosis de M. piperita).',
      },
      exudadosResinas: {
        startRange: null,
        endRange: null,
        measurement: 'gotas',
        frecuencyDay: 'No aplica',
        fullDetail: 'No aplica: no se documenta como exudado o resina.',
      },
      polvo: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharadita',
        frecuencyDay: '1-2 veces/día',
        fullDetail: '1 cucharadita (1.5-2 g) de hoja pulverizada, 1-2 veces/día.',
      },
      capsula: {
        startRange: 1,
        endRange: 1,
        measurement: 'partes de 1 cápsula',
        frecuencyDay: '1-2 veces/día',
        fullDetail:
          '1 cápsula (200-300 mg de hoja seca o extracto), 1-2 veces/día (dosis de referencia tradicional, sin monografía oficial).',
      },
      jarabe: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharada sopera',
        frecuencyDay: '2-3 veces/día',
        fullDetail: '1 cucharada sopera (15 ml), 2-3 veces/día. Preparación casera tradicional.',
      },
    },
    recomendedSchedules: ['10am', '4pm'],
  },
  {
    s: 'Melissa officinalis',
    fam: 'Lamiaceae',
    com: 'Toronjil',
    otr: 'Melisa (toda LatAm); cidrón de hoja ancha (confusión frecuente con Aloysia)',
    par: 'Hoja',
    usu: 'Sedante suave y digestiva. Infusión para ansiedad, insomnio leve, palpitaciones nerviosas y estómago "de los nervios".',
    pre: 'Uso prolongado puede interferir con la función tiroidea; precaución en hipotiroidismo tratado.',
    sis: ['Nervioso', 'Digestivo'],
    dosisAdultoPromedio: {
      infusion: {
        startRange: 1,
        endRange: 2,
        measurement: 'cucharaditas',
        frecuencyDay: '3-4 veces/día',
        fullDetail:
          '1-2 cucharaditas (1.5-2 g) de hoja seca por taza de agua caliente, tapar 10 min y colar. 3-4 veces/día (dosis diaria total 1.5-4.5 g según EMA/HMPC y ESCOP; Comisión E: 2-4 g, 3 veces/día).',
      },
      decoccion: {
        startRange: 2,
        endRange: 2,
        measurement: 'cucharadas',
        frecuencyDay: '2 veces/día',
        fullDetail:
          '2 cucharadas (8-10 g) por 1/2 litro de agua, hervido breve (1-2 min) y colado en caliente al final para no perder el aceite esencial. 2 veces/día; se prefiere la infusión, ya que el calor prolongado degrada sus principios volátiles.',
      },
      tintura: {
        startRange: 40,
        endRange: 80,
        measurement: 'gotas',
        frecuencyDay: '3 veces/día',
        fullDetail:
          '40-80 gotas de tintura (1:5, etanol 45%) en medio vaso de agua, 3 veces/día (equivalente a 2-6 ml, 3 veces/día según ESCOP/EMA).',
      },
      exudadosResinas: {
        startRange: null,
        endRange: null,
        measurement: 'gotas',
        frecuencyDay: 'No aplica',
        fullDetail: 'No aplica: el toronjil no se presenta como exudado o resina.',
      },
      polvo: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharadita',
        frecuencyDay: '2-3 veces/día',
        fullDetail: '1 cucharadita (2 g) de hoja pulverizada, 2-3 veces/día.',
      },
      capsula: {
        startRange: 1,
        endRange: 2,
        measurement: 'partes de 1 cápsula',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1-2 cápsulas (extracto seco 300-500 mg c/u), 2-3 veces/día, hasta un total de 2-4 g/día de droga equivalente.',
      },
      jarabe: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharada sopera',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1 cucharada sopera (15 ml), 2-3 veces/día. Preparación tradicional, sin monografía oficial específica para jarabe.',
      },
    },
    recomendedSchedules: ['9am', '3pm', '9pm'],
  },
  {
    s: 'Aloysia citrodora',
    fam: 'Verbenaceae',
    com: 'Cedrón',
    otr: 'Hierba luisa (PE — ojo, mismo nombre que Cymbopogon); cedrón (AR, UY, BO); verbena de olor (MX)',
    par: 'Hoja',
    usu: 'Digestiva y tranquilizante. Infusión después de comidas pesadas, para cólico y para conciliar el sueño.',
    sis: ['Digestivo', 'Nervioso'],
    dosisAdultoPromedio: {
      infusion: {
        startRange: 1,
        endRange: 2,
        measurement: 'cucharaditas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '1-2 cucharaditas (2-3 g) de hoja seca por taza de agua caliente, tapar 10 min y colar. 2-3 veces/día. Nota: no existe monografía de Comisión E ni de OMS; la EMA/HMPC cuenta con una evaluación de uso tradicional y el resto de la referencia proviene de uso consuetudinario sudamericano (5-20 g/litro).',
      },
      decoccion: {
        startRange: 2,
        endRange: 3,
        measurement: 'cucharadas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '2-3 cucharadas (10-15 g) por 1/2 litro de agua, hervir 5 min y colar; tomar en tomas de aprox. 45 ml, 2-3 veces/día (dosis tradicional descrita en fuentes de fitoterapia, sin monografía oficial de Comisión E/OMS).',
      },
      tintura: {
        startRange: 30,
        endRange: 50,
        measurement: 'gotas',
        frecuencyDay: '2-3 veces/día',
        fullDetail:
          '30-50 gotas de tintura (1:5, etanol 25-45%) en medio vaso de agua, 2-3 veces/día (uso tradicional en naturopatía occidental, no monografiado oficialmente).',
      },
      exudadosResinas: {
        startRange: null,
        endRange: null,
        measurement: 'gotas',
        frecuencyDay: 'No aplica',
        fullDetail: 'No aplica: el cedrón no se presenta como exudado o resina.',
      },
      polvo: {
        startRange: 0.5,
        endRange: 1,
        measurement: 'cucharadita',
        frecuencyDay: '1-2 veces/día',
        fullDetail: '1/2 a 1 cucharadita (250-500 mg) de hoja pulverizada, 1-2 veces/día.',
      },
      capsula: {
        startRange: 1,
        endRange: 1,
        measurement: 'partes de 1 cápsula',
        frecuencyDay: '1-2 veces/día',
        fullDetail:
          '1 cápsula (250-500 mg de hoja seca o extracto), 1-2 veces/día (dosis de referencia tradicional, sin monografía oficial de Comisión E/OMS).',
      },
      jarabe: {
        startRange: 1,
        endRange: 1,
        measurement: 'cucharada sopera',
        frecuencyDay: '2-3 veces/día',
        fullDetail: '1 cucharada sopera (15 ml), 2-3 veces/día. Preparación casera tradicional.',
      },
    },
    recomendedSchedules: ['1pm', '8pm'],
  },
];
